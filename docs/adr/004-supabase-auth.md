# ADR-004: Supabase Auth

## Status

Accepted

## Context

La autenticación debe funcionar tanto para la aplicación web como para una futura aplicación móvil.

También se necesita evitar acoplar la identidad del usuario con proveedores de contenido como Spotify, Steam o Trakt.

## Decision

Supabase Auth será el proveedor inicial de autenticación.

La autenticación y las conexiones externas serán conceptos separados.

La identidad principal del usuario se gestionará mediante Supabase Auth.

Las conexiones con servicios externos se representarán posteriormente mediante una entidad independiente, por ejemplo `ExternalAccountConnection`.

## Consequences

Web y mobile podrán utilizar el mismo sistema de identidad.

La API seguirá siendo responsable de autorizar el acceso a los recursos del dominio.