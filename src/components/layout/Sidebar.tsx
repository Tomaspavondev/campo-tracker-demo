import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UsersRound, ClipboardList, MapPinned, BarChart3, Settings } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { cn } from '@/lib/utils';

const navItems = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Usuarios', to: '/proximamente/usuarios', icon: Users },
  { label: 'Grupos de trabajo', to: '/grupos', icon: UsersRound },
  { label: 'Formularios', to: '/proximamente/formularios', icon: ClipboardList },
  { label: 'Rutas y Geocercas', to: '/proximamente/rutas', icon: MapPinned },
  { label: 'Reportes', to: '/proximamente/reportes', icon: BarChart3 },
  { label: 'Configuración', to: '/proximamente/configuracion', icon: Settings },
];

export function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      <div className="flex h-16 items-center px-5">
        <Logo iconSize={26} />
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-3">
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={onNavigate}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-sidebar-primary/10 text-sidebar-primary'
                  : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
              )
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="border-t border-sidebar-border px-5 py-3 font-mono text-[10px] tracking-[0.16em] text-sidebar-foreground/60 uppercase">
        Control total. Siempre.
      </div>
    </aside>
  );
}
