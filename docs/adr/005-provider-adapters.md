# ADR-005: External Provider Adapters

## Status

Accepted

## Context

Universal Media Tracker dependerá de distintos proveedores externos según el tipo de contenido.

Ejemplos iniciales:

- TMDB
- IGDB
- Open Library

Las APIs externas tienen modelos, identificadores, límites, licencias y políticas de almacenamiento diferentes.

## Decision

Ningún proveedor externo definirá directamente el modelo interno de Universal Media Tracker.

Cada integración se encapsulará detrás de un adapter.

Una interfaz conceptual de proveedor incluirá operaciones como:

- search
- getDetails
- getExternalIds
- getImages
- getRelations
- normalize

Los IDs externos se almacenarán como identificadores secundarios.

La procedencia de metadata relevante podrá almacenarse mediante información de provenance.

## Consequences

Cambiar o añadir proveedores no requerirá rediseñar el dominio principal.

También podremos aplicar políticas específicas de caché, expiración, atribución y almacenamiento por proveedor.