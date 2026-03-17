import axiosClient from "../api/axiosClient";
import type { Pago } from "../types";

const BASE = "/api/pagos";

export const getPagos = async (): Promise<Pago[]> => {
  const { data } = await axiosClient.get<Pago[]>(BASE);
  return data;
};

export const getPago = async (id: number): Promise<Pago> => {
  const { data } = await axiosClient.get<Pago>(`${BASE}/${id}`);
  return data;
};

export const crearPago = async (pago: Omit<Pago, "id">): Promise<Pago> => {
  const { data } = await axiosClient.post<Pago>(BASE, pago);
  return data;
};

export const actualizarPago = async (id: number, pago: Partial<Pago>): Promise<Pago> => {
  const { data } = await axiosClient.put<Pago>(`${BASE}/${id}`, pago);
  return data;
};

export const eliminarPago = async (id: number): Promise<void> => {
  await axiosClient.delete(`${BASE}/${id}`);
};
