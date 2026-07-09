---
title: "¿Cómo solucionar el error de CORS en el navegador?"
slug: "problemas-con-cors"
category: "JavaScript"
author: "Adrián Morado"
createdAt: "2026-07-09"
tags:
  - javascript
  - cors
  - api
resolved: true
views: 390
likes: 22
---

## Pregunta

Estoy consumiendo un servicio backend propio desde mi aplicación frontend de desarrollo local. Al realizar el fetch, la consola me arroja el siguiente error y no carga ningún dato:

```text
Access to fetch at 'http://api.backend.local' from origin 'http://localhost:4321' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
```

¿Qué significa CORS y cómo puedo solucionarlo?

## Respuesta

El error de **CORS (Cross-Origin Resource Sharing)** es un mecanismo de seguridad implementado en los navegadores web. Su objetivo es bloquear peticiones HTTP que provengan de un origen diferente al del servidor que aloja la API, a menos que este servidor lo autorice explícitamente.

En tu caso, el frontend corre en `localhost:4321` y el backend en `api.backend.local`, por lo que son orígenes distintos.

### Soluciones

#### 1. Configurar los encabezados CORS en tu Backend (Recomendado)
La solución definitiva debe hacerse en el código del servidor (Backend). Debes configurar el servidor para que retorne los siguientes encabezados HTTP en sus respuestas:

* `Access-Control-Allow-Origin: http://localhost:4321` (o `*` para permitir cualquier origen, no recomendado en producción).
* `Access-Control-Allow-Methods: GET, POST, PUT, DELETE`.

**Ejemplo en Express (Node.js):**
```javascript
const cors = require('cors');
app.use(cors({ origin: 'http://localhost:4321' }));
```

**Ejemplo en C# (.NET Core):**
```csharp
app.UseCors(builder => builder.WithOrigins("http://localhost:4321").AllowAnyMethod().AllowAnyHeader());
```

#### 2. Usar un proxy en desarrollo (Si no controlas el backend)
Si no tienes acceso al código del backend, puedes configurar un proxy de desarrollo en el servidor de tu frontend (por ejemplo, en la configuración de Vite en Astro) para que las peticiones se reenvíen localmente del lado del servidor, burlando la validación CORS del navegador.
