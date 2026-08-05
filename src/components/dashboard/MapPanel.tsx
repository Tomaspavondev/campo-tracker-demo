import { MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { usuarios, type EstadoUsuario } from '@/data/mockData';
import { cn } from '@/lib/utils';

const colorPorEstado: Record<EstadoUsuario, string> = {
  activo: 'text-green-600',
  inactivo: 'text-slate-400',
  alerta: 'text-red-600',
};

export function MapPanel() {
  return (
    <Card className="relative h-[480px] overflow-hidden p-0">
      {/* Mapa estilizado de Río Grande — ilustración SVG, no imagen/API externa */}
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <rect width="100" height="100" fill="#eef2f7" />
        <path d="M0 78 Q 25 70 50 76 T 100 72 V100 H0 Z" fill="#cfe3f5" />
        <line x1="0" y1="20" x2="100" y2="20" stroke="#d7dee7" strokeWidth="0.6" />
        <line x1="0" y1="45" x2="100" y2="45" stroke="#d7dee7" strokeWidth="0.6" />
        <line x1="0" y1="63" x2="100" y2="63" stroke="#d7dee7" strokeWidth="0.6" />
        <line x1="20" y1="0" x2="20" y2="100" stroke="#d7dee7" strokeWidth="0.6" />
        <line x1="50" y1="0" x2="50" y2="100" stroke="#d7dee7" strokeWidth="0.6" />
        <line x1="75" y1="0" x2="75" y2="100" stroke="#d7dee7" strokeWidth="0.6" />
        <text x="2" y="18.5" fontSize="2.5" fill="#94a3b8">Av. Belgrano</text>
        <text x="2" y="62" fontSize="2.5" fill="#94a3b8">Ruta Complementaria</text>
        <text x="30" y="80" fontSize="2.5" fill="#7ea6c9">Costanera</text>
      </svg>

      {usuarios.map((u) => (
        <Popover key={u.id}>
          <PopoverTrigger
            render={
              <button
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-1 shadow-md ring-2 ring-white transition-transform hover:scale-110"
                style={{ left: `${u.ultimaUbicacion.lat}%`, top: `${u.ultimaUbicacion.lng}%` }}
                aria-label={u.nombre}
              />
            }
          >
            <MapPin className={cn('h-5 w-5', colorPorEstado[u.estado])} fill="currentColor" />
          </PopoverTrigger>
          <PopoverContent className="w-64">
            <div className="flex flex-col gap-1">
              <div className="font-semibold text-slate-900">{u.nombre}</div>
              <div className="text-sm text-slate-500">{u.grupo}</div>
              <div className="mt-2 text-sm text-slate-600">{u.ultimaUbicacion.direccion}</div>
              <div className="text-xs text-slate-400">{u.ultimaActualizacion}</div>
              <div className="mt-2 text-sm text-slate-600">Última tarea: {u.ultimaTarea}</div>
            </div>
          </PopoverContent>
        </Popover>
      ))}
    </Card>
  );
}
