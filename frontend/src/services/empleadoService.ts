import axiosClient from "../api/axiosClient";
import type { Empleado } from "../types";

const BASE = "/api/empleados";

export const getEmpleados = async (): Promise<Empleado[]> => {
  const { data } = await axiosClient.get<Empleado[]>(BASE);
  return data;
};

export const getEmpleado = async (id: number): Promise<Empleado> => {
  const { data } = await axiosClient.get<Empleado>(`${BASE}/${id}`);
  return data;
};

export const crearEmpleado = async (empleado: Omit<Empleado, "id">): Promise<Empleado> => {
  const { data } = await axiosClient.post<Empleado>(BASE, empleado);
  return data;
};

export const actualizarEmpleado = async (id: number, empleado: Partial<Empleado>): Promise<Empleado> => {
  const { data } = await axiosClient.put<Empleado>(`${BASE}/${id}`, empleado);
  return data;
};

export const eliminarEmpleado = async (id: number): Promise<void> => {
  await axiosClient.delete(`${BASE}/${id}`);
};
