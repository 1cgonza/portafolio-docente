import type { ImageMetadata } from 'astro';

export interface ImagenGaleria {
  metadata: ImageMetadata;
  ruta: string;
  src: string;
  width: number;
  height: number;
  alt: string;
}

const imagenesGlob = import.meta.glob('../imagenes/**/*.{jpg,jpeg,png,webp}', {
  eager: true,
  import: 'default',
});

const imagenesPorCarpeta = new Map<string, ImagenGaleria[]>();

for (const [ruta, metadata] of Object.entries(imagenesGlob)) {
  const imagen = metadata as ImageMetadata;
  const coincidencia = ruta.match(/\/imagenes\/([^/]+)\//);

  if (!coincidencia) continue;

  const carpeta = coincidencia[1];
  const imagenes = imagenesPorCarpeta.get(carpeta) ?? [];

  imagenes.push({
    metadata: imagen,
    ruta,
    src: imagen.src,
    width: imagen.width,
    height: imagen.height,
    alt:
      ruta
        .split('/')
        .pop()
        ?.replace(/\.(jpg|jpeg|png|webp)$/, '') ?? 'Imagen',
  });

  imagenesPorCarpeta.set(carpeta, imagenes);
}

for (const imagenes of imagenesPorCarpeta.values()) {
  imagenes.sort((a, b) => a.ruta.localeCompare(b.ruta));
}

export function obtenerImagenesPorCarpeta(carpeta: string) {
  return imagenesPorCarpeta.get(carpeta) ?? [];
}

export function obtenerPrimeraImagenDeCarpeta(carpeta: string) {
  return obtenerImagenesPorCarpeta(carpeta)[0];
}
