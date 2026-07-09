---
title: "Centrar un Div: ¿Flexbox o CSS Grid?"
slug: "centrar-div-flex-vs-grid"
category: "CSS"
author: "Adrián Morado"
createdAt: "2026-07-09"
tags:
  - css
  - flexbox
  - grid
resolved: true
views: 310
likes: 21
---

## Pregunta

Siempre se bromea sobre lo difícil que es centrar un elemento en CSS. Sé que hoy en día con Flexbox y CSS Grid es muy sencillo. ¿Cuál es el código exacto para centrar horizontal y verticalmente en ambos enfoques y cuándo debería elegir uno sobre otro?

## Respuesta

Centrar un elemento hijo dentro de un contenedor padre es extremadamente sencillo hoy en día. Ambos métodos son válidos pero tienen pequeñas diferencias en su uso ideal:

### 1. Solución con Flexbox
Ideal cuando quieres centrar elementos distribuidos en **una sola dimensión** (una fila o una columna).

**Código CSS:**
```css
.contenedor-padre {
  display: flex;
  justify-content: center; /* Centrado horizontal */
  align-items: center;     /* Centrado vertical */
  min-height: 100vh;       /* Altura mínima necesaria para ver el centrado vertical */
}
```

### 2. Solución con CSS Grid
La forma más corta y recomendada cuando trabajas en **dos dimensiones** o quieres centrar un único elemento hijo en el centro exacto de la pantalla.

**Código CSS:**
```css
.contenedor-padre {
  display: grid;
  place-items: center; /* Centrado en ambos ejes simultáneamente */
  min-height: 100vh;
}
```

### ¿Cuál elegir?
* Usa **Grid** con `place-items: center` si tu contenedor solo tiene **un elemento hijo** que quieres centrar de manera absoluta en el espacio disponible.
* Usa **Flexbox** si tienes **múltiples elementos hijos** y quieres controlar la distribución lineal entre ellos (por ejemplo, alinearlos al centro pero con separación adaptada).
