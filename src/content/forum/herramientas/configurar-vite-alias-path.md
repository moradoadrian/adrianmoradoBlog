---
title: "¿Cómo configurar alias de rutas (path aliases) en Vite?"
slug: "configurar-vite-alias-path"
category: "Herramientas"
author: "Adrián Morado"
createdAt: "2026-07-09"
tags:
  - vite
  - tsconfig
  - herramientas
resolved: true
views: 210
likes: 15
---

## Pregunta

En mi proyecto de React y Vite, mis importaciones de archivos profundos se ven horribles y difíciles de mantener, así:

```typescript
import Button from '../../../../components/ui/Button';
```

Quiero poder usar alias cortos como `@/components/ui/Button` sin importar dónde me encuentre en el árbol de carpetas. ¿Cómo configuro Vite y TypeScript para lograr esto?

## Respuesta

Para habilitar los alias de ruta en tu proyecto, debes configurar dos archivos: `tsconfig.json` (para que el editor de código reconozca las rutas y te dé autocompletado) y `vite.config.ts` (para que el compilador resuelva las rutas reales al empaquetar).

### Paso 1: Configurar `tsconfig.json`
Añade las propiedades `baseUrl` y `paths` dentro de `compilerOptions`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Paso 2: Configurar `vite.config.ts`
Debes mapear el alias `@` al directorio físico `src`. Puedes hacerlo manualmente o instalando el plugin oficial `vite-tsconfig-paths` que lee la configuración directamente del paso 1 de forma automática.

#### Opción Automática (Recomendada):
Instala el paquete:
```bash
npm install -D vite-tsconfig-paths
```

Actualiza tu archivo de configuración de Vite:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()]
});
```

¡Listo! A partir de ahora podrás importar de manera limpia utilizando el prefijo `@`:
```typescript
import Button from '@/components/ui/Button';
```
