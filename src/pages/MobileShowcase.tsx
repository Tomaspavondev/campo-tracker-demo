import { Camera, CheckCircle2, Cloud, CloudOff } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { PhoneFrame } from '@/components/mobile-showcase/PhoneFrame';
import { Badge } from '@/components/ui/badge';
import { tareas } from '@/data/mockData';

const estadoColor = {
  pendiente: 'bg-slate-100 text-slate-700',
  en_curso: 'bg-blue-100 text-blue-700',
  completada: 'bg-green-100 text-green-700',
} as const;

const estadoLabel = {
  pendiente: 'Pendiente',
  en_curso: 'En curso',
  completada: 'Completada',
} as const;

export function MobileShowcase() {
  const tareasDeUsuario = tareas.filter((t) => t.usuarioId === 'u6');

  return (
    <AppShell>
      <h1 className="mb-6 text-xl font-semibold text-slate-900">App móvil — Usuario de Campo</h1>
      <div className="flex flex-wrap justify-center gap-10">
        <PhoneFrame title="Tareas del día">
          <div className="flex flex-col gap-2">
            {tareasDeUsuario.map((t) => (
              <div key={t.id} className="rounded-lg bg-white p-3 shadow-sm">
                <div className="text-sm font-medium text-slate-900">{t.descripcion}</div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-xs text-slate-400">{t.hora}</span>
                  <Badge className={estadoColor[t.estado]}>{estadoLabel[t.estado]}</Badge>
                </div>
              </div>
            ))}
          </div>
        </PhoneFrame>

        <PhoneFrame title="Formulario en proceso">
          <div className="flex flex-col gap-3">
            <div className="text-sm font-semibold text-slate-900">Confirmación de entrega</div>
            <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-slate-300 bg-white text-slate-400">
              <Camera className="h-8 w-8" />
            </div>
            <div className="text-xs font-medium text-slate-500">Observación</div>
            <div className="rounded-lg bg-white p-2 text-sm text-slate-600 shadow-sm">
              Entregado en portería, recibió el encargado del turno tarde.
            </div>
          </div>
        </PhoneFrame>

        <PhoneFrame title="Tarea completada">
          <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
            <CheckCircle2 className="h-14 w-14 text-green-500" />
            <div className="text-sm font-semibold text-slate-900">Tarea completada</div>
            <div className="flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs text-green-700">
              <Cloud className="h-3.5 w-3.5" />
              Sincronizado
            </div>
            <div className="flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-500">
              <CloudOff className="h-3.5 w-3.5" />
              Pendiente de sincronización (offline)
            </div>
          </div>
        </PhoneFrame>
      </div>
    </AppShell>
  );
}
