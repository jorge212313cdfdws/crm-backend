import axiosClient from "../api/axiosClient";

export const getClientes = () => {
  return axiosClient.get("/api/clientes");
};

export const getCliente = (id) => {
  return axiosClient.get(`/api/clientes/${id}`);
};

export const createCliente = (cliente) => {
  return axiosClient.post("/api/clientes", cliente);
};

export const updateCliente = (id, cliente) => {
  return axiosClient.put(`/api/clientes/${id}`, cliente);
};

export const deleteCliente = (id) => {
  return axiosClient.delete(`/api/clientes/${id}`);
};