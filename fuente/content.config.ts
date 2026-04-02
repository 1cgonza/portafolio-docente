import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';

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
      fecha_inicio: z
        .string()
        .regex(/^\d{4}-\d{2}(-\d{2})?$/, 'Usa formato YYYY-MM o YYYY-MM-DD')
        .optional(),
      fecha_fin: z
        .string()
        .regex(/^\d{4}-\d{2}(-\d{2})?$/, 'Usa formato YYYY-MM o YYYY-MM-DD')
        .optional(),
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
        .union([
          z.object({
            tipo: z.enum(['interna', 'externa', 'FAPA', 'institucional']),
            entidad: z.string().optional(),
          }),
          z.array(
            z.object({
              tipo: z.enum(['interna', 'externa', 'FAPA', 'institucional']),
              entidad: z.string().optional(),
            })
          ),
        ])
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
      exhibiciones: z
        .array(
          z.object({
            tipo: z.string().optional(),
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
        .record(z.string(), z.string()) // Zod 4 requiere definir clave y valor
        .optional(),
      // Compatibilidad con estructura antigua
      año: z.number().optional(),
      sede: z.string().optional(),
      instagram: z.string().optional(),
    }),
});

const viajesConferencias = defineCollection({
  loader: glob({
    pattern: ['*.{md,mdx}', '!_*.{md,mdx}', '!README.md'],
    base: './fuente/contenido/investigacion/viajes-conferencias',
  }),
  schema: ({ image }) =>
    z.object({
      titulo: z.string(),
      slug: z.string().optional(),
      'a\u00f1o_inicio': z.number(),
      'a\u00f1o_fin': z.number().optional(),
      fecha_inicio: z
        .string()
        .regex(/^\d{4}-\d{2}(-\d{2})?$/, 'Usa formato YYYY-MM o YYYY-MM-DD')
        .optional(),
      fecha_fin: z
        .string()
        .regex(/^\d{4}-\d{2}(-\d{2})?$/, 'Usa formato YYYY-MM o YYYY-MM-DD')
        .optional(),
      estado: z.enum(['finalizado', 'en curso', 'publicado']).optional(),
      tipo: z.string().optional(),
      rol: z.string().optional(),
      evento: z.string().optional(),
      institucion: z.string().optional(),
      lugar: z.string().optional(),
      organizadores: z.array(z.string()).optional(),
      participaciones: z
        .array(
          z.object({
            tipo: z.string().optional(),
            titulo: z.string(),
            enlace: z.string().optional(),
            meta: z.string().optional(),
          })
        )
        .optional(),
      resultados: z
        .array(
          z.object({
            tipo: z.string().optional(),
            titulo: z.string(),
            enlace: z.string().optional(),
            meta: z.string().optional(),
          })
        )
        .optional(),
      financiacion: z
        .union([
          z.object({
            tipo: z.enum(['interna', 'externa', 'FAPA', 'institucional']),
            entidad: z.string().optional(),
          }),
          z.array(
            z.object({
              tipo: z.enum(['interna', 'externa', 'FAPA', 'institucional']),
              entidad: z.string().optional(),
            })
          ),
        ])
        .optional(),
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
      enlaces: z.record(z.string(), z.string()).optional(),
      'a\u00f1o': z.number().optional(),
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
  viajesConferencias,
};
