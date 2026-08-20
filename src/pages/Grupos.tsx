import { ClipboardList, Target } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/card';
import { grupos } from '@/data/mockData';
import { brand } from '@/lib/brand';

export function Grupos() {
  return (
    <AppShell>
      <h1 className="mb-6 font-heading text-xl font-semibold text-foreground">Grupos de trabajo</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {grupos.map((g) => (
          <Card key={g.nombre} className="flex flex-col gap-4 p-5">
            <h2 className="font-heading text-lg font-semibold text-foreground">{g.nombre}</h2>

            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground/80">
                <ClipboardList className="h-4 w-4" />
                Formularios asignados
              </div>
              <ul className="flex flex-col gap-1 text-sm text-muted-foreground">
                {g.formularios.map((f) => (
                  <li key={f} className="rounded-md bg-muted px-2 py-1">{f}</li>
                ))}
              </ul>
            </div>

            <div>
              <div className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground/80">
                <Target className="h-4 w-4" />
                Objetivo diario
              </div>
              <div className="font-mono text-sm text-muted-foreground">
                {g.objetivoDiario.actual} / {g.objetivoDiario.meta} {g.objetivoDiario.unidad}
              </div>
              <div className="mt-2 h-2 w-full rounded-full bg-muted">
                <div
                  className="h-2 rounded-full"
                  style={{
                    width: `${Math.min(100, Math.round((g.objetivoDiario.actual / g.objetivoDiario.meta) * 100))}%`,
                    backgroundImage: brand.gradient,
                  }}
                />
              </div>
            </div>

            <div className="text-sm text-muted-foreground">{g.indicador}</div>
          </Card>
        ))}
      </div>
    </AppShell>
  );
}
