import { glob } from 'astro/loaders';
import { z, defineCollection } from 'astro:content';

const paginas = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: './fuente/contenido' }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      descripcion: z.string().optional(),
      img: image().optional(),
      tipo: z.string().optional(),
    }),
});

const paginasDocencia = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: './fuente/contenido/docencia' }),
  schema: () =>
    z.object({
      titulo: z.string(),
      tipo: z.string().optional(),
    }),
});

const cursosPregrado = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: './fuente/contenido/docencia/pregrado' }),
  schema: () =>
    z.object({
      titulo: z.string(),
      nivel: z.string().optional(),
      nuevo: z.boolean().optional(),
      programaPDF: z.string(),
      carpetaPrograma: z.string().optional(),
      ciclos: z.array(z.string()),
    }),
});

const cursosMaestria = defineCollection({
  loader: glob({ pattern: '*.{md,mdx}', base: './fuente/contenido/docencia/maestria' }),
  schema: () =>
    z.object({
      titulo: z.string(),
      nivel: z.string().optional(),
      nuevo: z.boolean().optional(),
      programaPDF: z.string(),
      carpetaPrograma: z.string().optional(),
      ciclos: z.array(z.string()),
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

const proyectosInvestigacion = defineCollection({
  loader: glob({
    pattern: ['*.{md,mdx}', '!_*.{md,mdx}', '!README.md'],
    base: './fuente/contenido/investigacion/proyectos-investigacion',
  }),
  schema: ({ image }) =>
    z.object({
      // Básicos
      titulo: z.string(),
      slug: z.string().optional(),
      año_inicio: z.number(),
      año_fin: z.number().optional(),
      estado: z.enum(['finalizado', 'en curso', 'publicado']).optional(),
      // Clasificación
      tipo: z.enum(['investigación', 'creación', 'investigación-creación']).optional(),
      area: z.string().optional(),
      // Rol y colaboración
      rol: z.string().optional(),
      colaboradores: z
        .array(
          z.object({
            nombre: z.string(),
            rol: z.string().optional(),
            enlace: z.string().optional(),
          })
        )
        .optional(),
      instituciones: z.array(z.string()).optional(),
      // Financiación
      financiacion: z
        .object({
          tipo: z.string().optional(),
          entidad: z.string().optional(),
        })
        .optional(),
      // Productos y reconocimientos
      productos: z
        .array(
          z.object({
            tipo: z.string(),
            titulo: z.string(),
            enlace: z.string().optional(),
          })
        )
        .optional(),
      premios: z.array(z.string()).optional(),
      menciones_prensa: z
        .array(
          z.object({
            titulo: z.string(),
            medio: z.string(),
            enlace: z.string().optional(),
          })
        )
        .optional(),
      // Conexión con docencia
      estudiantes_involucrados: z.number().optional(),
      cursos_relacionados: z.array(z.string()).optional(),
      // Medios
      imagen_principal: image().optional(),
      galeria: z.boolean().optional(),
      videos: z
        .array(
          z.object({
            plataforma: z.enum(['youtube', 'vimeo', 'instagram']).optional(),
            id: z.string(),
            titulo: z.string().optional(),
          })
        )
        .optional(),
      enlaces: z
        .record(z.string()) // Permite cualquier clave con valor string
        .optional(),
      // SEO
      descripcion: z.string().optional(),
      // Compatibilidad con estructura antigua
      año: z.number().optional(),
      sede: z.string().optional(),
      instagram: z.string().optional(),
    }),
});

export const collections = {
  paginas,
  paginasDocencia,
  cursosPregrado,
  cursosMaestria,
  proyectosGrado,
  asistentesInvestigacion,
  proyectosInvestigacion,
};
