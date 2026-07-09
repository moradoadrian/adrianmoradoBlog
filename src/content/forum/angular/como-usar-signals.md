---
title: "¿Cómo usar Angular Signals?"
slug: "como-usar-signals"
category: "Angular"
author: "Adrián Morado"
createdAt: "2026-07-09"
tags:
  - angular
  - signals
  - reactividad
resolved: true
views: 340
likes: 28
---

## Pregunta

Estoy comenzando con Angular Signals en la versión 17+ y me confunde un poco cuándo debo usar un `signal` normal, cuándo un `computed` y cuándo un `effect`. ¿Alguien podría darme una explicación práctica con ejemplos de uso?

## Respuesta

Las **Signals** introducen un nuevo modelo de reactividad de grano fino en Angular. Aquí tienes un desglose rápido de cada tipo:

### 1. Writable Signals (`signal`)
Son valores que puedes modificar directamente con `.set()` o `.update()`.
```typescript
const contador = signal(0);
contador.set(5); // Establece directamente
contador.update(val => val + 1); // Basado en el valor previo
```

### 2. Computed Signals (`computed`)
Son valores calculados que dependen de otras signals. Son de solo lectura y se recalculan de forma perezosa (solo cuando cambian las dependencias).
```typescript
const contador = signal(5);
const doble = computed(() => contador() * 2); // Devuelve 10
```

### 3. Effects (`effect`)
Se ejecutan automáticamente cuando cambian las signals que se leen en su interior. Úsalos solo para efectos secundarios (guardar en localStorage, logs, integraciones con librerías externas), **nunca** para modificar otros estados.
```typescript
effect(() => {
  console.log('El contador actual es:', contador());
});
```
