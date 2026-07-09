---
title: "¿Qué son y cómo usar los tipos Genéricos en TypeScript?"
slug: "entendiendo-tipos-genericos"
category: "TypeScript"
author: "Adrián Morado"
createdAt: "2026-07-09"
tags:
  - typescript
  - generics
  - tipos
resolved: true
views: 260
likes: 18
---

## Pregunta

En muchas librerías de TypeScript veo firmas de funciones con `<T>` o clases que aceptan un tipo genérico. Me cuesta entender el concepto. ¿Qué es exactamente un tipo genérico y cómo puedo declarar uno propio?

## Respuesta

Los **Tipos Genéricos** son herramientas que te permiten crear componentes de código (funciones, clases, interfaces) reutilizables que pueden trabajar con **diferentes tipos de datos**, pero manteniendo un tipado estricto en lugar de recurrir al tipo comodín `any`.

Imagina que quieres crear una función que reciba una variable y retorne un array que la contenga.

### Enfoque sin genéricos (malo):
```typescript
function envolver(valor: any): any[] {
  return [valor];
}
// Al usarla, perdemos el tipo original del valor retornado
const miArray = envolver('hola'); // Tipo del array: any[]
```

### Enfoque con genéricos (bueno):
Utilizamos un parámetro de tipo, convencionalmente llamado `<T>`:
```typescript
function envolver<T>(valor: T): T[] {
  return [valor];
}
```
Cuando invocas la función, TypeScript infiere el tipo dinámicamente:
```typescript
const miArray = envolver('hola'); // Infiere de forma automática que es string[]
const miArrayNumeros = envolver(123); // Infiere que es number[]
```

### Restricciones en Genéricos (`extends`)
A veces necesitas limitar qué tipos acepta el genérico. Por ejemplo, que el tipo de entrada deba tener obligatoriamente una propiedad `.length`:
```typescript
interface ConLength {
  length: number;
}

function registrarLog<T extends ConLength>(elemento: T): void {
  console.log('Longitud:', elemento.length);
}
```
Esto permite usar la función con strings y arrays, pero fallará en tiempo de compilación si intentas pasar un número o un booleano.
