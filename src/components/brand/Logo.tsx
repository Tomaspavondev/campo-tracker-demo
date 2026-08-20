import { useId } from 'react';
import { cn } from '@/lib/utils';

/**
 * Isotipo AccesoTDF — geometría copiada 1:1 de docs/brand/assets/svg/isotipo-color.svg
 * (kit oficial del cliente). No modificar a mano: si cambia el kit, volver a copiar el
 * `path`/`circle` de ese archivo. Los IDs de gradiente se generan por instancia con
 * useId para poder renderizar el isotipo más de una vez en la misma página (sidebar +
 * login, por ejemplo) sin que los `<linearGradient>` colisionen.
 */
export function Isotipo({ className, size = 32 }: { className?: string; size?: number }) {
  const uid = useId();
  const arcGradientId = `${uid}-ag`;
  const pinGradientId = `${uid}-pg`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={arcGradientId} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1735AC" />
          <stop offset="52%" stopColor="#179ED9" />
          <stop offset="100%" stopColor="#16ADB0" />
        </linearGradient>
        <linearGradient id={pinGradientId} x1="18%" y1="0%" x2="82%" y2="100%">
          <stop offset="0%" stopColor="#2BA6DD" />
          <stop offset="52%" stopColor="#1B58C4" />
          <stop offset="100%" stopColor="#1735AC" />
        </linearGradient>
      </defs>
      <circle
        cx="60"
        cy="60"
        r="46"
        fill="none"
        stroke={`url(#${arcGradientId})`}
        strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray="214 76"
      />
      <circle cx="92" cy="27" r="7.5" fill="#16ADB0" />
      <path
        d="M58 101 C58 101 82 74 82 52 A24 24 0 1 0 34 52 C34 74 58 101 58 101 Z"
        fill={`url(#${pinGradientId})`}
      />
      <circle cx="58" cy="52" r="13.5" fill="#FFFFFF" />
      <path
        d="M51.5 52.6 L56.2 57.3 L64.6 47.6"
        fill="none"
        stroke="#071028"
        strokeWidth="4.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * "ACCESO" usa el color de texto primario y "TDF" el teal de marca — ambos ya son
 * variables CSS que cambian solas entre modo oscuro y claro (ver src/index.css), así
 * que este componente no necesita saber en qué tema está.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('font-heading font-extrabold tracking-[-0.02em]', className)}>
      <span className="text-foreground">ACCESO</span>
      <span className="text-primary">TDF</span>
    </span>
  );
}

export function Logo({ className, iconSize = 32 }: { className?: string; iconSize?: number }) {
  return (
    <div className={cn('flex items-center gap-2.5', className)}>
      <Isotipo size={iconSize} />
      <Wordmark className="text-lg" />
    </div>
  );
}
