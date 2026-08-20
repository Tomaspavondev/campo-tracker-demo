/**
 * El degradé de marca es idéntico en modo oscuro y claro (mismo valor en
 * docs/brand/assets/tokens.css y tokens-claro.css), así que es la única pieza de la
 * paleta que vale la pena tener acá. Todo lo demás (colores de fondo, texto, estado)
 * vive como variable CSS en src/index.css — cambia solo entre temas, no hace falta
 * una segunda copia en TypeScript. Usar `var(--nombre-del-token)` en los componentes.
 */
export const brand = {
  gradient: 'linear-gradient(100deg, #1735AC 0%, #179ED9 52%, #16ADB0 100%)',
} as const;
