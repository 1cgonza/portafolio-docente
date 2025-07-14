import { glob } from 'astro/loaders';
import { z, defineCollection } from 'astro:content';

const paginas = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: './fuente/contenido' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      descripcion: z.string().optional(),
      img: image().optional(),
    }),
});

const paginasDocencia = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: './fuente/contenido/docencia' }),
  schema: () =>
    z.object({
      titulo: z.string(),
    }),
});

const cursosPregrado = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: './fuente/contenido/docencia/pregrado' }),
  schema: () =>
    z.object({
      titulo: z.string(),
      nivel: z.string().optional(),
      nuevo: z.boolean().optional(),
    }),
});

const cursosMaestria = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: './fuente/contenido/docencia/maestria' }),
  schema: () =>
    z.object({
      titulo: z.string(),
      nivel: z.string().optional(),
      nuevo: z.boolean().optional(),
    }),
});

const proyectosGrado = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: './fuente/contenido/docencia/proyectos_grado' }),
  schema: () =>
    z.object({
      titulo: z.string(),
      estudiantes: z.array(z.string()),
      año: z.number(),
      programa: z.string(),
      tipo: z.string(),
      nivel: z.string(),
    }),
});

const asistentesInvestigacion = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: './fuente/contenido/docencia/asistencia_investigacion' }),
  schema: () =>
    z.object({
      nombre: z.string(),
      nivel: z.string(),
      programa: z.string(),
      tipo: z.string(),
      año: z.number(),
    }),
});

export const collections = {
  paginas,
  paginasDocencia,
  cursosPregrado,
  cursosMaestria,
  proyectosGrado,
  asistentesInvestigacion,
};
