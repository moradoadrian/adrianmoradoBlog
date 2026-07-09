---
title: "HTML Semántico para mejorar el SEO Técnico"
slug: "seo-semantico-buenas-practicas"
category: "HTML"
author: "Adrián Morado"
createdAt: "2026-07-09"
tags:
  - html
  - seo
  - semantica
resolved: true
views: 240
likes: 16
---

## Pregunta

Estoy reestructurando el maquetado de mi sitio web y me doy cuenta de que utilizo demasiados contenedores `<div>` para estructurarlo todo. ¿Por qué es importante utilizar HTML semántico para el posicionamiento en buscadores (SEO) y cuáles son las etiquetas estructurales indispensables?

## Respuesta

El uso excesivo de `<div>` (conocido como *Divitis*) oculta el significado de tu contenido a los rastreadores de motores de búsqueda (como Googlebot) y a los lectores de pantalla de accesibilidad.

El **HTML Semántico** le da significado y estructura a tu página, permitiendo que los buscadores identifiquen inmediatamente las secciones más importantes del documento para indexarlo mejor.

### Etiquetas Estructurales Clave

1. **`<header>`**: Define la cabecera de la página o de una sección específica (suele contener logos y el menú).
2. **`<nav>`**: Agrupa los enlaces de navegación del sitio. Google le da especial peso a estos enlaces para entender el mapa de tu web.
3. **`<main>`**: Indica el contenido principal y exclusivo de la página. **Solo debe haber un `<main>` por página**.
4. **`<article>`**: Representa una composición autónoma y reutilizable (ej. un post del blog, una pregunta del foro, un comentario).
5. **`<section>`**: Agrupa contenido temático relacionado (ej. la sección de contacto, la sección de habilidades). Debe contener idealmente un encabezado (`<h2>`-`<h6>`).
6. **`<aside>`**: Contenido indirectamente relacionado (ej. barras laterales, publicidad, enlaces a artículos sugeridos).
7. **`<footer>`**: El pie de página con derechos de autor, enlaces legales y redes sociales.

### Ejemplo de Estructura Correcta
```html
<body>
  <header>
    <nav>...</nav>
  </header>
  
  <main>
    <article>
      <h1>Título del artículo</h1>
      <p>Contenido...</p>
    </article>
  </main>
  
  <footer>...</footer>
</body>
```
