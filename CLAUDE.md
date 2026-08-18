# AccesoTDF — contexto del proyecto

SaaS de trazabilidad y control de personal de campo en tiempo real (seguridad, reparto,
distribución) para Tierra del Fuego, Argentina. Este directorio es el demo/MVP en desarrollo.

Contexto de negocio y de la demo original: `docs/superpowers/specs/2026-08-05-campo-tracker-demo-design.md`
y `docs/superpowers/plans/2026-08-05-campo-tracker-demo.md`.

**La marca ya está cerrada y aprobada por el cliente.** Manual completo en
`docs/brand/IDENTIDAD-ACCESOTDF.pdf`. Lo que sigue es el extracto accionable — toda pantalla,
componente o pieza nueva de este proyecto tiene que salir de estas reglas, no de valores de
Tailwind por defecto ni de otra paleta. Si hace falta un color o un tamaño que no está acá, la
regla es lo que hay que discutir, no la excepción (así lo dice el manual).

## Marca

- Nombre: **AccesoTDF** — wordmark siempre como "ACCESO" + "TDF" en teal (`text-[#159DAA]` o
  el token `--brand-teal`), nunca como una sola palabra de un solo color.
- Tagline: "CONTROL TOTAL. SIEMPRE." — versalitas, tracking amplio, gris secundario.
- Isotipo: pin de mapa + check + arco abierto (continuidad/monitoreo). Componente ya
  implementado en `src/components/brand/Logo.tsx` (`<Isotipo />` y `<Wordmark />`). No
  recrear el ícono a mano en otros archivos — importar de ahí.
- El degradé completo (azul profundo → celeste → teal) se reserva para el isotipo, botones
  primarios y **una sola pieza destacada por pantalla**. Nunca como fondo de página completo.

## Paleta (hex exactos del manual — usar siempre estos valores, no aproximar)

Centralizados en `src/lib/brand.ts` como `brand.colors.*` y `brand.status.*`. Resumen:

| Uso | Token | Hex |
|---|---|---|
| Degradé isotipo — azul profundo | `brand.colors.azulProfundo` | `#1735AC` |
| Degradé isotipo — celeste | `brand.colors.celeste` | `#179ED9` |
| Degradé isotipo — teal | `brand.colors.teal` | `#16ADB0` |
| Wordmark — "ACCESO" | `brand.colors.navy` | `#071028` |
| Wordmark — "TDF" | `brand.colors.tealWordmark` | `#159DAA` |
| Fondo base (lienzo) | `brand.colors.bgBase` | `#010B1A` |
| Fondo superficie (tarjetas) | `brand.colors.bgSurface` | `#071028` |
| Fondo elevado (inputs, modales) | `brand.colors.bgElevated` | `#0D1A33` |
| Texto primario | `brand.colors.textPrimary` | `#F2F5FA` |
| Texto secundario | `brand.colors.textSecondary` | `#A8AEC0` |
| Texto terciario (nunca <14px) | `brand.colors.textTertiary` | `#4A5266` |
| Borde / hairline | `brand.colors.border` | `#17233C` |

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
