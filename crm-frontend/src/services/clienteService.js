import axios from "axios";

const API = "http://localhost:3000/clientes"; // ajusta si tu backend usa otra ruta

export const getClientes = () => {
  return axios.get(API);
};

export const createCliente = (cliente) => {
  return axios.post(API, cliente);
};