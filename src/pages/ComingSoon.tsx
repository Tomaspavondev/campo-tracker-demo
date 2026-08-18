import { useParams } from 'react-router-dom';
import { Construction } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';

const nombres: Record<string, string> = {
  usuarios: 'Usuarios',
  formularios: 'Formularios',
  rutas: 'Rutas y Geocercas',
  reportes: 'Reportes',
  configuracion: 'Configuración',
};

export function ComingSoon() {
  const { seccion } = useParams<{ seccion: string }>();
  const titulo = nombres[seccion ?? ''] ?? 'Sección';

  return (
    <AppShell>
      <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
        <Construction className="h-10 w-10" />
        <h1 className="font-heading text-xl font-semibold text-foreground">{titulo}</h1>
        <p>Esta sección está en desarrollo.</p>
      </div>
    </AppShell>
  );
}
