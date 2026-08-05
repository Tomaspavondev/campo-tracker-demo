import { usuarios, tareas, alertas, type UsuarioCampo, type Tarea } from '@/data/mockData';

export function getUsuarioById(id: string): UsuarioCampo | undefined {
  return usuarios.find((u) => u.id === id);
}

export function getKpis() {
  const activos = usuarios.filter((u) => u.estado === 'activo').length;
  const desconectados = usuarios.filter((u) => u.estado === 'inactivo').length;
  const gpsDeshabilitado = usuarios.filter((u) => !u.gpsHabilitado).length;
  const alertasActivas = alertas.length;
  const completadas = tareas.filter((t) => t.estado === 'completada').length;
  const objetivosPct = Math.round((completadas / tareas.length) * 100);
  return { activos, desconectados, gpsDeshabilitado, alertasActivas, objetivosPct };
}

export function getTareasPorGrupo(grupo: string | 'Todos'): Tarea[] {
  if (grupo === 'Todos') return tareas;
  return tareas.filter((t) => t.grupo === grupo);
}
