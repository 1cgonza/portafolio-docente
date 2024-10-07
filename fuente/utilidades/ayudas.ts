import type { Pagina } from '@/tipos';
import type { MDXInstance } from 'astro';

export async function aplanarPagina(pagina: Promise<MDXInstance<Pagina>[]>) {
  return await pagina.then((res) => res[0]);
}
