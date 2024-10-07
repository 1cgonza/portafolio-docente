import type { Pagina } from '@/tipos';
import type { MDXInstance } from 'astro';
import type { Root } from 'mdast';
import slugificar from 'slug';
interface Archivo {
  data: {
    astro: MDXInstance<Pagina>;
  };
}

export function crearSlugs() {
  return function (arbol: Root, archivo: Archivo) {
    archivo.data.astro.frontmatter.slug = slugificar(archivo.data.astro.frontmatter.titulo);
  };
}
