import { useId } from 'react';
import { cn } from '@/lib/utils';

/**
 * Isotipo AccesoTDF: pin (lugar) + check (verificación) + arco abierto (monitoreo
 * en tiempo real) + pulso (transmisión activa). Interpretación vectorial propia a
 * partir del manual en docs/brand/ — no hay un SVG maestro exportado todavía.
 */
export function Isotipo({ className, size = 32 }: { className?: string; size?: number }) {
  const gradientId = useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="4" y1="34" x2="36" y2="6" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1735AC" />
          <stop offset="55%" stopColor="#179ED9" />
          <stop offset="100%" stopColor="#16ADB0" />
        </linearGradient>
      </defs>
      <circle
        cx="20"
        cy="20"
        r="15"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="3.4"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray="82 18"
        strokeDashoffset={-6}
        transform="rotate(-90 20 20)"
      />
      <circle cx="33" cy="10" r="2.2" fill={`url(#${gradientId})`} />
      <g transform="translate(8,6) scale(0.95)">
        <path
          d="M12 2C7.58 2 4 5.58 4 10c0 6 8 12 8 12s8-6 8-12c0-4.42-3.58-8-8-8z"
          fill={`url(#${gradientId})`}
        />
        <circle cx="12" cy="10" r="4.2" fill="#F2F5FA" />
        <path
          d="M9.6 10.3l1.7 1.7 3-3.6"
          stroke="#071028"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn('font-heading font-bold tracking-tight', className)}>
      <span className="text-[#F2F5FA]">ACCESO</span>
      <span className="text-[#159DAA]">TDF</span>
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
