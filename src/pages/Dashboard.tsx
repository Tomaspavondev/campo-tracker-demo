import { AppShell } from '@/components/layout/AppShell';
import { KpiRow } from '@/components/dashboard/KpiRow';
import { MapPanel } from '@/components/dashboard/MapPanel';
import { AlertFeed } from '@/components/dashboard/AlertFeed';
import { TaskTable } from '@/components/dashboard/TaskTable';

export function Dashboard() {
  return (
    <AppShell>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-xl font-semibold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-500">Río Grande, Tierra del Fuego</p>
        </div>
        <KpiRow />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <MapPanel />
          </div>
          <AlertFeed />
        </div>
        <TaskTable />
      </div>
    </AppShell>
  );
}
