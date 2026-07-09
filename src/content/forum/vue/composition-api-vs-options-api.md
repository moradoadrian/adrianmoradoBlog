---
title: "Vue 3: ¿Options API o Composition API?"
slug: "composition-api-vs-options-api"
category: "Vue"
author: "Adrián Morado"
createdAt: "2026-07-09"
tags:
  - vue
  - composition-api
  - options-api
resolved: true
views: 220
likes: 14
---

## Pregunta

Estoy comenzando un nuevo proyecto con Vue 3 y veo que hay dos maneras de programar los componentes: Options API (el estilo tradicional de Vue 2) y Composition API con `<script setup>`. ¿Cuál se considera la mejor práctica actual y por qué?

## Respuesta

Para cualquier proyecto nuevo o escalable en Vue 3, la recomendación oficial y mejor práctica de la comunidad es utilizar la **Composition API** (especialmente en su formato resumido `<script setup>`).

### Diferencias Clave

* **Options API:** Organiza el código por opciones del framework (`data()`, `methods`, `computed`, `mounted()`). Es fácil de entender al principio, pero en componentes grandes la lógica de una sola funcionalidad queda fragmentada en diferentes partes del archivo.
* **Composition API:** Organiza el código por **funcionalidades o lógica de negocio**. Te permite agrupar variables reactivas, funciones y hooks relacionados en un mismo lugar del archivo o incluso extraerlos a funciones reutilizables (*composables*).

### Ejemplo con `<script setup>`
```vue
<script setup>
import { ref, computed } from 'vue';

const contador = ref(0);
const doble = computed(() => contador.value * 2);

function incrementar() {
  contador.value++;
}
</script>

<template>
  <button @click="incrementar">Doble: {{ doble }}</button>
</template>
```
Este enfoque ofrece un soporte sobresaliente para **TypeScript**, una sintaxis más corta y limpia, y un rendimiento ligeramente superior en compilación.
