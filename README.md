# Campo Tracker — Demo Visual

Demo navegable con datos 100% mock de una plataforma de seguimiento de personal en campo.
Sin backend, sin base de datos, sin autenticación real — pensado para mostrar el modelo
funcional del producto antes de construir el MVP conectado.

## Correr en local

```bash
npm install
npm run dev
```

Abrir http://localhost:5173/login — cualquier usuario/contraseña entra al dashboard.

## Rutas

- `/login` — login simulado
- `/dashboard` — pantalla principal (KPIs, mapa, alertas, tareas del día)
- `/mobile` — showcase de 3 pantallas de la app móvil
- `/grupos` — grupos de trabajo con formularios y objetivos

Datos mock en `src/data/mockData.ts`. Ver spec completo en
`docs/superpowers/specs/2026-08-05-campo-tracker-demo-design.md`.
