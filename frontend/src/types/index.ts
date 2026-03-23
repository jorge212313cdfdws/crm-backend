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

export interface Actividad {
  id: number;
  nombre: string;
}

export interface Acceso {
  id: number;
  fecha: string;
  clienteId?: number;
}

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

export interface ListaNegra {
  id: number;
  cliente?: { id: number; nombre?: string; apellidos?: string };
  motivo?: string;
  fechaBloqueo?: string;
  autorEmpleado?: { id: number };
  activo?: boolean;
}

export interface HistorialEstado {
  id: number;
  estado: string;
  fecha: string;
}
