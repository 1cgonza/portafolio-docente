# Proyectos de Investigación

Esta carpeta contiene los archivos `.mdx` de cada proyecto de investigación para el portafolio docente.

## Estructura

```
proyectos-investigacion/
├── _PLANTILLA.mdx              # Plantilla para nuevos proyectos
├── README.md                   # Este archivo
├── proyecto-1.mdx              # Archivo del proyecto
├── proyecto-1/                 # Carpeta con imágenes del proyecto (opcional)
│   ├── imagen-principal.jpg
│   ├── imagen-2.jpg
│   └── ...
├── proyecto-2.mdx
└── proyecto-2/
    └── ...
```

## Crear un nuevo proyecto

1. **Copia la plantilla**: Duplica `_PLANTILLA.mdx` y renómbralo según tu proyecto (usa kebab-case: `mi-proyecto.mdx`)

2. **Crea carpeta de imágenes** (opcional): Si tu proyecto tiene imágenes, crea una carpeta con el mismo nombre que el archivo (sin extensión):
   - `mi-proyecto.mdx` → carpeta `mi-proyecto/`

3. **Completa el frontmatter**: Edita los campos del YAML al inicio del archivo:

   ```yaml
   ---
   titulo: 'Nombre del proyecto'
   año_inicio: 2024
   fecha_fin: '2024-11'
   # ... otros campos
   ---
   ```

4. **Escribe el contenido**: Después del frontmatter, escribe la descripción detallada usando Markdown

## Campos del frontmatter

### Campos obligatorios

- `titulo`: Nombre del proyecto
- `año_inicio`: Año de inicio del proyecto

### Campos opcionales (recomendados)

- `año_fin`: Año de finalización (omitir si está en curso)
- `fecha_inicio`: Fecha más precisa en formato `YYYY-MM` o `YYYY-MM-DD`
- `fecha_fin`: Fecha más precisa en formato `YYYY-MM` o `YYYY-MM-DD`
- `estado`: finalizado | en curso | publicado
- `tipo`: investigación | creación | investigación-creación
- `rol`: Tu rol en el proyecto (Director, Co-investigador, etc.)

### Campos complementarios

Ver `_PLANTILLA.mdx` para la lista completa de campos disponibles:

- Colaboradores
- Instituciones
- Financiación
- Productos derivados
- Exhibiciones y selecciones
- Premios
- Menciones en prensa
- Conexión con docencia
- Videos
- Enlaces externos

## Agregar imágenes

### Imagen principal

```yaml
imagen_principal: ./mi-proyecto/imagen.jpg
```

### Galería de imágenes

1. Crea una carpeta con el nombre del proyecto (o usa el valor de `slug`)
2. Coloca todas las imágenes dentro
3. Activa la galería en el frontmatter:
   ```yaml
   galeria: true
   ```

### Imágenes en el contenido

```markdown
![Descripción](./mi-proyecto/imagen.jpg)
```

## Agregar videos

### YouTube

```yaml
videos:
  - plataforma: youtube
    id: 'dQw4w9WgXcQ' # ID del video
    titulo: 'Descripción del video'
```

### Vimeo

```yaml
videos:
  - plataforma: vimeo
    id: '123456789'
    titulo: 'Descripción del video'
```

### Instagram

```yaml
videos:
  - plataforma: instagram
    id: 'https://www.instagram.com/p/xxxxx/'
    titulo: 'Descripción del post'
```

## Consejos

1. **Usa kebab-case para nombres de archivo**: `mi-proyecto-ejemplo.mdx` en vez de `Mi Proyecto Ejemplo.mdx`
2. **Optimiza las imágenes**: Usa formatos web (WebP, JPEG optimizado) y tamaños razonables (< 500KB)
3. **Completa los metadatos**: Mientras más campos completes, más rico será el contexto del proyecto
4. **Conecta con docencia**: Si el proyecto involucró estudiantes o cursos, documéntalo en los campos correspondientes
5. **Productos derivados**: Reserva `productos` para obras, publicaciones, instalaciones, software, bases de datos u otros resultados del proyecto
6. **Exhibiciones y selecciones**: Usa `exhibiciones` para festivales, muestras, selecciones oficiales o circulación pública de la obra
7. **Financiación**: Documenta el origen de los recursos, especialmente si son externos

Puedes registrar `financiacion` como un objeto único o como una lista de apoyos.

Tipos recomendados para `financiacion.tipo`:

- `interna`
- `externa`
- `FAPA`
- `institucional`

Ejemplo:

```yaml
financiacion:
  - tipo: 'FAPA'
    entidad: 'Vicerrectoría de Investigación y Creación'
  - tipo: 'externa'
    entidad: 'Nombre de la entidad'
```

## Ver los proyectos

Los proyectos se muestran automáticamente en `/04_produccion.mdx` usando el componente `<ProyectosInvestigacionLocal />`.

El orden de visualización usa primero `fecha_fin` si existe, luego `año_fin`, y después desempata con `fecha_inicio` y `año_inicio`.

Si dos proyectos terminan el mismo año, usar `fecha_fin` te permite reflejar correctamente cuál cerró más tarde dentro de ese año.
