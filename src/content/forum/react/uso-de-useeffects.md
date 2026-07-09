---
title: "Bucle infinito con el hook useEffect en React"
slug: "uso-de-useeffects"
category: "React"
author: "Adrián Morado"
createdAt: "2026-07-09"
tags:
  - react
  - hooks
  - useeffect
resolved: true
views: 290
likes: 19
---

## Pregunta

Estoy intentando cargar datos desde una API al cargar mi componente de React, pero al hacerlo entra en un bucle infinito de peticiones HTTP. Este es mi código:

```jsx
useEffect(() => {
  fetchData().then(res => setData(res));
});
```

¿Qué estoy haciendo mal y cómo puedo solucionarlo?

## Respuesta

El bucle infinito ocurre porque **no has definido una lista de dependencias** (el segundo argumento del hook `useEffect`).

Por defecto, si no pasas un array de dependencias, `useEffect` se ejecuta en **cada renderizado** del componente. Al llamar a `setData()`, actualizas el estado, lo que provoca un nuevo renderizado, lo que vuelve a ejecutar el `useEffect`, creando el bucle.

### Solución: Añadir el array de dependencias vacío `[]`

Si solo quieres cargar los datos una vez cuando el componente se monta, debes pasar un array vacío como segundo argumento:

```jsx
useEffect(() => {
  fetchData().then(res => setData(res));
}, []); // <-- Array de dependencias vacío
```

Si tu función depende de algún parámetro dinámico (como un ID de usuario), debes incluirlo dentro del array:

```jsx
useEffect(() => {
  fetchData(userId).then(res => setData(res));
}, [userId]); // Se ejecutará solo cuando userId cambie
```
