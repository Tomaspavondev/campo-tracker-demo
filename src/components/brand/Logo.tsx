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
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} x1="6" y1="40" x2="42" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1735AC" />
          <stop offset="55%" stopColor="#179ED9" />
          <stop offset="100%" stopColor="#16ADB0" />
        </linearGradient>
      </defs>
      <circle
        cx="24"
        cy="24"
        r="18"
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="4"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray="82 18"
        strokeDashoffset={-6}
        transform="rotate(-90 24 24)"
      />
      <circle cx="39.6" cy="12" r="2.6" fill={`url(#${gradientId})`} />
      <g transform="translate(10.2,13) scale(1.15)">
        <path
          d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
          fill={`url(#${gradientId})`}
        />
        <circle cx="12" cy="9" r="3.6" fill="#F2F5FA" />
        <path
          d="M9.8 9.2l1.5 1.5 3-3.5"
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
