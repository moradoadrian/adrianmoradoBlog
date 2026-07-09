---
title: "Error de Hidratación en Astro (Hydration Mismatch)"
slug: "error-de-hidratacion"
category: "Astro"
author: "Adrián Morado"
createdAt: "2026-07-09"
tags:
  - astro
  - react
  - hidratacion
resolved: true
views: 280
likes: 17
---

## Pregunta

Tengo un componente de React para un carrusel que integré en mi sitio estático de Astro con la directiva `client:load`. Sin embargo, en la consola del navegador obtengo el siguiente error de advertencia en rojo:

```text
Warning: Expected server HTML to contain a matching <div> in <div>.
```

¿Qué significa esto y cómo puedo solucionarlo?

## Respuesta

Este error se conoce como **Desajuste de Hidratación (Hydration Mismatch)**. Ocurre cuando el HTML que se genera en el servidor durante la compilación estática de Astro no coincide exactamente con el HTML inicial que genera React en el navegador durante la hidratación.

### Causas Comunes

1. **Uso de variables globales exclusivas del navegador:** El servidor de Astro ejecuta Node.js, donde `window`, `document` o `localStorage` no existen. Si tu código evalúa algo como `window.innerWidth` durante el renderizado inicial, en el servidor valdrá una constante o fallará, mientras que en el cliente tendrá el ancho real de la ventana.
2. **Uso de fechas dinámicas:** Formatear fechas con `new Date()` sin fijar la zona horaria generará un HTML compilado con la hora del servidor de build que chocará con la hora local de la máquina del usuario.

### Soluciones

#### Solución A: Utilizar useEffect para código del cliente
En tu componente de React, retrasa las lecturas exclusivas del navegador o actualizaciones interactivas usando un hook `useEffect` (que solo se ejecuta en el cliente):

```jsx
const [isClient, setIsClient] = useState(false);

useEffect(() => {
  setIsClient(true);
}, []);

if (!isClient) return <p>Cargando...</p>;
```

#### Solución B: Directiva client:only
Si el componente depende al 100% de APIs del navegador y no aporta nada al SEO (como un mapa interactivo), puedes forzar a que no se compile en el servidor usando `client:only`:

```astro
<Mapa client:only="react" />
```
*(Debes especificar el framework utilizado en la directiva).*
