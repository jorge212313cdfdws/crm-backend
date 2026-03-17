import axiosClient from "../api/axiosClient";
import type { Cliente } from "../types";

const BASE = "/api/clientes";

export const getClientes = async (): Promise<Cliente[]> => {
  const { data } = await axiosClient.get<Cliente[]>(BASE);
  return data;
};

export const getCliente = async (id: number): Promise<Cliente> => {
  const { data } = await axiosClient.get<Cliente>(`${BASE}/${id}`);
  return data;
};

export const crearCliente = async (cliente: Omit<Cliente, "id">): Promise<Cliente> => {
  const { data } = await axiosClient.post<Cliente>(BASE, cliente);
  return data;
};

export const actualizarCliente = async (id: number, cliente: Partial<Cliente>): Promise<Cliente> => {
  const { data } = await axiosClient.put<Cliente>(`${BASE}/${id}`, cliente);
  return data;
};

export const eliminarCliente = async (id: number): Promise<void> => {
  await axiosClient.delete(`${BASE}/${id}`);
};
