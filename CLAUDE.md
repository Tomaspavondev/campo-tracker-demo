# AccesoTDF — contexto del proyecto

SaaS de trazabilidad y control de personal de campo en tiempo real (seguridad, reparto,
distribución) para Tierra del Fuego, Argentina. Este directorio es el demo/MVP en desarrollo.

Contexto de negocio y de la demo original: `docs/superpowers/specs/2026-08-05-campo-tracker-demo-design.md`
y `docs/superpowers/plans/2026-08-05-campo-tracker-demo.md`.

**La marca ya está cerrada y aprobada por el cliente.** Kit oficial de assets (SVG editables,
PNG exportados, tokens en CSS/JSON/Tailwind) en `docs/brand/assets/` — es la fuente de verdad,
por encima de cualquier descripción en prosa de este archivo o del manual PDF
(`docs/brand/IDENTIDAD-ACCESOTDF.pdf`, que es la referencia conceptual pero no trae los
archivos finales). Si un valor de acá y uno de `docs/brand/assets/tokens.json` no coinciden,
gana `tokens.json`. Toda pantalla, componente o pieza nueva de este proyecto tiene que salir de
estos assets/tokens, no de valores de Tailwind por defecto ni de otra paleta.

## Marca

- Nombre: **AccesoTDF** — wordmark siempre como "ACCESO" + "TDF" en teal, peso 800 (Archivo
  ExtraBold), nunca como una sola palabra de un solo color. Ver
  `docs/brand/assets/svg/logo-horizontal-fondo-oscuro.svg` para el lockup completo de referencia.
- Tagline: "Control total. Siempre." — versalitas cuando va como label, IBM Plex Mono, tracking
  amplio, color `text-muted-foreground` (se resuelve solo en ambos temas).
- Isotipo: pin de mapa + check + arco abierto con pulso (continuidad/monitoreo en tiempo real).
  **La geometría real está en `docs/brand/assets/svg/isotipo-*.svg`** — el componente React en
  `src/components/brand/Logo.tsx` (`<Isotipo />`, `<Wordmark />`, `<Logo />`) es una copia 1:1
  del path/circle de `isotipo-color.svg`, no una aproximación. Si el kit se actualiza, volver a
  copiar la geometría desde ahí — no rediseñar el ícono a ojo.
  - Variantes disponibles para otros contextos (todas en `docs/brand/assets/svg/` y
    `docs/brand/assets/png/`): `isotipo-color` (uso general, fondo oscuro), `isotipo-blanco` /
    `isotipo-navy` / `isotipo-teal` (una tinta, para vinilo/sello/bordado), `isotipo-simplificado-*`
    (pin+check sin arco — obligatorio para cualquier uso menor a 24px de alto, incluido favicon),
    `logo-horizontal-*` / `logo-vertical-*` (lockup completo con wordmark, fondo claro u oscuro).
  - Regla dura del kit: el isotipo completo nunca baja de 24px de alto; por debajo, usar
    `isotipo-simplificado`. Margen libre mínimo alrededor del logo: 1/4 del alto del isotipo en
    los cuatro lados.
- El degradé completo (azul profundo → celeste → teal, `linear-gradient(100deg, ...)`, ver
  `brand.gradient` en `src/lib/brand.ts`) se reserva para el isotipo, botones primarios y **una
  sola pieza destacada por pantalla**. Nunca como fondo de página completo.
- El pin del isotipo usa su propio degradé secundario (celeste→azul, ver `pg` en
  `isotipo-color.svg`), distinto del degradé del arco — no son el mismo gradiente reutilizado,
  es un detalle real del diseño que hay que preservar si se retoca el componente.

## Paleta y modo claro/oscuro

**Todo color vive como variable CSS en `src/index.css`, nunca hardcodeado en un componente.**
Hay dos bloques: `:root` (oscuro, default) y `:root.light` (claro, se activa agregando la clase
`light` a `<html>` — lo maneja `src/lib/theme.ts` con `useTheme()`, persistido en
`localStorage` bajo la key `accesotdf-theme`). El toggle vive en el footer del sidebar
(`src/components/layout/Sidebar.tsx`).

Un componente **nunca** debe escribir `text-[#2FBF71]` ni ningún hex literal — siempre
`text-[var(--nombre-del-token)]` (o las clases semánticas de shadcn que ya resuelven solas:
`bg-background`, `text-foreground`, `bg-card`, `text-muted-foreground`, etc.). Así ambos temas
funcionan sin ningún `if (theme === ...)` en componentes. Excepción deliberada: el degradé del
isotipo y `PhoneFrame` (bisel de teléfono, un celular físico no cambia de color con el tema).

Tokens de estado (`--state-*`) — cambian de valor entre modo oscuro/claro para mantener
contraste AA, pero el nombre es el mismo en los dos temas:

| Token | Uso |
|---|---|
| `--state-done` / `--state-done-bg` | Completada / activo |
| `--state-deviation` / `--state-deviation-bg` | Desvío / advertencia |
| `--state-idle` / `--state-idle-bg` | Inactividad / desconectado / pendiente |
| `--state-reassigned` / `--state-reassigned-bg` | Reasignada |
| `--state-alert` / `--state-alert-bg` | Alerta / pánico (SOS) |
| `--state-en-turno` / `--state-en-turno-bg` | En turno (usa el teal de marca — es el único estado que también es color de marca) |

Valores exactos oscuro/claro de cada token: ver `src/index.css`. Fuente original del modo claro:
`docs/brand/assets/tokens-claro.css` — **ojo**, ese archivo del cliente está pensado para
documentos impresos/propuestas/contratos, no para UI. Se reusó su paleta de color para el
producto, pero no sus reglas de layout (ahí dice "nunca sombras ni bordes redondeados
grandes" — eso es válido para PDFs, no para las cards del dashboard, que sí llevan sombra/radio
como cualquier UI de shadcn).

El degradé de marca (`brand.gradient` en `src/lib/brand.ts`) es idéntico en ambos temas — se
reserva para el isotipo, botones primarios y una sola pieza destacada por pantalla, nunca como
fondo de página.

## Tipografía

Tres familias, todas self-hosted vía `@fontsource` (ya en `package.json`, importadas en
`src/index.css`) — no usar Google Fonts CDN ni otras familias:

- **Títulos** → Archivo (600/700). Clase `font-heading`.
- **Texto/cuerpo** → Source Sans 3 (400/600). Clase `font-sans` (default).
- **Datos** (coordenadas, horarios, IDs de tarea, cualquier valor que deba compararse en
  columna) → IBM Plex Mono (400/500). Clase `font-mono`. Formato de ejemplo:
  `-53.7877, -67.7461 · 14:32:07 · TSK-40917`.

Nunca renderizar un dato (coordenada, hora, ID) en la fuente de texto normal — siempre
`font-mono`. Es una regla explícita del manual, no un detalle cosmético.

## Reglas de aplicación

- El producto soporta modo oscuro (default) y modo claro, con toggle persistente — ver sección
  de paleta arriba. Nueva pantalla/componente: usar siempre los tokens semánticos, nunca hex fijo,
  para que funcione en ambos sin trabajo extra.
- Contraste mínimo AA. No usar texto terciario en tamaño menor a 14px.
- El isotipo nunca se estira, deforma, rota ni se aplica sobre fondos de bajo contraste.
- Radio de esquina, tipografía y espaciado siguen los componentes ya definidos en
  `src/components/ui/*` (shadcn) — no introducir un segundo sistema de espaciado.

## Stack (sin cambios respecto al demo original)

React + Vite + TypeScript + Tailwind CSS v4 + shadcn/ui (sobre Base UI, no Radix — la API de
composición usa `render={<Elemento />}` en vez de `asChild`) + lucide-react + react-router-dom.
Deploy: GitHub Pages vía `npm run deploy` (repo público, ver README).
