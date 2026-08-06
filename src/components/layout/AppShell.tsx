import { useState } from 'react';
import type { ReactNode } from 'react';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { Sidebar } from '@/components/layout/Sidebar';
import { cn } from '@/lib/utils';

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 md:flex-row">
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-slate-900 px-4 md:hidden">
        <div className="flex items-center gap-2 text-white">
          <ShieldCheck className="h-5 w-5 text-blue-400" />
          <span className="text-sm font-semibold">Panel de Control</span>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 hover:text-white"
          aria-label="Abrir menú"
        >
          <Menu className="h-5 w-5" />
        </button>
      </header>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 shadow-2xl transition-transform duration-200 ease-out md:static md:z-auto md:shadow-none md:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="relative h-full">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="absolute top-4 right-3 rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white md:hidden"
            aria-label="Cerrar menú"
          >
            <X className="h-5 w-5" />
          </button>
          <Sidebar onNavigate={() => setOpen(false)} />
        </div>
      </div>

      <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
    </div>
  );
}
