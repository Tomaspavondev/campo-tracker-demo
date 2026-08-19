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
  amplio, color `--text-2` / `#A8AEC0`.
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

## Paleta (hex exactos del manual — usar siempre estos valores, no aproximar)

Centralizados en `src/lib/brand.ts` como `brand.colors.*` y `brand.status.*`. Resumen:

| Uso | Token | Hex |
|---|---|---|
| Degradé isotipo — azul profundo | `brand.colors.azulProfundo` | `#1735AC` |
| Degradé isotipo — celeste | `brand.colors.celeste` | `#179ED9` |
| Degradé isotipo — teal (marca, acción/interacción) | `brand.colors.teal` | `#16ADB0` |
| Teal una tinta / impresión | `brand.colors.tealPrint` | `#159DAA` |
| Wordmark — "ACCESO" | `brand.colors.textPrimary` | `#F2F5FA` (sobre oscuro) |
| Wordmark — "TDF" | `brand.colors.teal` | `#16ADB0` |
| Fondo base (lienzo) | `brand.colors.bgBase` | `#010B1A` |
| Fondo hundido (secciones internas) | `brand.colors.bgSunken` | `#040F22` |
| Fondo superficie (tarjetas) | `brand.colors.bgSurface` | `#071028` |
| Fondo elevado (inputs, modales) | `brand.colors.bgElevated` | `#0D1A33` |
| Texto primario | `brand.colors.textPrimary` | `#F2F5FA` |
| Texto secundario | `brand.colors.textSecondary` | `#A8AEC0` |
| Texto terciario (nunca <14px) | `brand.colors.textTertiary` | `#4A5266` |
| Borde / hairline | `brand.colors.border` | `#17233C` |
| Borde fuerte (divisores marcados) | `brand.colors.borderStrong` | `#1B2942` |

**Colores de estado** (nunca compiten con la marca — solo como indicador puntual, borde
lateral o badge, jamás como fondo pleno de tarjeta):

| Estado | Color | Fondo suave |
|---|---|---|
| Completada / activo | `#2FBF71` | `#06231A` |
| Desvío / advertencia | `#E8963A` | `#251A0F` |
| Inactividad / desconectado | `#7C8296` | `#141A26` |
| Reasignada / en curso | `#3B6BE0` | `#0A1836` |
| Alerta / pánico (SOS) | `#E4585B` | `#2A1116` |
| En turno (neutro-positivo) | `#16ADB0` (teal de marca) | `#041E2C` |

El teal de marca (`#16ADB0`) es el único color de estado que también es color de marca —
se usa para el estado "en turno" y para toda acción/interacción (botones, links, focus).

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

- El fondo de página SIEMPRE es oscuro (`bg-base` `#010B1A`). Esta marca no tiene versión
  "modo claro" para el producto — el dashboard de referencia del propio manual (pág. 6) ya
  es oscuro.
- Contraste mínimo AA. No usar texto terciario (`#4A5266`) en texto menor a 14px.
- El isotipo nunca se estira, deforma, rota ni se aplica sobre fondos de bajo contraste.
- Radio de esquina, tipografía y espaciado siguen los componentes ya definidos en
  `src/components/ui/*` (shadcn) — no introducir un segundo sistema de espaciado.

## Stack (sin cambios respecto al demo original)

React + Vite + TypeScript + Tailwind CSS v4 + shadcn/ui (sobre Base UI, no Radix — la API de
composición usa `render={<Elemento />}` en vez de `asChild`) + lucide-react + react-router-dom.
Deploy: GitHub Pages vía `npm run deploy` (repo público, ver README).
