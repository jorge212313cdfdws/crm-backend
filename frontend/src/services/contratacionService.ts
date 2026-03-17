import axiosClient from "../api/axiosClient";
import type { Contratacion } from "../types";

const BASE = "/api/contrataciones";

export const getContrataciones = async (): Promise<Contratacion[]> => {
  const { data } = await axiosClient.get<Contratacion[]>(BASE);
  return data;
};

export const getContratacion = async (id: number): Promise<Contratacion> => {
  const { data } = await axiosClient.get<Contratacion>(`${BASE}/${id}`);
  return data;
};

export const crearContratacion = async (contratacion: Omit<Contratacion, "id">): Promise<Contratacion> => {
  const { data } = await axiosClient.post<Contratacion>(BASE, contratacion);
  return data;
};

export const actualizarContratacion = async (id: number, contratacion: Partial<Contratacion>): Promise<Contratacion> => {
  const { data } = await axiosClient.put<Contratacion>(`${BASE}/${id}`, contratacion);
  return data;
};

export const eliminarContratacion = async (id: number): Promise<void> => {
  await axiosClient.delete(`${BASE}/${id}`);
};
