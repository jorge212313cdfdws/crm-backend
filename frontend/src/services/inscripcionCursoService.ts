import axiosClient from "../api/axiosClient";
import type { InscripcionCurso } from "../types";

const BASE = "/api/inscripciones";

export const getInscripciones = async (): Promise<InscripcionCurso[]> => {
  const { data } = await axiosClient.get<InscripcionCurso[]>(BASE);
  return data;
};

export const crearInscripcion = async (inscripcion: Omit<InscripcionCurso, "id">): Promise<InscripcionCurso> => {
  const { data } = await axiosClient.post<InscripcionCurso>(BASE, inscripcion);
  return data;
};
