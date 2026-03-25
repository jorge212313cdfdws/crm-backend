// --- 1. NÚCLEO Y ESTRUCTURA ---
export interface Centro {
  id: number;
  nombre: string;
}

export interface Zona {
  id: number;
  nombre: string;
  centro?: Centro;
}

export interface Recurso {
  id: number;
  nombre: string;
}

// --- 2. USUARIOS Y PERSONAL ---
export interface Empleado {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  rol: string;
  activo: boolean;
  centro?: Centro | null;
}

export type TipoCliente = "VISITA" | "SOCIO" | "PRL" | "SINDICATO" | "MUTUA" | "INVITADO" | "ASOCIACIONES";

export interface Cliente {
  id: number;
  nombre: string;
  apellidos: string;
  email: string;
  activo: boolean;
  numeroCliente?: number;
  fechaNacimiento?: string;
  pagador?: boolean;
  tipoAcceso?: TipoCliente;
  enListaNegra?: boolean;
}

// --- 3. GESTIÓN DE RESERVAS Y CALENDARIO ---
export interface Maquina {
  id: number;
  nombre: string;
  tipo: string; 
}

export interface Actividad {
  id: number;
  nombre: string;
}

// Esta es la que usa tu nuevo componente de Reservas.tsx
export interface ClaseSesion {
  id: number;
  actividad: string;   // Ej: "PILATES"
  sala: string;        // Ej: "SALA 1"
  horaInicio: string;  // Ej: "10:00"
  horaFin: string;     // Ej: "11:00"
  monitor: string;     // Ej: "Sergio"
  fecha: string;       // Formato: "19/3/2026" (clave para el filtrado)
  clientes?: Cliente[];
}

export interface Reserva {
  id?: number;
  clienteId: number;
  maquinaId: number;
  horaInicio: string;
  modalidad: string;
  fecha?: string;      // Añadido para independencia de días
  cliente?: Cliente;
  maquina?: Maquina;
}

// --- 4. ACCESOS Y SEGUIMIENTO ---
export interface Acceso {
  id: number;
  fecha: string;
  clienteId?: number;
}

export interface HistorialEstado {
  id: number;
  estado: string;
  fecha: string;
}

// --- 5. COMERCIAL Y PAGOS ---
export interface BonoConfig {
  id: number;
  nombre: string;
}

export interface Bono {
  id: number;
  bonoConfig?: BonoConfig;
}

export interface Contratacion {
  id: number;
}

export interface Cuota {
  id: number;
}

export interface Pago {
  id: number;
}

export interface Lead {
  id: number;
  nombre: string;
  email?: string;
}

// --- 6. PERFILES Y FORMACIÓN ---
export interface PerfilCliente {
  id: number;
  nombre: string;
}

export interface PerfilValor {
  id: number;
  valor: string;
}

export interface Curso {
  id: number;
  nombre: string;
}

export interface InscripcionCurso {
  id: number;
}
