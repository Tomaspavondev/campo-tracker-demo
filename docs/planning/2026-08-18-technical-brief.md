# AccesoTDF — Brief técnico pre-desarrollo

Documento de insumo técnico para planificación. Generado a partir de revisión directa del
repositorio `campo-tracker-demo` (estado al commit de la aplicación de marca, 2026-08-18), no
de descripciones de segunda mano. No contiene fechas de calendario ni precios.

## (a) Resumen del estado actual

El repositorio contiene una SPA en React 19 + Vite 8 + TypeScript ~6 + Tailwind CSS v4 +
shadcn/ui (variante construida sobre Base UI, no Radix — API de composición vía prop `render`
en vez de `asChild`, dato relevante porque la mayoría de ejemplos/documentación de shadcn en
circulación asume Radix) + react-router-dom + lucide-react. `recharts` está instalado como
dependencia pero no se usa en ningún componente — no hay gráficos implementados. Verificado por
grep sobre todo `src/`: cero llamadas `fetch`/`axios`/`WebSocket`, cero lectura de
`import.meta.env`, cero uso de `localStorage`/`sessionStorage`/tokens, cero `async`/`await` en
todo el proyecto. Es una aplicación puramente cliente, síncrona, sin ninguna forma de I/O de red.

Lo que sí está resuelto: la estructura de navegación completa (sidebar con 7 secciones, layout
responsive con drawer mobile), un modelo de datos objetivo bosquejado en 4 interfaces
TypeScript (`UsuarioCampo`, `Alerta`, `Tarea`, `GrupoTrabajo` en `src/data/mockData.ts`) con 13
usuarios / 6 alertas / 16 tareas / 3 grupos hardcodeados, el flujo de UX del dashboard de
supervisor (KPIs derivados, mapa con markers, centro de alertas, tabla de tareas filtrable por
grupo) validado visualmente con el cliente, y la identidad visual completa aplicada de punta a
punta (paleta exacta, tipografía de marca, componente de logo, tokens de estado por color —
documentado en `CLAUDE.md` del repo y respaldado en `docs/brand/`).

Lo que no existe en absoluto: backend, base de datos, autenticación funcional, tiempo real,
detección de desvíos real, notificaciones, app móvil instalable, y toda la infraestructura de
despliegue de producción. El deploy actual es GitHub Pages (build estático manual vía
`npm run deploy`), sin CI/CD, sin ambientes, sin backend en ningún lugar — no reutilizable para
producción salvo el pipeline de build del frontend.

## (b) Inventario de trabajo pendiente por frente técnico

### Backend / API
No existe ningún servidor. Falta: API para CRUD de usuarios, work groups, tareas, formularios;
endpoints de ingesta de ubicación; motor de reglas de alertas (desvío, GPS deshabilitado, SOS,
objetivo incumplido); autenticación/sesión; endpoints de agregación para reporting (hoy los KPIs
son `Array.filter().length` client-side sobre 13 registros estáticos en
`src/lib/derived.ts:getKpis()` — en producción son queries agregadas sobre volumen creciente).

### Base de datos
No existe. El modelo actual son 4 interfaces TS con arrays hardcodeados en un archivo fuente, sin
relaciones reales, sin índices, sin migraciones. Falta diseño de esquema real: relación
Usuario↔GrupoTrabajo (el mock asume 1 grupo por usuario vía campo string singular — inconsistencia
propia detectada: `UsuarioCampo.grupo` está tipado como unión `'Seguridad'|'Reparto'|'Administración'`
en `mockData.ts:6`, pero `Tarea.grupo` está tipado como `string` plano en `mockData.ts:28`, sin
reusar la unión — señal de que el modelo no está terminado de pensar, no solo de tipar); relación
Formulario↔GrupoTrabajo (`formularios: string[]` hoy es solo una lista de nombres, no un schema);
histórico de ubicaciones como tabla de series de tiempo (el mock solo guarda "última ubicación",
no historial).

### Autenticación y permisos por Work Group
`Login.tsx` es 100% cosmético: cualquier submit navega a `/dashboard` sin validar credenciales,
sin persistir sesión, sin proteger ninguna ruta — todas las rutas son alcanzables directamente
por URL sin gate de auth. Falta: autenticación real, modelo de autorización con 2 roles
(Admin/Supervisor, Field User) más pertenencia a Work Group(s) — el mock asume la distinción a
nivel de tipos pero no hay ninguna lógica de permisos implementada ni siquiera simulada.

### Geolocalización en tiempo real
El mock no tiene geolocalización real: los campos `lat`/`lng` son valores arbitrarios 0-100
usados como posición porcentual CSS sobre un SVG dibujado a mano (comentario explícito en
`mockData.ts` documentando esto), sin proyección geográfica real. Falta desde cero: SDK de
ubicación en la app móvil (foreground + background), canal de transporte al backend, histórico
persistido, proveedor de mapas real con tiles de Río Grande/Ushuaia.

### Algoritmo de detección de desvíos
Hoy es un string estático (`"Desvío de ruta detectado"`) en el array mock de alertas, sin lógica
detrás. Falta desde cero: definición de "ruta esperada" (geocerca vs ruta georreferenciada con
tolerancia), algoritmo de comparación posición-actual vs esperada, calibración de umbral
distancia/tiempo, manejo de falsos positivos por imprecisión de GPS.

### Sistema de notificaciones (push/email)
No existe ningún mecanismo de notificación. El "Centro de Alertas" es una lista estática
renderizada desde el array mock sin disparo real ni canal de entrega. Falta: proveedor push
mobile, proveedor de email transaccional, reglas de disparo por tipo/severidad, deduplicación y
agrupación.

### App mobile para personal de campo
No existe. `MobileShowcase.tsx` son 3 pantallas estáticas dentro de la SPA web (`<div>`s con
Tailwind dentro de un marco CSS de celular), usadas únicamente para mostrarle al cliente cómo se
vería — cero código reutilizable para una app real. Falta desde cero: decisión de stack, login,
lista de tareas, formularios dinámicos (el mock ni define schema de formulario, solo nombres),
captura de evidencia fotográfica con almacenamiento, tracking en background, y funcionamiento
offline con sincronización posterior — el mockup ya insinúa esto visualmente (pantalla
"Pendiente de sincronización") pero es decorativo, sin lógica de cola/sync detrás.

### Productización del dashboard web
La UI es reutilizable como punto de partida (estructura de componentes, layout, sistema de
diseño ya aplicado) pero funcionalmente es una cáscara: cero datos de fuente real, cero estados
de carga/error, cero paginación o virtualización (13 usuarios / 16 tareas se renderizan todos de
una vez, sin probar a escala), cero actualización en tiempo real. Las 5 secciones de sidebar sin
implementación —ni mock— son Usuarios, Formularios, Rutas y Geocercas, Reportes, Configuración
(todas apuntan hoy a una página `ComingSoon` genérica). Falta: capa de fetching con
loading/error/empty states, paginación/virtualización, tiempo real en mapa y KPIs, construcción
completa de las 5 secciones placeholder.

### Infraestructura y deploy
Deploy actual: GitHub Pages estático, build manual, sin CI/CD, sin ambientes, sin backend
desplegado en ningún lugar, repo público (decisión forzada por la limitación de GitHub Pages en
plan gratuito para repos privados, no por arquitectura). Falta desde cero: hosting para
backend+DB+servicio de tiempo real, pipeline CI/CD con ambientes dev/staging/prod, gestión de
secretos (hoy no existe ni un `.env`), logging/monitoreo/alerting de infraestructura (distinto
de las alertas de negocio del producto).

### Testing
Cero tests automatizados en todo el proyecto — decisión deliberada y documentada para la fase de
demo visual (spec original: "sin tests automatizados, demo visual de datos estáticos, no hay
lógica de negocio que verificar"), pero el proyecto entra a producción con testing en cero. Falta
estrategia por capa: unit para lógica de negocio backend (reglas de alerta, permisos),
integración para API, e2e para flujos críticos web+mobile, testing de geolocalización (difícil
de automatizar de forma confiable).

### Documentación técnica
Existe documentación del proceso de creación del demo (`docs/superpowers/`) y de marca
(`CLAUDE.md`, `docs/brand/`), pero cero documentación de API, cero documentación de esquema de
datos real, cero runbook de infraestructura.

## (c) Complejidad y riesgos por frente

| Frente | Complejidad | Riesgos específicos |
|---|---|---|
| Backend/API | Alta | Define contratos consumidos simultáneamente por web y mobile; si no anticipa desde el día 1 los requerimientos de tiempo real, refactor caro después de la Fase 1. |
| Base de datos | Media-alta | Volumen de histórico de ubicaciones si el tracking es de alta frecuencia; sin decisión temprana de particionamiento/retención, migración dolorosa después. |
| Auth/permisos por Work Group | Media | Modelo conceptual claro (2 roles + Work Groups), pero cardinalidad usuario↔grupo (1 vs N) sin resolver — riesgo técnico bajo, riesgo de proceso alto si se define tarde porque toca DB + API + ambos frontends a la vez. |
| Geolocalización en tiempo real | Alta | **Cobertura celular**: TDF tiene zonas rurales/de reparto con cobertura intermitente o nula (rutas complementarias, periferia industrial de Río Grande, tramos Río Grande–Ushuaia) — el diseño debe asumir conectividad no garantizada. **Batería**: tracking en background es el mayor consumidor de batería en apps móviles; en turnos largos sin recarga (seguridad nocturna, reparto de jornada completa) se necesita muestreo adaptativo, no frecuencia fija. **Precisión GPS**: condiciones climáticas y corredores urbanos densos en Río Grande pueden degradar precisión; el algoritmo de desvíos necesita tolerancia calibrada con datos reales, no un umbral genérico. |
| Detección de desvíos | Alta | Depende 100% de la precisión/frecuencia del frente anterior; falsos positivos por imprecisión GPS generan fatiga de alertas si el umbral no se calibra con datos de campo reales. |
| Notificaciones push/email | Media | Entrega no garantizada en Android con optimizaciones agresivas de batería de fabricantes (Xiaomi, Samsung "sleeping apps"), plausible en dispositivos de gama media/baja que use personal de campo — validar contra modelos de dispositivo reales del cliente, no asumir. |
| App mobile | Alta | Frente más grande junto con backend, y el que arranca más atrás (cero código reutilizable del demo web). Decisión nativo vs cross-platform afecta directamente tracking en background y batería — React Native/Flutter tienen limitaciones conocidas de background location, más agresivas en iOS que Android. Soporte offline con sincronización es un frente de complejidad propio (cola de eventos, resolución de conflictos), no un detalle menor pese a que el mockup lo insinúa con un solo ícono. |
| Productización dashboard web | Media | No probado a escala (tabla y mapa con 13 registros, no cientos); el mapa está construido como SVG dibujado a mano, no sobre proveedor real — pasar a un proveedor real es prácticamente una reescritura de `MapPanel.tsx`, no una simple conexión de datos. |
| Infraestructura/deploy | Media | GitHub Pages (destino actual) no sirve para producción real — sin backend posible ahí; nada reutilizable del setup actual salvo el pipeline de build del frontend. |
| Testing | Media como esfuerzo, alto si se posterga | Entrar a 3 meses de desarrollo con testing en cero incrementa riesgo de regresión, en particular en detección de desvíos y permisos por Work Group, donde un bug silencioso tiene consecuencia de negocio directa (alertas falsas o no disparadas, fuga de datos entre grupos). |
| Documentación | Baja técnica, riesgo de proceso | Sin documentación de API mientras se construyen web+mobile en paralelo, alto riesgo de desincronización de contratos entre frontend(s) y backend. |

## (d) Propuesta de secuenciación en 3 fases

Ordenada por dependencias técnicas reales, no por prioridad de negocio.

### Fase 1 — Fundaciones
Objetivo: backend real, con datos reales, autenticable; el dashboard deja de ser un mock.
- Diseño de esquema de base de datos real (usuarios, work groups, tareas, formularios como
  metadata, histórico de ubicaciones aunque con volumen bajo inicialmente).
- Backend/API: CRUD básico + autenticación + modelo de permisos por Work Group. Es la
  dependencia dura de todo lo que sigue — nada del resto puede avanzar en paralelo de forma útil
  sin contratos de API mínimamente estables.
- Contrato de API documentado (aunque liviano) para desbloquear trabajo mobile desde la Fase 2.
- Infraestructura base: hosting real para backend+DB, pipeline CI/CD mínimo, gestión de
  secretos/variables de entorno.
- Dashboard web: reemplazar `mockData.ts` por fetching real contra la API nueva, agregar
  loading/error states, mantener la UI/UX ya validada con el cliente (conectar, no rediseñar).
- El scaffold del proyecto mobile puede arrancar hacia el final de esta fase, sin lógica de
  negocio real todavía, porque depende del contrato de API de este mismo bloque.

### Fase 2 — Tiempo real y mobile
Objetivo: tracking de ubicación real end-to-end (mobile → backend → dashboard) y app mobile
funcional para el flujo básico de tareas.
- App mobile: login real contra el backend de Fase 1, lista de tareas, flujo de formularios con
  schema real (no placeholder), tracking de ubicación en foreground como mínimo viable.
- Servicio de geolocalización en tiempo real: canal de transporte (ver decisión abierta en (e)),
  ingesta y almacenamiento de posiciones, actualización en vivo del mapa del dashboard — que en
  esta fase también migra de SVG dibujado a mano a un proveedor de mapas real, dependencia técnica
  que bloquea mostrar ubicaciones reales de forma útil.
- Tracking en background y optimización de batería en mobile: arranca en esta fase, razonable
  que termine de calibrarse en Fase 3 con datos de uso real.
- Algoritmo de detección de desvíos, versión inicial: depende de que el tracking en tiempo real
  de este mismo bloque ya esté funcionando con datos reales — no se pueden calibrar umbrales sin
  datos de campo.

### Fase 3 — Confiabilidad y cierre
Objetivo: notificaciones funcionando, secciones placeholder del dashboard resueltas, testing y
hardening antes de lanzamiento.
- Notificaciones push/email conectadas a las reglas de alerta calibradas en Fase 2.
- Completar secciones hoy placeholder (Usuarios, Formularios como builder real, Rutas y
  Geocercas, Reportes, Configuración) — dependen de que modelo de datos y permisos de Fase 1
  estén sólidos.
- Soporte offline en mobile con sincronización posterior (cola de eventos) — depende de que el
  flujo online de Fase 2 esté estable antes de agregar la capa de resiliencia offline.
- Testing de flujos críticos definidos en fases anteriores (permisos, detección de desvíos,
  sincronización offline) — no tiene sentido escribir integración contra una API que todavía
  cambia de forma en Fase 1-2.
- Hardening de batería/precisión GPS con datos reales de campo (piloto interno con el cliente si
  el plazo lo permite).
- Documentación técnica final y runbook de infraestructura.

## (e) Decisiones técnicas abiertas

### Proveedor de mapas
- Google Maps Platform: cobertura y calidad de datos excelente en Argentina; facturación por uso
  escala con tráfico y puede volverse cara con muchos usuarios de campo actualizando posición
  constantemente.
- Mapbox: pricing más flexible a volumen y buen soporte de mapas offline/vectoriales; calidad de
  datos de calles/POIs en zonas menos densas de TDF puede ser inferior a Google.
- OpenStreetMap (autogestionado o vía MapTiler/Stadia): costo de licencia bajo o nulo; calidad y
  actualización de datos en Río Grande/Ushuaia depende de contribuciones comunitarias, escasas en
  una ciudad chica.

### Hosting/infraestructura backend
- Cloud provider grande (AWS/GCP/Azure): máxima flexibilidad y servicios gestionados (tiempo
  real, colas, push); mayor complejidad operativa y costo si no se dimensiona bien desde el inicio.
- PaaS simplificado (Railway/Render/Fly.io) o Easypanel (ya en uso por el equipo para otros
  clientes): setup y operación más simples, coherente con infraestructura ya conocida; techo de
  escalabilidad menor si el producto crece rápido.
- VPS propio self-hosted: costo fijo predecible; toda la responsabilidad de disponibilidad,
  backups y escalado recae en el equipo sin red de contención de un proveedor gestionado.

### Stack mobile: nativo vs cross-platform
- Nativo (Swift/Kotlin por separado): máximo control sobre tracking en background y batería en
  cada plataforma; duplica esfuerzo de desarrollo y mantenimiento durante todo el proyecto.
- React Native: reutiliza conocimiento del equipo (ya trabaja en React en el dashboard web);
  tracking de ubicación en background tiene limitaciones y configuración más delicada,
  especialmente en iOS.
- Flutter: buen rendimiento con una sola base de código; el equipo no tiene experiencia previa
  declarada en Dart/Flutter, lo que suma curva de aprendizaje al cronograma.

### Proveedor de push notifications
- Firebase Cloud Messaging: gratuito, estándar de facto en Android y compatible con iOS vía APNs
  por debajo; ata la infraestructura al ecosistema Google/Firebase si se quiere aprovechar
  integraciones adicionales.
- OneSignal: capa de más alto nivel sobre FCM/APNs con segmentación y analytics de entrega
  incluidos; dependencia externa adicional con pricing propio a escala.
- APNs + FCM directos sin intermediario: máximo control y sin costo de intermediario; hay que
  construir a mano la lógica de segmentación/reintento que un proveedor de más alto nivel ya
  resuelve.

### Canal de transporte para ubicación en tiempo real
- Polling HTTP periódico: simple de implementar y depurar; ineficiente en batería/datos si el
  intervalo es corto, con latencia inherente si es largo.
- WebSocket persistente: latencia mínima y bidireccional (útil también para push de alertas al
  dashboard); más complejo de mantener estable en conexiones celulares intermitentes
  (reconexión, backoff) — relevante dado el riesgo de cobertura en TDF señalado en (c).
- MQTT: protocolo diseñado específicamente para conectividad intermitente, el escenario real de
  TDF; es una pieza de infraestructura adicional (broker MQTT) que el equipo no tiene evidencia
  de haber operado antes.

### Modelo de pertenencia a Work Group
- Un usuario pertenece a exactamente un Work Group (como asume el mock actual, campo `grupo`
  singular): modelo más simple de implementar en permisos y UI; puede no reflejar casos reales
  (supervisor que rota entre grupos, personal que cubre turnos en más de un grupo).
- Relación N:M usuario↔Work Group: más flexible y probablemente más fiel a la operación real del
  cliente; requiere revisar y posiblemente reconfirmar con el cliente cómo funciona en la
  plataforma de referencia de Ecuador antes de fijar el modelo, ya que no queda claro si el brief
  de auditoría original cubrió esto explícitamente.

### Almacenamiento de evidencia fotográfica (formularios de campo)
- Object storage en la nube (S3-compatible: AWS S3, Cloudflare R2, Backblaze B2): estándar de
  industria, pricing bajo a escala; depende de conectividad para subir al momento (la cola
  offline hay que resolverla de todos modos).
- Almacenamiento en la misma infraestructura del backend (disco del servidor): simplicidad
  inicial, cero dependencias externas; no escala bien y complica backups/CDN de imágenes a futuro.

### Formato/schema de formularios dinámicos
- Formularios hardcodeados por Work Group en el código (cada formulario es una pantalla mobile
  programada a mano): rápido de construir para los 3 grupos iniciales conocidos; cada Work Group
  nuevo que el cliente quiera vender a otro rubro requiere un release de la app.
- Form builder con schema dinámico (JSON Schema o similar) editable desde el dashboard de Admin:
  mucho más alineado con el modelo de negocio real (Work Groups configurables, vendible a
  distintos rubros sin tocar código); es una pieza de complejidad propia no contemplada en el
  demo actual, agrega alcance a la Fase 3.
