import axiosClient from "../api/axiosClient";

export const getClientes = () => {
  return axiosClient.get("/clientes");
};

export const createCliente = (cliente) => {
  return axiosClient.post("/clientes", cliente);
};

export const updateCliente = (id, cliente) => {
  return axiosClient.put(`/clientes/${id}`, cliente);
};

export const deleteCliente = (id) => {
  return axiosClient.delete(`/clientes/${id}`);
};