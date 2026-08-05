export type EstadoUsuario = 'activo' | 'inactivo' | 'alerta';

export interface UsuarioCampo {
  id: string;
  nombre: string;
  grupo: 'Seguridad' | 'Reparto' | 'Administración';
  estado: EstadoUsuario;
  gpsHabilitado: boolean;
  // lat/lng son valores 0-100 (posición porcentual en el mapa SVG),
  // no coordenadas GPS reales.
  ultimaUbicacion: { lat: number; lng: number; direccion: string };
  ultimaActualizacion: string;
  ultimaTarea: string;
}

export interface Alerta {
  id: string;
  usuarioId: string;
  tipo: 'desvio_ruta' | 'gps_deshabilitado' | 'sos' | 'objetivo_incumplido';
  severidad: 'baja' | 'media' | 'alta';
  descripcion: string;
  hace: string;
}

export interface Tarea {
  id: string;
  usuarioId: string;
  grupo: string;
  descripcion: string;
  estado: 'pendiente' | 'en_curso' | 'completada';
  hora: string;
  tieneEvidencia: boolean;
}

export interface GrupoTrabajo {
  nombre: 'Seguridad' | 'Reparto' | 'Administración';
  formularios: string[];
  objetivoDiario: { actual: number; meta: number; unidad: string };
  indicador: string;
}

export const usuarios: UsuarioCampo[] = [
  { id: 'u1', nombre: 'Martín Ferreyra', grupo: 'Seguridad', estado: 'activo', gpsHabilitado: true, ultimaUbicacion: { lat: 28, lng: 35, direccion: 'Av. Belgrano 1450' }, ultimaActualizacion: 'hace 2 min', ultimaTarea: 'Ronda perimetral depósito norte' },
  { id: 'u2', nombre: 'Rocío Bahamonde', grupo: 'Seguridad', estado: 'activo', gpsHabilitado: true, ultimaUbicacion: { lat: 42, lng: 55, direccion: 'Costanera y Belgrano' }, ultimaActualizacion: 'hace 4 min', ultimaTarea: 'Control de acceso planta' },
  { id: 'u3', nombre: 'Ezequiel Soto', grupo: 'Seguridad', estado: 'alerta', gpsHabilitado: true, ultimaUbicacion: { lat: 65, lng: 30, direccion: 'Ruta Complementaria km 3' }, ultimaActualizacion: 'hace 12 min', ultimaTarea: 'Ronda sector industrial' },
  { id: 'u4', nombre: 'Yamila Coronel', grupo: 'Seguridad', estado: 'inactivo', gpsHabilitado: false, ultimaUbicacion: { lat: 18, lng: 62, direccion: 'Malvinas Argentinas 780' }, ultimaActualizacion: 'hace 41 min', ultimaTarea: 'Cierre de turno noche' },
  { id: 'u5', nombre: 'Braian Alvarado', grupo: 'Seguridad', estado: 'activo', gpsHabilitado: true, ultimaUbicacion: { lat: 55, lng: 20, direccion: 'Piedra Buena 210' }, ultimaActualizacion: 'hace 1 min', ultimaTarea: 'Recorrida cámaras sector B' },
  { id: 'u6', nombre: 'Antonella Vera', grupo: 'Reparto', estado: 'activo', gpsHabilitado: true, ultimaUbicacion: { lat: 33, lng: 68, direccion: 'San Martín 990' }, ultimaActualizacion: 'hace 3 min', ultimaTarea: 'Entrega pedido #4521' },
  { id: 'u7', nombre: 'Iván Mansilla', grupo: 'Reparto', estado: 'activo', gpsHabilitado: true, ultimaUbicacion: { lat: 71, lng: 45, direccion: 'Islas Malvinas 340' }, ultimaActualizacion: 'hace 5 min', ultimaTarea: 'Entrega pedido #4519' },
  { id: 'u8', nombre: 'Camila Yagupsky', grupo: 'Reparto', estado: 'alerta', gpsHabilitado: true, ultimaUbicacion: { lat: 20, lng: 80, direccion: 'Onas 512' }, ultimaActualizacion: 'hace 8 min', ultimaTarea: 'Entrega pedido #4525' },
  { id: 'u9', nombre: 'Nazareno Paredes', grupo: 'Reparto', estado: 'inactivo', gpsHabilitado: true, ultimaUbicacion: { lat: 48, lng: 15, direccion: 'Alberdi 655' }, ultimaActualizacion: 'hace 55 min', ultimaTarea: 'Fin de recorrido matutino' },
  { id: 'u10', nombre: 'Delfina Huenchul', grupo: 'Reparto', estado: 'activo', gpsHabilitado: true, ultimaUbicacion: { lat: 60, lng: 72, direccion: 'Estados Unidos 233' }, ultimaActualizacion: 'hace 6 min', ultimaTarea: 'Entrega pedido #4530' },
  { id: 'u11', nombre: 'Lucas Rondinelli', grupo: 'Administración', estado: 'activo', gpsHabilitado: true, ultimaUbicacion: { lat: 38, lng: 40, direccion: 'Luisa Rufino 120' }, ultimaActualizacion: 'hace 7 min', ultimaTarea: 'Auditoría de stock local' },
  { id: 'u12', nombre: 'Sofía Almonacid', grupo: 'Administración', estado: 'activo', gpsHabilitado: true, ultimaUbicacion: { lat: 45, lng: 40, direccion: 'Luisa Rufino 120' }, ultimaActualizacion: 'hace 9 min', ultimaTarea: 'Carga de planilla de caja' },
  { id: 'u13', nombre: 'Tomás Kranevitter', grupo: 'Administración', estado: 'activo', gpsHabilitado: true, ultimaUbicacion: { lat: 41, lng: 43, direccion: 'Luisa Rufino 120' }, ultimaActualizacion: 'hace 1 min', ultimaTarea: 'Verificación de pedidos pendientes' },
];

export const alertas: Alerta[] = [
  { id: 'a1', usuarioId: 'u3', tipo: 'desvio_ruta', severidad: 'media', descripcion: 'Desvío de ruta detectado', hace: 'hace 12 min' },
  { id: 'a2', usuarioId: 'u4', tipo: 'gps_deshabilitado', severidad: 'alta', descripcion: 'GPS deshabilitado', hace: 'hace 3 min' },
  { id: 'a3', usuarioId: 'u8', tipo: 'sos', severidad: 'alta', descripcion: 'Botón SOS activado', hace: 'hace 8 min' },
  { id: 'a4', usuarioId: 'u9', tipo: 'objetivo_incumplido', severidad: 'baja', descripcion: 'Objetivo diario por debajo de la meta', hace: 'hace 20 min' },
  { id: 'a5', usuarioId: 'u3', tipo: 'objetivo_incumplido', severidad: 'baja', descripcion: 'Ronda pendiente fuera de horario', hace: 'hace 35 min' },
  { id: 'a6', usuarioId: 'u8', tipo: 'desvio_ruta', severidad: 'media', descripcion: 'Desvío de ruta detectado', hace: 'hace 40 min' },
];

export const tareas: Tarea[] = [
  { id: 't1', usuarioId: 'u1', grupo: 'Seguridad', descripcion: 'Ronda perimetral depósito norte', estado: 'completada', hora: '08:15', tieneEvidencia: true },
  { id: 't2', usuarioId: 'u2', grupo: 'Seguridad', descripcion: 'Control de acceso planta', estado: 'en_curso', hora: '09:40', tieneEvidencia: false },
  { id: 't3', usuarioId: 'u3', grupo: 'Seguridad', descripcion: 'Ronda sector industrial', estado: 'en_curso', hora: '10:05', tieneEvidencia: false },
  { id: 't4', usuarioId: 'u4', grupo: 'Seguridad', descripcion: 'Cierre de turno noche', estado: 'completada', hora: '06:50', tieneEvidencia: true },
  { id: 't5', usuarioId: 'u5', grupo: 'Seguridad', descripcion: 'Recorrida cámaras sector B', estado: 'pendiente', hora: '11:30', tieneEvidencia: false },
  { id: 't6', usuarioId: 'u6', grupo: 'Reparto', descripcion: 'Entrega pedido #4521', estado: 'completada', hora: '09:10', tieneEvidencia: true },
  { id: 't7', usuarioId: 'u7', grupo: 'Reparto', descripcion: 'Entrega pedido #4519', estado: 'completada', hora: '08:55', tieneEvidencia: true },
  { id: 't8', usuarioId: 'u8', grupo: 'Reparto', descripcion: 'Entrega pedido #4525', estado: 'en_curso', hora: '10:20', tieneEvidencia: false },
  { id: 't9', usuarioId: 'u9', grupo: 'Reparto', descripcion: 'Entrega pedido #4528', estado: 'pendiente', hora: '11:00', tieneEvidencia: false },
  { id: 't10', usuarioId: 'u10', grupo: 'Reparto', descripcion: 'Entrega pedido #4530', estado: 'en_curso', hora: '10:45', tieneEvidencia: false },
  { id: 't11', usuarioId: 'u10', grupo: 'Reparto', descripcion: 'Entrega pedido #4531', estado: 'pendiente', hora: '11:50', tieneEvidencia: false },
  { id: 't12', usuarioId: 'u11', grupo: 'Administración', descripcion: 'Auditoría de stock local', estado: 'en_curso', hora: '09:00', tieneEvidencia: false },
  { id: 't13', usuarioId: 'u12', grupo: 'Administración', descripcion: 'Carga de planilla de caja', estado: 'completada', hora: '08:30', tieneEvidencia: false },
  { id: 't14', usuarioId: 'u13', grupo: 'Administración', descripcion: 'Verificación de pedidos pendientes', estado: 'completada', hora: '09:20', tieneEvidencia: false },
  { id: 't15', usuarioId: 'u11', grupo: 'Administración', descripcion: 'Reporte semanal de novedades', estado: 'pendiente', hora: '12:00', tieneEvidencia: false },
  { id: 't16', usuarioId: 'u1', grupo: 'Seguridad', descripcion: 'Revisión de cerraduras acceso sur', estado: 'pendiente', hora: '12:30', tieneEvidencia: false },
];

export const grupos: GrupoTrabajo[] = [
  { nombre: 'Seguridad', formularios: ['Ronda perimetral', 'Incidente de seguridad', 'Control de acceso'], objetivoDiario: { actual: 8, meta: 12, unidad: 'rondas' }, indicador: '91% cumplimiento semanal' },
  { nombre: 'Reparto', formularios: ['Confirmación de entrega', 'Devolución de mercadería', 'Novedad de reparto'], objetivoDiario: { actual: 14, meta: 20, unidad: 'entregas' }, indicador: '87% cumplimiento semanal' },
  { nombre: 'Administración', formularios: ['Auditoría de stock', 'Carga de caja diaria', 'Reporte de novedades'], objetivoDiario: { actual: 3, meta: 4, unidad: 'tareas' }, indicador: '96% cumplimiento semanal' },
];
