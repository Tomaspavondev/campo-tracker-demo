import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, UsersRound, ClipboardList, MapPinned, BarChart3, Settings } from 'lucide-react';
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

export function Sidebar() {
  return (
    <aside className="flex h-screen w-64 shrink-0 flex-col bg-slate-900 text-slate-300">
      <div className="flex h-16 items-center px-6 text-lg font-semibold text-white">
        Panel de Control
      </div>
      <nav className="flex flex-1 flex-col gap-1 px-3">
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                isActive
                  ? 'bg-blue-500/10 text-blue-400'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
              )
            }
          >
            <Icon className="h-4 w-4" />
            {label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
