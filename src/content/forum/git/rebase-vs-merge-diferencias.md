---
title: "Git: ¿Rebase o Merge?"
slug: "rebase-vs-merge-diferencias"
category: "Git"
author: "Adrián Morado"
createdAt: "2026-07-09"
tags:
  - git
  - rebase
  - merge
resolved: true
views: 350
likes: 26
---

## Pregunta

En mi equipo de desarrollo algunos integran los cambios de sus ramas usando `git merge` y otros prefieren usar `git rebase`. ¿Cuáles son las diferencias fundamentales y qué ventajas ofrece cada flujo para el historial del repositorio?

## Respuesta

Tanto `git merge` como `git rebase` resuelven el mismo problema: integrar los commits de una rama (por ejemplo, `feature`) en otra rama (como `main`). Sin embargo, lo hacen alterando el historial de maneras muy distintas:

### 1. Git Merge
Crea un **commit de fusión especial (Merge Commit)** que une el historial de ambas ramas.

* **Pros:** Es no destructivo. No altera los commits existentes de ninguna manera, preservando la historia real y cronológica del desarrollo.
* **Contras:** El árbol del historial puede volverse sumamente complejo y difícil de leer ("historias con forma de trenzas") si hay muchas ramas simultáneas.

```bash
git checkout main
git merge feature
```

### 2. Git Rebase
Reescribe el historial moviendo los commits de la rama `feature` y colocándolos **directamente encima** del último commit de la rama `main`, como si se hubieran programado a partir de ahí.

* **Pros:** Genera un historial limpio, plano y lineal. Es extremadamente fácil de leer y seguir.
* **Contras:** Reescribe la historia modificando los hashes de los commits originales. **Nunca** debes usar `rebase` en ramas públicas compartidas (como `main`), ya que desincronizará el trabajo del resto de programadores del equipo.

```bash
git checkout feature
git rebase main
```
