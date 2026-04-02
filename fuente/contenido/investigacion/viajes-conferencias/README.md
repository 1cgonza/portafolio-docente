# Viajes y conferencias

Esta carpeta contiene los archivos `.mdx` de viajes académicos, conferencias, ponencias, talleres, visitas o participaciones en eventos que quieres mostrar en la sección de Producción Académica.

## Estructura

```text
viajes-conferencias/
├── _PLANTILLA.mdx
├── README.md
└── mi-actividad.mdx
```

## Cómo crear una nueva entrada

1. Duplica `_PLANTILLA.mdx`.
2. Renombra el archivo en `kebab-case`, por ejemplo: `conferencia-ficali-2025.mdx`.
3. Completa el frontmatter con la información principal.
4. Escribe debajo la descripción completa en Markdown.

## Campos principales

- `titulo`: nombre visible de la actividad.
- `slug`: nombre corto para controlar la carpeta de galería si quieres que no dependa del nombre del archivo.
- `"año_inicio"`: año de inicio.
- `"año_fin"`: año de cierre si aplica.
- `fecha_inicio` y `fecha_fin`: formato `YYYY-MM` o `YYYY-MM-DD` para ordenar mejor las tarjetas.
- `tipo`: clase de actividad, por ejemplo `viaje`, `conferencia`, `ponencia` o `taller`.
- `rol`: tu papel en esa actividad.
- `evento`: nombre del congreso, festival, seminario o programa.
- `institucion`: institución anfitriona o principal.
- `lugar`: ciudad y país.

## Secciones que aparecen dentro de la tarjeta

- `organizadores`: lista de instituciones u organizaciones aliadas.
- `participaciones`: lista de charlas, paneles, talleres o actividades realizadas.
- `resultados`: lista de productos, memorias, publicaciones o registros asociados.
- `enlaces`: botones al final de la tarjeta.
- `videos`: embebidos de YouTube, Vimeo o Instagram.

## Imágenes y galerías

### Imagen principal

Puedes definir una portada dentro del mismo `.mdx`:

```yaml
imagen_principal: ./imgs/mi-imagen.jpg
```

### Galería

La galería sigue la misma lógica que en proyectos:

1. Crea una carpeta en `fuente/imagenes/` con el nombre del archivo o del `slug`.
2. Guarda allí todas las imágenes.
3. Activa la galería con:

```yaml
galeria: true
```

Ejemplo:

- archivo: `conferencia-ficali-2025.mdx`
- `slug`: `ficali-2025`
- carpeta de galería: `fuente/imagenes/ficali-2025/`

## Visualización

Las entradas se muestran automáticamente en la sección `Viajes y conferencias` de [03_produccion.mdx](/c:/Users/juanc/lab/portafolio-docente/fuente/contenido/03_produccion.mdx).
