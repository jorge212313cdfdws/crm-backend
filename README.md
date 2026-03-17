# Phoenix Hub — CRM

Sistema CRM interno para la gestión de socios, empleados, actividades, ventas y accesos. Arquitectura full-stack con backend Java y frontend React TypeScript conectados a una base de datos PostgreSQL alojada en Supabase.

---

## Tecnologías

### Backend
| Tecnología | Versión | Uso |
|---|---|---|
| Java | 17 | Lenguaje principal |
| Spring Boot | 3.3.5 | Framework web y JPA |
| PostgreSQL | — | Base de datos (Supabase) |
| Lombok | 1.18.30 | Reducción de boilerplate |
| Maven | — | Gestor de dependencias y build |

### Frontend
| Tecnología | Versión | Uso |
|---|---|---|
| React | 19 | UI |
| TypeScript | 5.9 | Tipado estático |
| Vite | 7 | Bundler y dev server |
| React Router | 7 | Navegación y rutas |
| Axios | 1.x | Peticiones al backend |
| Supabase JS | 2.x | Auth y cliente de Supabase |
| TanStack Table | 8 | Tablas avanzadas |
| Lucide React | — | Iconos |
| Tailwind CSS | 4 | Estilos |

---

## Estructura del proyecto

```
crm-backend/
├── backend/                        # Spring Boot
│   └── src/main/java/com/crm/
│       ├── entity/                 # Entidades JPA (Centro, Cliente, Empleado...)
│       ├── repository/             # Repositorios Spring Data
│       ├── service/                # Lógica de negocio
│       └── controller/             # Endpoints REST
├── frontend/                       # React + TypeScript
│   └── src/
│       ├── api/                    # axiosClient.ts, supabaseClient.ts
│       ├── components/layout/      # Navbar, Sidebar
│       ├── context/                # AuthContext
│       ├── layouts/                # MainLayout (Navbar + Sidebar + Outlet)
│       ├── pages/                  # Una carpeta por sección
│       ├── router/                 # AppRouter, ProtectedRoute
│       ├── services/               # Un servicio por entidad (CRUD)
│       ├── styles/                 # CSS globales
│       └── types/                  # Interfaces TypeScript del dominio
└── start-crm.sh                    # Script para arrancar todo
```

---

## Requisitos previos

- **Java 17+**
- **Node.js 18+** y npm
- Acceso a la instancia de **Supabase** del proyecto

---

## Configuración

### Backend — `backend/src/main/resources/application.properties`

```properties
spring.datasource.url=jdbc:postgresql://<host>:<puerto>/postgres?prepareThreshold=0
spring.datasource.username=postgres.<id-proyecto>
spring.datasource.password=<contraseña>
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
server.port=8080
```

### Frontend — `frontend/.env`

```env
VITE_API_URL=http://localhost:8080
VITE_SUPABASE_URL=https://<id-proyecto>.supabase.co
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=<anon-public-key>
```

> El archivo `.env` nunca se sube al repositorio. Cada desarrollador debe crearlo localmente.

---

## Arranque

### Opción 1 — Script automático (arranca todo a la vez)

```bash
chmod +x start-crm.sh
./start-crm.sh
```

### Opción 2 — Manual

**Backend:**
```bash
cd backend
./mvnw spring-boot:run
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

| Servicio | URL |
|---|---|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:8080 |

---

## Autenticación

El login realiza una verificación en dos pasos:

1. **Supabase Auth** — valida email y contraseña contra el sistema de autenticación de Supabase.
2. **Verificación de empleado** — consulta la tabla `empleados` del backend y comprueba que el email autenticado corresponde a un empleado registrado. Si no existe, cierra la sesión automáticamente.

El empleado autenticado se persiste en `localStorage` y se gestiona globalmente a través de `AuthContext`.

Las rutas protegidas redirigen a `/login` si no hay sesión activa (`ProtectedRoute`).

---

## Rutas del frontend

| Ruta | Acceso | Descripción |
|---|---|---|
| `/login` | Pública | Pantalla de acceso |
| `/home` | Protegida | Pantalla de bienvenida post-login |
| `/dashboard` | Protegida | Panel de métricas |
| `/clientes` | Protegida | Listado de socios |
| `/clientes/nuevo` | Protegida | Alta de nuevo socio |
| `/empleados` | Protegida | Gestión de empleados |
| `/accesos` | Protegida | Registro de visitas |
| `/actividades` | Protegida | Grupos y actividades |
| `/leads` | Protegida | Gestión de leads |
| `/contrataciones` | Protegida | Altas online |
| `/bonos` | Protegida | Venta de entradas |

---

## Servicios del frontend

Cada entidad del dominio tiene su propio archivo de servicio en `src/services/` con operaciones CRUD tipadas. Todos usan `axiosClient` con la `VITE_API_URL` como base.

| Servicio | Entidad |
|---|---|
| `clienteService.ts` | Socios |
| `empleadoService.ts` | Empleados |
| `centroService.ts` | Centros |
| `zonaService.ts` | Zonas |
| `accesoService.ts` | Accesos / Visitas |
| `actividadService.ts` | Actividades |
| `bonoService.ts` | Bonos |
| `bonoConfigService.ts` | Configuración de bonos |
| `contratacionService.ts` | Contrataciones |
| `cuotaService.ts` | Cuotas |
| `pagoService.ts` | Pagos |
| `cursoService.ts` | Cursos |
| `inscripcionCursoService.ts` | Inscripciones a cursos |
| `perfilClienteService.ts` | Perfiles de cliente |
| `perfilValorService.ts` | Valores de perfil |
| `historialEstadoService.ts` | Historial de estados |
| `recursoService.ts` | Recursos |

---

## API REST del backend

El backend expone endpoints bajo `/api/` en el puerto `8080`. Cada entidad sigue el patrón estándar REST:

```
GET    /api/{entidad}        → listar todos
GET    /api/{entidad}/{id}   → obtener por ID
POST   /api/{entidad}        → crear
PUT    /api/{entidad}/{id}   → actualizar
DELETE /api/{entidad}/{id}   → eliminar
```
