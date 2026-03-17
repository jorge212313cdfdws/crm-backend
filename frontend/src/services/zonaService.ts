import axiosClient from "../api/axiosClient";
import type { Zona } from "../types";

const BASE = "/api/zonas";

export const getZonas = async (): Promise<Zona[]> => {
  const { data } = await axiosClient.get<Zona[]>(BASE);
  return data;
};

export const getZona = async (id: number): Promise<Zona> => {
  const { data } = await axiosClient.get<Zona>(`${BASE}/${id}`);
  return data;
};

export const crearZona = async (zona: Omit<Zona, "id">): Promise<Zona> => {
  const { data } = await axiosClient.post<Zona>(BASE, zona);
  return data;
};

export const actualizarZona = async (id: number, zona: Partial<Zona>): Promise<Zona> => {
  const { data } = await axiosClient.put<Zona>(`${BASE}/${id}`, zona);
  return data;
};

export const eliminarZona = async (id: number): Promise<void> => {
  await axiosClient.delete(`${BASE}/${id}`);
};
