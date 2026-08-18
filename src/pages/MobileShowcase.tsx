import { Camera, CheckCircle2, Cloud, CloudOff } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { PhoneFrame } from '@/components/mobile-showcase/PhoneFrame';
import { Badge } from '@/components/ui/badge';
import { tareas } from '@/data/mockData';

const estadoColor = {
  pendiente: 'bg-[#141A26] text-[#7C8296]',
  en_curso: 'bg-[#041E2C] text-[#16ADB0]',
  completada: 'bg-[#06231A] text-[#2FBF71]',
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
      <h1 className="mb-6 font-heading text-xl font-semibold text-foreground">App móvil — Usuario de Campo</h1>
      <div className="flex flex-wrap justify-center gap-10">
        <PhoneFrame title="Tareas del día">
          <div className="flex flex-col gap-2">
            {tareasDeUsuario.map((t) => (
              <div key={t.id} className="rounded-lg bg-card p-3 shadow-sm">
                <div className="text-sm font-medium text-foreground">{t.descripcion}</div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">{t.hora}</span>
                  <Badge className={estadoColor[t.estado]}>{estadoLabel[t.estado]}</Badge>
                </div>
              </div>
            ))}
          </div>
        </PhoneFrame>

        <PhoneFrame title="Formulario en proceso">
          <div className="flex flex-col gap-3">
            <div className="text-sm font-semibold text-foreground">Confirmación de entrega</div>
            <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-border bg-card text-muted-foreground">
              <Camera className="h-8 w-8" />
            </div>
            <div className="text-xs font-medium text-muted-foreground">Observación</div>
            <div className="rounded-lg bg-card p-2 text-sm text-foreground/80 shadow-sm">
              Entregado en portería, recibió el encargado del turno tarde.
            </div>
          </div>
        </PhoneFrame>

        <PhoneFrame title="Tarea completada">
          <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
            <CheckCircle2 className="h-14 w-14 text-[#2FBF71]" />
            <div className="text-sm font-semibold text-foreground">Tarea completada</div>
            <div className="flex items-center gap-2 rounded-full bg-[#06231A] px-3 py-1 text-xs text-[#2FBF71]">
              <Cloud className="h-3.5 w-3.5" />
              Sincronizado
            </div>
            <div className="flex items-center gap-2 rounded-full bg-[#141A26] px-3 py-1 text-xs text-[#7C8296]">
              <CloudOff className="h-3.5 w-3.5" />
              Pendiente de sincronización (offline)
            </div>
          </div>
        </PhoneFrame>
      </div>
    </AppShell>
  );
}
