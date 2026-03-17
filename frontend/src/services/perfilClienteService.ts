import axiosClient from "../api/axiosClient";
import type { PerfilCliente } from "../types";

const BASE = "/api/perfiles";

export const getPerfiles = async (): Promise<PerfilCliente[]> => {
  const { data } = await axiosClient.get<PerfilCliente[]>(BASE);
  return data;
};

export const crearPerfil = async (perfil: Omit<PerfilCliente, "id">): Promise<PerfilCliente> => {
  const { data } = await axiosClient.post<PerfilCliente>(BASE, perfil);
  return data;
};

export const eliminarPerfil = async (id: number): Promise<void> => {
  await axiosClient.delete(`${BASE}/${id}`);
};
