import re
import shutil
import subprocess
from dataclasses import dataclass
from pathlib import Path
from typing import Optional, List

# =========================
# CONFIG
# =========================
SRC_DIR = Path("./estaticos/pdfs/evaluaciones/")
OUT_DIR = Path("./fuente/imagenes/")

DPI = 150  # 150–200 recomendado
WEBP_QUALITY = 80  # 70–85 recomendado
WEBP_METHOD = 6  # 0..6 (6 = mejor compresión, más lento)
SKIP_IF_EXISTS = True  # Si ya hay webp en carpeta, no reprocesa
ONLY_FILENAME = None  # Ej: "202010-GENERAL-JUAN CAMILO....pdf" o None para todos

# Si quieres tipos estrictos, lista aquí. Si lo dejas en None, acepta cualquier tipo (GENERAL, RESUMEN, etc.)
ALLOWED_TYPES = None  # Ej: {"principal", "comparado", "general"} o None

# =========================


@dataclass
class PdfInfo:
    codigo: str  # "201920" o "historico"
    tipo: str  # "principal" | "comparado" | "general" | ...
    src_pdf: Path


def which(cmd: str) -> Optional[str]:
    return shutil.which(cmd)


def run(cmd: List[str]) -> None:
    p = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    if p.returncode != 0:
        raise RuntimeError(
            f"Error ejecutando:\n  {' '.join(cmd)}\n\nSTDERR:\n{p.stderr}\n\nSTDOUT:\n{p.stdout}"
        )


def normalize_slug(s: str) -> str:
    # Slug simple: minúsculas, espacios a guion, limpia caracteres raros.
    s = s.strip().lower()
    s = re.sub(r"\s+", "-", s)
    s = re.sub(r"[^a-z0-9\-]+", "-", s)
    s = re.sub(r"-{2,}", "-", s).strip("-")
    return s


def slug_folder(codigo: str, tipo: str) -> str:
    if tipo == "historico":
        return "evaluacion-historico"
    return f"evaluacion-{codigo}-{tipo}"


def parse_pdf_filename(pdf_path: Path) -> Optional[PdfInfo]:
    name = pdf_path.name

    # Caso HISTÓRICO
    if re.match(r"^HIST[ÓO]RICO-", name, flags=re.IGNORECASE):
        return PdfInfo(codigo="historico", tipo="historico", src_pdf=pdf_path)

    # Caso general: CODIGO-TIPO-...
    # Ej: 202010-GENERAL-..., 201920-PRINCIPAL-..., 201920-COMPARADO-...
    m = re.match(r"^(?P<codigo>\d+)-(?P<tipo>[A-ZÁÉÍÓÚÑ]+)-", name, flags=re.IGNORECASE)
    if not m:
        return None

    codigo = m.group("codigo")
    tipo = m.group("tipo").lower()

    if ALLOWED_TYPES is not None and tipo not in ALLOWED_TYPES:
        return None

    return PdfInfo(codigo=codigo, tipo=tipo, src_pdf=pdf_path)


def has_existing_webp(dest_dir: Path) -> bool:
    return any(dest_dir.glob("*.webp"))


def convert_pdf_to_pngs(pdf: Path, out_dir: Path, dpi: int) -> List[Path]:
    """
    Convierte PDF a PNGs temporales con pdftoppm.
    Genera tmp-1.png, tmp-2.png... (pdftoppm), luego los renombramos a tmp-001.png...
    """
    if which("pdftoppm") is None:
        raise RuntimeError(
            "No encuentro 'pdftoppm'. Instala poppler (Scoop) y revisa PATH."
        )

    out_dir.mkdir(parents=True, exist_ok=True)
    base = out_dir / "tmp"

    run(["pdftoppm", "-png", "-r", str(dpi), str(pdf), str(base)])

    pngs = sorted(out_dir.glob("tmp-*.png"))
    if not pngs:
        raise RuntimeError(f"No se generaron PNGs para: {pdf.name}")

    renamed: List[Path] = []
    for p in pngs:
        mm = re.search(r"tmp-(\d+)\.png$", p.name)
        if not mm:
            continue
        n = int(mm.group(1))
        new_path = out_dir / f"tmp-{n:03d}.png"
        if new_path.exists():
            new_path.unlink()
        p.rename(new_path)
        renamed.append(new_path)

    return renamed


def convert_pngs_to_webp(
    pngs: List[Path], out_dir: Path, prefix: str, quality: int
) -> None:
    """
    Convierte PNGs tmp-###.png a <prefix>-###.webp con ImageMagick y borra los PNG temporales.
    """
    if which("magick") is None:
        raise RuntimeError(
            "No encuentro 'magick'. Instala imagemagick (Scoop) y revisa PATH."
        )

    for png in pngs:
        mm = re.search(r"tmp-(\d{3})\.png$", png.name)
        if not mm:
            continue
        idx = mm.group(1)
        webp = out_dir / f"{prefix}-{idx}.webp"

        # Si existe, lo reemplazamos (es lo correcto si estás reprocesando)
        if webp.exists():
            webp.unlink()

        run(
            [
                "magick",
                str(png),
                "-strip",
                "-quality",
                str(quality),
                "-define",
                f"webp:method={WEBP_METHOD}",
                "-define",
                "webp:thread-level=1",
                str(webp),
            ]
        )

        png.unlink()  # borrar temporal


def process_pdf(info: PdfInfo) -> None:
    folder = OUT_DIR / slug_folder(info.codigo, info.tipo)
    folder.mkdir(parents=True, exist_ok=True)

    folder_slug = normalize_slug(folder.name)  # prefijo para páginas

    print(f"📄 {info.src_pdf.name}")
    print(f"   → {folder}")

    if SKIP_IF_EXISTS and has_existing_webp(folder):
        print("   ⏭️  Ya hay .webp en esta carpeta. Saltando (SKIP_IF_EXISTS=True).\n")
        return

    pngs = convert_pdf_to_pngs(info.src_pdf, folder, DPI)
    convert_pngs_to_webp(pngs, folder, folder_slug, WEBP_QUALITY)

    count = len(list(folder.glob("*.webp")))
    print(f"   ✅ {count} página(s) WebP\n")


def main() -> None:
    if not SRC_DIR.exists():
        raise RuntimeError(f"No existe la carpeta fuente: {SRC_DIR.resolve()}")

    pdfs = sorted(SRC_DIR.glob("*.pdf"))

    if ONLY_FILENAME:
        pdfs = [p for p in pdfs if p.name.lower() == ONLY_FILENAME.lower()]
        if not pdfs:
            raise RuntimeError(
                f"No encontré el PDF '{ONLY_FILENAME}' en {SRC_DIR.resolve()}"
            )

    processed = 0
    ignored = 0

    for pdf in pdfs:
        info = parse_pdf_filename(pdf)
        if not info:
            print(f"⏭️ Ignorado: {pdf.name}")
            ignored += 1
            continue
        process_pdf(info)
        processed += 1

    print(f"Listo. Procesados: {processed}. Ignorados: {ignored}.")


if __name__ == "__main__":
    main()
