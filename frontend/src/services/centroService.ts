import axiosClient from "../api/axiosClient";
import type { Centro } from "../types";

const BASE = "/api/centros";

export const getCentros = async (): Promise<Centro[]> => {
  const { data } = await axiosClient.get<Centro[]>(BASE);
  return data;
};

export const getCentro = async (id: number): Promise<Centro> => {
  const { data } = await axiosClient.get<Centro>(`${BASE}/${id}`);
  return data;
};

export const crearCentro = async (centro: Omit<Centro, "id">): Promise<Centro> => {
  const { data } = await axiosClient.post<Centro>(BASE, centro);
  return data;
};

export const actualizarCentro = async (id: number, centro: Partial<Centro>): Promise<Centro> => {
  const { data } = await axiosClient.put<Centro>(`${BASE}/${id}`, centro);
  return data;
};

export const eliminarCentro = async (id: number): Promise<void> => {
  await axiosClient.delete(`${BASE}/${id}`);
};
