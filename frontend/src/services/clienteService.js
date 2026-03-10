import axios from 'axios';

const API_URL = 'http://localhost:5000/api/clientes'; 
export const getClientes = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const crearCliente = async (cliente) => {
  const { data } = await axios.post(API_URL, cliente);
  return data;
};