import { AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { alertas, type Alerta } from '@/data/mockData';
import { getUsuarioById } from '@/lib/derived';
import { cn } from '@/lib/utils';

const severidadColor: Record<Alerta['severidad'], string> = {
  baja: 'bg-[var(--state-idle-bg)] text-[var(--state-idle)]',
  media: 'bg-[var(--state-deviation-bg)] text-[var(--state-deviation)]',
  alta: 'bg-[var(--state-alert-bg)] text-[var(--state-alert)]',
};

export function AlertFeed() {
  return (
    <Card className="flex h-[480px] flex-col p-4">
      <div className="mb-3 flex items-center gap-2 text-foreground">
        <AlertTriangle className="h-4 w-4 text-[var(--state-deviation)]" />
        <h2 className="font-heading font-semibold">Centro de Alertas</h2>
      </div>
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
        {alertas.map((alerta) => {
          const usuario = getUsuarioById(alerta.usuarioId);
          return (
            <div key={alerta.id} className="rounded-lg border border-border p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{usuario?.nombre}</span>
                <Badge className={cn('font-normal', severidadColor[alerta.severidad])}>
                  {alerta.severidad}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{alerta.descripcion}</p>
              <div className="mt-1 flex items-center justify-between">
                <span className="font-mono text-xs text-muted-foreground">{alerta.hace}</span>
                <Dialog>
                  <DialogTrigger
                    render={<Button variant="link" className="h-auto p-0 text-xs text-primary" />}
                  >
                    Ver detalle
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{alerta.descripcion}</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                      <div><span className="font-medium text-foreground">Usuario:</span> {usuario?.nombre}</div>
                      <div><span className="font-medium text-foreground">Grupo:</span> {usuario?.grupo}</div>
                      <div><span className="font-medium text-foreground">Severidad:</span> {alerta.severidad}</div>
                      <div><span className="font-medium text-foreground">Última ubicación:</span> <span className="font-mono">{usuario?.ultimaUbicacion.direccion}</span></div>
                      <div><span className="font-medium text-foreground">Reportado:</span> <span className="font-mono">{alerta.hace}</span></div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
