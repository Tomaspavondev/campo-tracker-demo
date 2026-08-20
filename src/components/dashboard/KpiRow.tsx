import { Users, UserX, MapPinOff, AlertTriangle, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { getKpis } from '@/lib/derived';
import { cn } from '@/lib/utils';

const kpiConfig = [
  { key: 'activos', label: 'Usuarios activos', icon: Users, color: 'text-[var(--state-done)] bg-[var(--state-done-bg)]', suffix: '' },
  { key: 'desconectados', label: 'Desconectados', icon: UserX, color: 'text-[var(--state-idle)] bg-[var(--state-idle-bg)]', suffix: '' },
  { key: 'gpsDeshabilitado', label: 'GPS deshabilitado', icon: MapPinOff, color: 'text-[var(--state-deviation)] bg-[var(--state-deviation-bg)]', suffix: '' },
  { key: 'alertasActivas', label: 'Alertas activas', icon: AlertTriangle, color: 'text-[var(--state-alert)] bg-[var(--state-alert-bg)]', suffix: '' },
  { key: 'objetivosPct', label: 'Objetivos cumplidos hoy', icon: Target, color: 'text-[var(--state-en-turno)] bg-[var(--state-en-turno-bg)]', suffix: '%' },
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
            <div className="font-heading text-2xl font-semibold text-foreground">
              {kpis[key]}
              {suffix ?? ''}
            </div>
            <div className="text-sm text-muted-foreground">{label}</div>
          </div>
        </Card>
      ))}
    </div>
  );
}
