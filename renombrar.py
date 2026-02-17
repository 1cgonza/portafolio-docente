import re
from pathlib import Path

ROOT = Path("./fuente/imagenes/")
DRY_RUN = False  # True = solo muestra lo que haría; False = renombra


def normalize_slug(s: str) -> str:
    s = s.strip().lower()
    s = re.sub(r"\s+", "-", s)
    s = re.sub(r"[^a-z0-9\-]+", "-", s)
    s = re.sub(r"-{2,}", "-", s).strip("-")
    return s


def main():
    if not ROOT.exists():
        raise RuntimeError(f"No existe: {ROOT.resolve()}")

    folders = [p for p in ROOT.iterdir() if p.is_dir()]
    total = 0
    renamed = 0
    skipped = 0

    for folder in sorted(folders):
        prefix = normalize_slug(folder.name)

        # Captura page-1.webp, page-01.webp, page-001.webp, page-0001.webp...
        webps = sorted(folder.glob("*.webp"))

        for f in webps:
            total += 1

            m = re.match(r"^page-(\d+)\.webp$", f.name, flags=re.IGNORECASE)
            if not m:
                # no es del patrón "page-###.webp" → lo dejamos quieto
                skipped += 1
                continue

            n = int(m.group(1))
            new_name = f"{prefix}-{n:03d}.webp"
            dest = folder / new_name

            if dest.exists():
                # si ya existe, evitamos pisar: esto suele pasar si ya renombraste antes
                skipped += 1
                continue

            print(f"{f}  ->  {dest}")
            if not DRY_RUN:
                f.rename(dest)
            renamed += 1

    print(f"Total .webp vistos: {total}")
    print(f"Renombrados: {renamed}")
    print(f"Saltados: {skipped}")


if __name__ == "__main__":
    main()
