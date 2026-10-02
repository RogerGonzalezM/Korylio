# ADR-003: PostgreSQL and Drizzle ORM

## Status

Accepted

## Context

Korylio necesita:

- Relaciones complejas.
- Integridad referencial.
- Índices.
- Full-text search.
- JSONB.
- Consultas analíticas.
- Migraciones versionadas.
- Capacidad de usar SQL directamente cuando sea necesario.

## Decision

PostgreSQL será la base de datos principal.

Drizzle ORM será la capa de acceso y definición de esquema inicial.

Las migraciones se almacenarán en el repositorio.

La base de datos será la fuente de verdad del sistema.

## Consequences

La aplicación mantiene acceso explícito a las capacidades de PostgreSQL sin ocultarlas detrás de una abstracción excesiva.

El modelo físico de base de datos se implementará en la Fase 3.