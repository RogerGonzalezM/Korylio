# ADR-001: Modular Monolith

## Status

Accepted

## Context

Korylio requiere múltiples dominios relacionados: catálogo, búsqueda, biblioteca, tracking, diary, listas, estadísticas, relaciones, imports y usuarios.

Separarlos inicialmente en microservicios aumentaría la complejidad operativa sin una necesidad demostrada de escalado independiente.

## Decision

Se utilizará un monolito modular para la API.

Los límites funcionales se mantendrán explícitos mediante módulos de dominio.

Los procesos que sí pueden requerir ciclos de vida diferentes se separarán físicamente:

- Web
- API
- Worker

## Consequences

Ventajas:

- Menor complejidad operativa.
- Transacciones simples.
- Desarrollo local sencillo.
- Refactorización más fácil durante las primeras fases.

Limitaciones:

- Los módulos comparten proceso y despliegue.
- Será necesario mantener límites internos claros.

La arquitectura permite extraer módulos a servicios independientes en el futuro si existe una necesidad demostrada.