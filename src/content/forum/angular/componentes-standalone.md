---
title: "¿Cómo migrar a componentes Standalone en Angular?"
slug: "componentes-standalone"
category: "Angular"
author: "Adrián Morado"
createdAt: "2026-07-09"
tags:
  - angular
  - standalone
  - modulos
resolved: true
views: 180
likes: 12
---

## Pregunta

Tengo un proyecto mediano en Angular 15 estructurado tradicionalmente con `NgModule`. Quiero migrar a la nueva arquitectura `standalone` para eliminar los archivos de módulo redundantes. ¿Hay alguna manera automática de hacerlo o debo ir archivo por archivo?

## Respuesta

¡Sí, hay una forma automatizada excelente! Angular CLI incluye esquemas de migración integrados que realizan la mayor parte del trabajo pesado de forma segura.

### Paso 1: Ejecutar la migración automática
En la raíz de tu proyecto, ejecuta el siguiente comando:
```bash
ng g @angular/core:standalone
```

Este comando te guiará en 3 fases secuenciales:
1. **Convertir componentes, directivas y tuberías a Standalone:** Añade la propiedad `standalone: true` e inyecta las dependencias necesarias en sus metadatos.
2. **Eliminar NgModules innecesarios:** Remueve los módulos que quedan vacíos o que ya no son requeridos.
3. **Migrar el bootstrapping de la app:** Cambia tu archivo `main.ts` tradicional para usar `bootstrapApplication()` en lugar de arrancar a través de un módulo raíz.

### Paso 2: Verificación manual
Una vez completado el script, revisa que tus rutas utilicen la función de carga perezosa moderna `loadComponent`:
```typescript
{
  path: 'blog',
  loadComponent: () => import('./blog/blog.component').then(m => m.BlogComponent)
}
```
