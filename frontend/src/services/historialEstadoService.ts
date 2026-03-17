import axiosClient from "../api/axiosClient";
import type { HistorialEstado } from "../types";

const BASE = "/api/historial-estados";

export const getHistorialEstados = async (): Promise<HistorialEstado[]> => {
  const { data } = await axiosClient.get<HistorialEstado[]>(BASE);
  return data;
};

export const crearHistorialEstado = async (historial: Omit<HistorialEstado, "id">): Promise<HistorialEstado> => {
  const { data } = await axiosClient.post<HistorialEstado>(BASE, historial);
  return data;
};

export const eliminarHistorialEstado = async (id: number): Promise<void> => {
  await axiosClient.delete(`${BASE}/${id}`);
};
