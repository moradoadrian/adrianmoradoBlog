---
title: "¿Cuál es la diferencia entre ref y reactive en Vue?"
slug: "reactividad-con-ref-y-reactive"
category: "Vue"
author: "Adrián Morado"
createdAt: "2026-07-09"
tags:
  - vue
  - reactividad
  - ref
  - reactive
resolved: true
views: 195
likes: 11
---

## Pregunta

En Vue 3, a veces veo que usan `ref()` y otras veces `reactive()` para declarar el estado de los datos. ¿Cuándo debo utilizar cada uno y por qué se necesita usar `.value` con uno y con el otro no?

## Respuesta

La diferencia principal radica en qué tipos de datos acepta cada función y cómo los envuelve para hacerlos reactivos:

### 1. `ref()`
* **Tipos de datos:** Acepta cualquier tipo de dato (primitivos como strings, numbers, booleans, y también objetos o arrays complejos).
* **Acceso:** En el script debes acceder o modificar su valor usando `.value`. En el template se desempaqueta automáticamente (no hace falta usar `.value`).
```typescript
const nombre = ref('Adrián');
nombre.value = 'César'; // Requiere .value
```

### 2. `reactive()`
* **Tipos de datos:** Solo acepta objetos reactivos (Object, Array, Map, Set). **No** funciona con tipos primitivos.
* **Acceso:** No utiliza `.value`. Accedes a las propiedades del objeto directamente.
```typescript
const usuario = reactive({ nombre: 'Adrián', edad: 28 });
usuario.nombre = 'César'; // Directo
```

### Recomendación General
La convención más extendida en la comunidad de Vue 3 es usar siempre **`ref()`** por defecto. Evita confusiones sobre si un valor requiere `.value` o no, y permite reasignar objetos completos fácilmente, cosa que `reactive()` no permite sin perder la reactividad.
