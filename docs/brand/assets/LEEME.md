# AccesoTDF · Identidad visual

Paquete de marca para desarrollo. Tema **oscuro por defecto**.
Tagline: **Control total. Siempre.**

## Contenido

    svg/                      vectores editables (usar SIEMPRE que se pueda)
    png/isotipo/              solo el simbolo, fondo transparente
    png/logotipo/             lockups horizontal y vertical, fondo transparente
    png/app-icon/             icono de aplicacion (1024 / 512 / 192 / 180)
    png/favicon/              favicon 512 / 64 / 32 / 16
    png/paleta-de-colores.png lamina de paleta
    tokens.css                variables CSS listas para pegar
    tokens.json               los mismos tokens en JSON
    tailwind.config.js        equivalente para Tailwind

## Que version usar

| Contexto | Archivo |
|---|---|
| App / web (tema oscuro) | `logo-horizontal-fondo-oscuro` |
| Documento o fondo claro | `logo-horizontal-fondo-claro` |
| Formato angosto o centrado | `logo-vertical-*` |
| Avatar, sidebar, marca ya presente | `isotipo-color` |
| Una tinta (vinilo, sello, bordado) | `isotipo-blanco` / `isotipo-navy` / `isotipo-teal` |
| Favicon y cualquier uso < 24 px | `favicon-*` / `isotipo-simplificado` (pin + check, sin arco) |

## Reglas duras

1. El isotipo completo no baja de **24 px** de alto. Por debajo, la variante simplificada.
2. Margen libre minimo alrededor del logo: **1/4 del alto del isotipo** en los cuatro lados.
3. El degrade de marca se usa en el isotipo, botones primarios y **una sola** pieza destacada por pantalla. Nunca como fondo de pagina.
4. `--brand-teal` (#16ADB0) es el color de accion e interaccion. El azul profundo aporta estructura.
5. Nunca deformar, rotar ni recolorear el simbolo fuera de la paleta.
6. Los colores de estado solo aparecen como indicador (punto, borde lateral, badge), nunca como fondo pleno de tarjeta.

## Tipografia

Las tres familias son gratuitas (Google Fonts / SIL OFL):

```html
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&family=Source+Sans+3:wght@300;400;600&display=swap" rel="stylesheet">
```

- **Archivo** — titulos y numeros grandes (500 / 600 / 800)
- **Source Sans 3** — texto corrido (300 / 400 / 600)
- **IBM Plex Mono** — coordenadas, horarios, IDs de tarea, patentes. Obligatoria para datos: el ancho fijo permite comparar en columna.

## Favicon / manifest

```html
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/app-icon-oscuro-180.png">
```

El icono de app usa radio del **22,5 % del lado** y el simbolo al **72 % del lienzo**, centrado opticamente. Para Android adaptativo: fondo en una capa, simbolo en la otra al 66 dp de 108 dp.
