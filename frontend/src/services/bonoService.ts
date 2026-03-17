import axiosClient from "../api/axiosClient";
import type { Bono } from "../types";

const BASE = "/api/bonos";

export const getBonos = async (): Promise<Bono[]> => {
  const { data } = await axiosClient.get<Bono[]>(BASE);
  return data;
};

export const crearBono = async (bono: Omit<Bono, "id">): Promise<Bono> => {
  const { data } = await axiosClient.post<Bono>(BASE, bono);
  return data;
};
