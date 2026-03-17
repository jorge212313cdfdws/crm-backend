import axiosClient from "../api/axiosClient";
import type { Actividad } from "../types";

const BASE = "/api/actividades";

export const getActividades = async (): Promise<Actividad[]> => {
  const { data } = await axiosClient.get<Actividad[]>(BASE);
  return data;
};

export const crearActividad = async (actividad: Omit<Actividad, "id">): Promise<Actividad> => {
  const { data } = await axiosClient.post<Actividad>(BASE, actividad);
  return data;
};
