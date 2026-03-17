import axiosClient from "../api/axiosClient";
import type { PerfilValor } from "../types";

const BASE = "/api/perfil-valores";

export const getPerfilValores = async (): Promise<PerfilValor[]> => {
  const { data } = await axiosClient.get<PerfilValor[]>(BASE);
  return data;
};

export const crearPerfilValor = async (perfilValor: Omit<PerfilValor, "id">): Promise<PerfilValor> => {
  const { data } = await axiosClient.post<PerfilValor>(BASE, perfilValor);
  return data;
};

export const eliminarPerfilValor = async (id: number): Promise<void> => {
  await axiosClient.delete(`${BASE}/${id}`);
};
