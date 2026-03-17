import axiosClient from "../api/axiosClient";
import type { Recurso } from "../types";

const BASE = "/api/recursos";

export const getRecursos = async (): Promise<Recurso[]> => {
  const { data } = await axiosClient.get<Recurso[]>(BASE);
  return data;
};

export const getRecurso = async (id: number): Promise<Recurso> => {
  const { data } = await axiosClient.get<Recurso>(`${BASE}/${id}`);
  return data;
};

export const crearRecurso = async (recurso: Omit<Recurso, "id">): Promise<Recurso> => {
  const { data } = await axiosClient.post<Recurso>(BASE, recurso);
  return data;
};

export const actualizarRecurso = async (id: number, recurso: Partial<Recurso>): Promise<Recurso> => {
  const { data } = await axiosClient.put<Recurso>(`${BASE}/${id}`, recurso);
  return data;
};

export const eliminarRecurso = async (id: number): Promise<void> => {
  await axiosClient.delete(`${BASE}/${id}`);
};
