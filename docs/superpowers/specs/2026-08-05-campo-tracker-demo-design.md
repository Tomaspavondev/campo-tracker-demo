# Demo visual — Plataforma de seguimiento de personal en campo

**Fecha**: 2026-08-05
**Estado**: Aprobado, pendiente de implementación

## Contexto

Cliente nuevo en Tierra del Fuego: un grupo de socios que ya conocía una plataforma de seguimiento de personal de campo desarrollada para un cliente en Ecuador, y decidió construir su propia versión como producto SaaS propio para vender por suscripción a empleadores/distribuidoras locales (seguridad, reparto, distribución, administración) en Tierra del Fuego.

Contrato de desarrollo de 3 meses (Mes 1: MVP, Mes 2: testing/funcionalidades, Mes 3: lanzamiento/marketing) recién arrancando, sin cerrar formalmente. El cliente ya respondió un brief de auditoría detallado sobre el modelo funcional de la plataforma de referencia (base de este spec).

**Objetivo de este entregable**: demo visual navegable, con datos 100% mock, para mostrar esta semana y sostener el entusiasmo inicial del cliente — no funcionalidad real conectada a backend. El código sí debe ser reutilizable como punto de partida del MVP real (Mes 1), no descartable.

**Identidad visual**: el cliente todavía no tiene marca ni nombre definido. Estilo profesional, tecnológico y neutro (referencia: Datadog, Notion, Linear), fácil de re-skinear más adelante. Sin marca propia del desarrollador.

## Modelo de negocio (no inventar roles distintos)

Dos tipos de usuario únicamente:
- **Administrador/Supervisor** — usa el Dashboard web.
- **Usuario de Campo** — usa la app móvil.

No hay roles tipo "vendedor", "seguridad", "repartidor" como entidades separadas. La diferenciación es por **Grupos de Trabajo** (ej: Seguridad, Reparto, Administración), cada uno con sus propios formularios, tareas, rutas (opcional), objetivos y KPIs de productividad.

## Alcance de esta demo

**Incluido**:
1. Dashboard principal del supervisor (KPIs + mapa + centro de alertas + tabla de tareas) — foco principal.
2. Showcase de 3 pantallas de la app móvil (mockup dentro de marcos de celular).
3. Si alcanza el tiempo: vista de Grupos de trabajo con formularios/objetivos.
4. Login simulado (sin autenticación real).
5. Sidebar de navegación completa (secciones no implementadas navegan a un estado "Próximamente" con el mismo layout).

**Explícitamente fuera de alcance**:
- Backend real, base de datos, autenticación real.
- Integración de mapas reales (Google Maps/Mapbox) con API keys.
- Formulario builder funcional.
- Cualquier lógica de negocio real (todo el estado es estático/mock, sin persistencia).

## Decisiones de diseño (confirmadas con el usuario)

| Decisión | Elegido |
|---|---|
| Nombre del proyecto/directorio | `campo-tracker-demo` |
| Ciudad del mapa | Solo Río Grande |
| Cantidad de usuarios de campo mock | 12-15 (13 elegido) |
| Técnica de mapa | SVG/CSS estilizado tipo ilustración (no imagen externa, no API) |
| Color de acento | Azul tecnológico (`blue-500`/`blue-600`) sobre sidebar `slate-900` |
| Pantalla de login | Sí, simulada — cualquier submit navega a `/dashboard` |

## Arquitectura técnica

**Stack**: Vite + React 18 + TypeScript + TailwindCSS + shadcn/ui + Recharts + react-router-dom. Sin llamadas de red — todo el estado sale de un archivo de datos mock en memoria.

**Rutas**:
```
/login          → login simulado (cualquier submit → /dashboard)
/dashboard      → pantalla principal (foco del demo)
/mobile         → showcase de las 3 pantallas de la app móvil
/grupos         → vista de los 3 grupos de trabajo (prioridad 3, si alcanza el tiempo)
```

**Sidebar** (visible tras login): Dashboard, Usuarios, Grupos de trabajo, Formularios, Rutas y Geocercas, Reportes, Configuración. Solo Dashboard y Grupos de trabajo son funcionales; el resto navega a un estado "Próximamente" con el mismo layout, para que la sidebar transmita la visión completa del producto sin fingir funcionalidad inexistente.

**Estructura de carpetas**:
```
campo-tracker-demo/
├── docs/superpowers/specs/      ← este spec
├── src/
│   ├── data/
│   │   └── mockData.ts          ← única fuente de verdad: usuarios, grupos, alertas, tareas
│   ├── components/
│   │   ├── layout/               (Sidebar, AppShell)
│   │   ├── dashboard/            (KpiRow, MapPanel, AlertFeed, TaskTable)
│   │   ├── mobile-showcase/      (PhoneFrame + 3 pantallas)
│   │   └── ui/                   (shadcn components)
│   ├── pages/                    (Login, Dashboard, MobileShowcase, Grupos, ComingSoon)
│   └── App.tsx
```

## Modelo de datos mock

Archivo único `src/data/mockData.ts`, tipado en TypeScript, para que KPIs, mapa, alertas y tabla queden siempre coherentes entre sí (ej: un usuario con alerta activa aparece en rojo tanto en el mapa como en la tabla).

```ts
type EstadoUsuario = 'activo' | 'inactivo' | 'alerta';

interface UsuarioCampo {
  id: string;
  nombre: string;                // nombres argentinos
  grupo: 'Seguridad' | 'Reparto' | 'Administración';
  estado: EstadoUsuario;
  gpsHabilitado: boolean;
  ultimaUbicacion: { lat: number; lng: number; direccion: string }; // direcciones reales de Río Grande
  ultimaActualizacion: string;   // "hace 4 min"
  ultimaTarea: string;
}

interface Alerta {
  id: string;
  usuarioId: string;
  tipo: 'desvio_ruta' | 'gps_deshabilitado' | 'sos' | 'objetivo_incumplido';
  severidad: 'baja' | 'media' | 'alta';
  descripcion: string;
  hace: string;
}

interface Tarea {
  id: string;
  usuarioId: string;
  grupo: string;
  descripcion: string;
  estado: 'pendiente' | 'en_curso' | 'completada';
  hora: string;
  tieneEvidencia: boolean;
}

interface GrupoTrabajo {
  nombre: 'Seguridad' | 'Reparto' | 'Administración';
  formularios: string[];
  objetivoDiario: { actual: number; meta: number; unidad: string };
  indicador: string;             // ej: "94% cumplimiento semanal"
}
```

**Volumen de contenido**:
- 13 usuarios de campo: ~5 Seguridad / 5 Reparto / 3 Administración. Nombres argentinos, direcciones reales de Río Grande (Av. Belgrano, Costanera, Ruta Complementaria, Malvinas Argentinas, etc.).
- Distribución de estados: ~9 activos, 2 inactivos, 2 en alerta (para que los KPIs no muestren todo en verde).
- 5-6 alertas en el feed, severidades mixtas (baja/media/alta), asociadas a usuarios reales de la lista.
- 15-18 tareas del día repartidas entre los 3 grupos, representando los 3 estados (pendiente/en curso/completada).

## Componentes del Dashboard

- **KpiRow**: 5 cards (ícono + número + label + color de estado) — Usuarios activos (verde), Desconectados (gris), GPS deshabilitado (ámbar), Alertas activas (rojo), Objetivos cumplidos hoy % (azul). Los números se derivan en vivo de `mockData`, nunca hardcodeados, para que siempre cuadren con el resto de la pantalla. "Objetivos cumplidos hoy %" = tareas con `estado: 'completada'` / total de tareas del día, redondeado a entero.
- **MapPanel**: mapa SVG estilizado de Río Grande (calles principales dibujadas, sin imagen ni API externa) con markers posicionados desde `lat/lng` mapeados a coordenadas relativas del SVG. Como no hay proyección geográfica real, `lat/lng` en `mockData` son valores arbitrarios ya pre-normalizados a un rango 0-100 (no coordenadas GPS reales) que se usan directo como `left/top` porcentual del marker dentro del contenedor del mapa. Click en marker → `Popover` (shadcn) con nombre, grupo, última ubicación, hace cuánto, última tarea. Color de marker según `estado`.
- **AlertFeed**: panel lateral, lista scrolleable tipo feed, `Badge` de severidad por color, botón "Ver detalle" que abre un `Dialog` con el detalle completo de la alerta y el usuario asociado.
- **TaskTable**: `Table` (shadcn) con `Tabs` para filtrar Seguridad / Reparto / Administración / Todos. Columnas: Usuario, Grupo, Tarea, Estado (badge de color), Hora, Evidencia (ícono de cámara si `tieneEvidencia`).

## Mobile showcase (`/mobile`)

3 `PhoneFrame` (marco de celular en CSS puro) lado a lado:
1. Lista de tareas asignadas del día, con estado.
2. Formulario en proceso de llenado — preview de foto mock + textarea de observación.
3. Confirmación de tarea completada — indicador de sincronización offline/online (punto verde/gris + texto "Sincronizado" / "Pendiente de sincronización").

No interactivo (mockup estático dentro de los marcos).

## Login

Pantalla centrada, logo placeholder genérico (ícono + texto "Panel de Control"), inputs de usuario/contraseña sin validación, botón que navega directo a `/dashboard`. Sin lógica de autenticación real.

## Sistema visual

- Fondo `slate-50`, sidebar `slate-900` con texto `slate-300` / ítem activo en azul `blue-500`.
- Cards `bg-white`, `shadow-sm`, `rounded-xl`.
- Tipografía Inter (Google Fonts o system fallback).
- Paleta semántica consistente en todos los componentes: verde (activo/completado), gris (inactivo/desconectado), ámbar (advertencia/GPS deshabilitado), rojo (alerta/SOS).

## Testing

Sin tests automatizados — es una demo visual de datos estáticos, no hay lógica de negocio que verificar. Validación manual: correr `npm run dev`, navegar las 3-4 rutas, confirmar que KPIs/mapa/alertas/tabla muestran datos consistentes entre sí y que no hay errores de consola.

## Fuera de alcance para después (no implementar ahora)

- Conexión a backend/base de datos real.
- Autenticación real.
- Mapas con API real (Google Maps/Mapbox).
- Formulario builder.
- Rutas y Geocercas, Reportes, Configuración, Usuarios (quedan como "Próximamente" en la sidebar).
