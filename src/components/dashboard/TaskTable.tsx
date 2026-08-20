import { useState } from 'react';
import { Camera } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { getTareasPorGrupo, getUsuarioById } from '@/lib/derived';
import type { Tarea } from '@/data/mockData';
import { cn } from '@/lib/utils';

const grupos = ['Todos', 'Seguridad', 'Reparto', 'Administración'] as const;

const estadoColor: Record<Tarea['estado'], string> = {
  pendiente: 'bg-[var(--state-idle-bg)] text-[var(--state-idle)]',
  en_curso: 'bg-[var(--state-en-turno-bg)] text-[var(--state-en-turno)]',
  completada: 'bg-[var(--state-done-bg)] text-[var(--state-done)]',
};

const estadoLabel: Record<Tarea['estado'], string> = {
  pendiente: 'Pendiente',
  en_curso: 'En curso',
  completada: 'Completada',
};

export function TaskTable() {
  const [grupo, setGrupo] = useState<(typeof grupos)[number]>('Todos');
  const tareas = getTareasPorGrupo(grupo);

  return (
    <Card className="p-4">
      <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-heading font-semibold text-foreground">Tareas del día</h2>
        <Tabs value={grupo} onValueChange={(v) => setGrupo(v as typeof grupo)} className="overflow-x-auto">
          <TabsList>
            {grupos.map((g) => (
              <TabsTrigger key={g} value={g} className="whitespace-nowrap">{g}</TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Usuario</TableHead>
            <TableHead>Grupo</TableHead>
            <TableHead>Tarea</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Hora</TableHead>
            <TableHead>Evidencia</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tareas.map((t) => (
            <TableRow key={t.id}>
              <TableCell>{getUsuarioById(t.usuarioId)?.nombre}</TableCell>
              <TableCell className="text-muted-foreground">{t.grupo}</TableCell>
              <TableCell>{t.descripcion}</TableCell>
              <TableCell>
                <Badge className={cn('font-normal', estadoColor[t.estado])}>
                  {estadoLabel[t.estado]}
                </Badge>
              </TableCell>
              <TableCell className="font-mono text-muted-foreground">{t.hora}</TableCell>
              <TableCell>{t.tieneEvidencia && <Camera className="h-4 w-4 text-muted-foreground" />}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
