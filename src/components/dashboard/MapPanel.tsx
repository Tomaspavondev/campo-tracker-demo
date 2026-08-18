import { MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { usuarios, type EstadoUsuario } from '@/data/mockData';
import { cn } from '@/lib/utils';

const colorPorEstado: Record<EstadoUsuario, string> = {
  activo: 'text-[#2FBF71]',
  inactivo: 'text-[#7C8296]',
  alerta: 'text-[#E4585B]',
};

export function MapPanel() {
  return (
    <Card className="relative h-[480px] overflow-hidden p-0">
      {/* Mapa estilizado de Río Grande — ilustración SVG, no imagen/API externa */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <rect width="100" height="100" fill="#071028" />
        <path d="M0 78 Q 25 70 50 76 T 100 72 V100 H0 Z" fill="#0A1836" />
        <line x1="0" y1="20" x2="100" y2="20" stroke="#17233C" strokeWidth="0.6" />
        <line x1="0" y1="45" x2="100" y2="45" stroke="#17233C" strokeWidth="0.6" />
        <line x1="0" y1="63" x2="100" y2="63" stroke="#17233C" strokeWidth="0.6" />
        <line x1="20" y1="0" x2="20" y2="100" stroke="#17233C" strokeWidth="0.6" />
        <line x1="50" y1="0" x2="50" y2="100" stroke="#17233C" strokeWidth="0.6" />
        <line x1="75" y1="0" x2="75" y2="100" stroke="#17233C" strokeWidth="0.6" />
        <text x="2" y="18.5" fontSize="2.5" fill="#4A5266" fontFamily="'IBM Plex Mono', monospace">Av. Belgrano</text>
        <text x="2" y="62" fontSize="2.5" fill="#4A5266" fontFamily="'IBM Plex Mono', monospace">Ruta Complementaria</text>
        <text x="30" y="80" fontSize="2.5" fill="#179ED9" fontFamily="'IBM Plex Mono', monospace">Costanera</text>
      </svg>

      {usuarios.map((u) => (
        <Popover key={u.id}>
          <PopoverTrigger
            render={
              <button
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0D1A33] p-1 shadow-md ring-2 ring-[#17233C] transition-transform hover:scale-110"
                style={{ left: `${u.ultimaUbicacion.lat}%`, top: `${u.ultimaUbicacion.lng}%` }}
                aria-label={u.nombre}
              />
            }
          >
            <MapPin className={cn('h-5 w-5', colorPorEstado[u.estado])} fill="currentColor" />
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="flex flex-col gap-1">
              <div className="font-heading font-semibold text-foreground">{u.nombre}</div>
              <div className="text-sm text-muted-foreground">{u.grupo}</div>
              <div className="mt-2 font-mono text-sm text-foreground/80">{u.ultimaUbicacion.direccion}</div>
              <div className="font-mono text-xs text-muted-foreground">{u.ultimaActualizacion}</div>
              <div className="mt-2 text-sm text-foreground/80">Última tarea: {u.ultimaTarea}</div>
            </div>
          </PopoverContent>
        </Popover>
      ))}
    </Card>
  );
}
