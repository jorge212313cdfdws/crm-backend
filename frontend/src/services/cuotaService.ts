import axiosClient from "../api/axiosClient";
import type { Cuota } from "../types";

const BASE = "/api/cuotas";

export const getCuotas = async (): Promise<Cuota[]> => {
  const { data } = await axiosClient.get<Cuota[]>(BASE);
  return data;
};

export const getCuota = async (id: number): Promise<Cuota> => {
  const { data } = await axiosClient.get<Cuota>(`${BASE}/${id}`);
  return data;
};

export const crearCuota = async (cuota: Omit<Cuota, "id">): Promise<Cuota> => {
  const { data } = await axiosClient.post<Cuota>(BASE, cuota);
  return data;
};

export const actualizarCuota = async (id: number, cuota: Partial<Cuota>): Promise<Cuota> => {
  const { data } = await axiosClient.put<Cuota>(`${BASE}/${id}`, cuota);
  return data;
};

export const eliminarCuota = async (id: number): Promise<void> => {
  await axiosClient.delete(`${BASE}/${id}`);
};
