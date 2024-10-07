import slugificar from 'slug';

export function crearSlugs() {
  return function (_, file) {
    file.data.astro.frontmatter.slug = slugificar(file.data.astro.frontmatter.titulo);
  };
}
