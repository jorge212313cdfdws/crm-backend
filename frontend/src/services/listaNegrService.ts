import axiosClient from "../api/axiosClient";
import type { ListaNegra } from "../types";

const BASE = "/api/lista-negra";

export const getListaNegra = async (): Promise<ListaNegra[]> => {
  const { data } = await axiosClient.get<ListaNegra[]>(BASE);
  return data;
};

export const crearListaNegra = async (entry: Omit<ListaNegra, "id">): Promise<ListaNegra> => {
  const { data } = await axiosClient.post<ListaNegra>(BASE, entry);
  return data;
};

export const actualizarListaNegra = async (id: number, entry: Partial<ListaNegra>): Promise<ListaNegra> => {
  const { data } = await axiosClient.put<ListaNegra>(`${BASE}/${id}`, entry);
  return data;
};

export const eliminarListaNegra = async (id: number): Promise<void> => {
  await axiosClient.delete(`${BASE}/${id}`);
};
