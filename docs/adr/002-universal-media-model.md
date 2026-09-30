# ADR-002: Universal Media Model

## Status

Accepted

## Context

La aplicación debe soportar múltiples tipos de contenido:

- Movies
- Series
- Books
- Games
- Music
- Podcasts
- Videos
- Courses
- Events
- Custom media types

Crear un modelo completamente independiente para cada categoría produciría duplicación y dificultaría funcionalidades globales como búsqueda, listas, estadísticas y relaciones.

## Decision

Se utilizará una entidad global `MediaItem` como núcleo del catálogo.

Los conceptos comunes vivirán en el modelo universal.

Las características específicas de determinados dominios utilizarán tablas de extensión, por ejemplo:

- MovieDetails
- SeriesDetails
- BookDetails
- GameDetails

Las unidades internas de contenido se representarán mediante `MediaUnit`, permitiendo modelar:

- Seasons
- Episodes
- Chapters
- Volumes
- Tracks
- Lessons
- Modules

Los datos del usuario estarán separados del catálogo global mediante `UserMediaEntry`.

El historial se almacenará mediante `Activity` y `MediaSession`.

## Consequences

El sistema podrá ofrecer funcionalidades transversales sin perder información específica de cada tipo de media.

Se evitará convertir `MediaItem` en una tabla con una gran cantidad de columnas opcionales.