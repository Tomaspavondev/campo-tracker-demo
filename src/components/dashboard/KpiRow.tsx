import { Users, UserX, MapPinOff, AlertTriangle, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { getKpis } from '@/lib/derived';
import { cn } from '@/lib/utils';

const kpiConfig = [
  { key: 'activos', label: 'Usuarios activos', icon: Users, color: 'text-green-600 bg-green-50' },
  { key: 'desconectados', label: 'Desconectados', icon: UserX, color: 'text-slate-500 bg-slate-100' },
  { key: 'gpsDeshabilitado', label: 'GPS deshabilitado', icon: MapPinOff, color: 'text-amber-600 bg-amber-50' },
  { key: 'alertasActivas', label: 'Alertas activas', icon: AlertTriangle, color: 'text-red-600 bg-red-50' },
  { key: 'objetivosPct', label: 'Objetivos cumplidos hoy', icon: Target, color: 'text-blue-600 bg-blue-50', suffix: '%' },
] as const;

export function KpiRow() {
  const kpis = getKpis();

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
      {kpiConfig.map(({ key, label, icon: Icon, color, suffix }) => (
        <Card key={key} className="flex flex-col gap-3 p-4">
          <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg', color)}>
            <Icon className="h-5 w-5" />
          </div>
          <div>
            <div className="text-2xl font-semibold text-slate-900">
              {kpis[key]}
              {suffix ?? ''}
            </div>
            <div className="text-sm text-slate-500">{label}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}
