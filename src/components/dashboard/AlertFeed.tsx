import { AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { alertas, type Alerta } from '@/data/mockData';
import { getUsuarioById } from '@/lib/derived';
import { cn } from '@/lib/utils';

const severidadColor: Record<Alerta['severidad'], string> = {
  baja: 'bg-slate-100 text-slate-700',
  media: 'bg-amber-100 text-amber-700',
  alta: 'bg-red-100 text-red-700',
};

export function AlertFeed() {
  return (
    <Card className="flex h-[480px] flex-col p-4">
      <div className="mb-3 flex items-center gap-2 text-slate-900">
        <AlertTriangle className="h-4 w-4" />
        <h2 className="font-semibold">Centro de Alertas</h2>
      </div>
      <div className="flex flex-1 flex-col gap-3 overflow-y-auto">
        {alertas.map((alerta) => {
          const usuario = getUsuarioById(alerta.usuarioId);
          return (
            <div key={alerta.id} className="rounded-lg border border-slate-100 p-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-900">{usuario?.nombre}</span>
                <Badge className={cn('font-normal', severidadColor[alerta.severidad])}>
                  {alerta.severidad}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-slate-600">{alerta.descripcion}</p>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-xs text-slate-400">{alerta.hace}</span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" className="h-auto p-0 text-xs text-blue-600">
                      Ver detalle
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>{alerta.descripcion}</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-2 text-sm text-slate-600">
                      <div><span className="font-medium text-slate-900">Usuario:</span> {usuario?.nombre}</div>
                      <div><span className="font-medium text-slate-900">Grupo:</span> {usuario?.grupo}</div>
                      <div><span className="font-medium text-slate-900">Severidad:</span> {alerta.severidad}</div>
                      <div><span className="font-medium text-slate-900">Última ubicación:</span> {usuario?.ultimaUbicacion.direccion}</div>
                      <div><span className="font-medium text-slate-900">Reportado:</span> {alerta.hace}</div>
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
