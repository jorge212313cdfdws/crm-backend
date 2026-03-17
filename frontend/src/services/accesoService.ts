import axiosClient from "../api/axiosClient";
import type { Acceso } from "../types";

const BASE = "/api/accesos";

export const getAccesos = async (): Promise<Acceso[]> => {
  const { data } = await axiosClient.get<Acceso[]>(BASE);
  return data;
};

export const crearAcceso = async (acceso: Omit<Acceso, "id">): Promise<Acceso> => {
  const { data } = await axiosClient.post<Acceso>(BASE, acceso);
  return data;
};
