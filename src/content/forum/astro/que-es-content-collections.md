---
title: "¿Qué son las Content Collections en Astro?"
slug: "que-es-content-collections"
category: "Astro"
author: "Adrián Morado"
createdAt: "2026-07-09"
tags:
  - astro
  - content-collections
  - markdown
resolved: true
views: 310
likes: 24
---

## Pregunta

Estoy construyendo un blog técnico en Astro y veo que recomiendan usar "Content Collections" en lugar de importar directamente los archivos Markdown con `import.meta.glob`. ¿Cuál es el beneficio de esto y cómo se configuran?

## Respuesta

Las **Content Collections** (Colecciones de Contenido) son la forma recomendada en Astro para estructurar y validar tus archivos de Markdown, MDX o JSON. Actúan como una base de datos local basada en archivos.

### Beneficios Principales

1. **Validación de Frontmatter:** Puedes definir un esquema estricto de TypeScript (usando Zod). Si creas un archivo Markdown al que le falta una propiedad obligatoria (como `title`), Astro detendrá la build y te mostrará el error exacto de validación.
2. **Tipado estricto (Type Safety):** Astro autogenera definiciones de TypeScript para tus colecciones. Al consultar tus artículos, tendrás autocompletado de todas tus propiedades de Frontmatter.
3. **Carga y caché eficientes:** Gestiona de forma inteligente la lectura de disco e inyección de datos durante la compilación.

### Ejemplo de Configuración
Se define en el archivo `src/content.config.ts`:
```typescript
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()),
  }),
});

export const collections = { blog };
```
Para consumirlos en una página de Astro, puedes usar la función `getCollection`:
```astro
---
import { getCollection } from 'astro:content';
const posts = await getCollection('blog');
---
```
