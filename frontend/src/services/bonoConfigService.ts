import axiosClient from "../api/axiosClient";
import type { BonoConfig } from "../types";

const BASE = "/api/bonos-config";

export const getBonosConfig = async (): Promise<BonoConfig[]> => {
  const { data } = await axiosClient.get<BonoConfig[]>(BASE);
  return data;
};

export const crearBonoConfig = async (bonoConfig: Omit<BonoConfig, "id">): Promise<BonoConfig> => {
  const { data } = await axiosClient.post<BonoConfig>(BASE, bonoConfig);
  return data;
};

export const eliminarBonoConfig = async (id: number): Promise<void> => {
  await axiosClient.delete(`${BASE}/${id}`);
};
