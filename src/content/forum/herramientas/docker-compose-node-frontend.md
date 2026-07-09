---
title: "Evitar que Docker Compose sobreescriba node_modules local"
slug: "docker-compose-node-frontend"
category: "Herramientas"
author: "Adrián Morado"
createdAt: "2026-07-09"
tags:
  - docker
  - node_modules
  - herramientas
resolved: true
views: 230
likes: 13
---

## Pregunta

Estoy levantando mi aplicación de Node.js / React local con Docker Compose usando montajes de volumen para el Hot Reloading (`- .:/app`). Sin embargo, al iniciar el contenedor, la carpeta `node_modules` que se genera en el contenedor sobreescribe mi carpeta local (o viceversa) y causa fallos de permisos o de dependencias faltantes. ¿Cómo soluciono esto?

## Respuesta

Este es uno de los problemas más comunes al usar volúmenes montados con Node.js en Docker. Cuando montas tu directorio actual (`.:/app`), Docker mapea **todo** lo que está en tu disco físico sobre el contenedor, ocultando o eliminando el `node_modules` creado internamente en la imagen durante la fase de `npm install`.

### Solución: Utilizar un Volumen Anónimo para `node_modules`

Debes indicarle a Docker Compose que monte tu directorio raíz, pero que mantenga la carpeta `/app/node_modules` dentro del almacenamiento interno aislado del contenedor (sin mapearla a tu máquina física).

Esto se logra declarando un **volumen anónimo específico** en tu archivo `docker-compose.yml`:

```yaml
version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    volumes:
      # 1. Monta tu código para permitir Hot Reload (HMR)
      - .:/app
      # 2. Crea un volumen anónimo protector para node_modules
      - /app/node_modules
```

### ¿Cómo funciona?
Al declarar `- /app/node_modules`, Docker crea un espacio de almacenamiento temporal dentro del contenedor para esa ruta en específico. Dado que las rutas más específicas tienen precedencia, Docker evitará que el montaje general (`.:/app`) sobreescriba los módulos de Node que se instalaron en el contenedor durante el paso de compilación (`RUN npm install`).
