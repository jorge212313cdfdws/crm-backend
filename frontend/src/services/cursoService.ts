import axiosClient from "../api/axiosClient";
import type { Curso } from "../types";

const BASE = "/api/cursos";

export const getCursos = async (): Promise<Curso[]> => {
  const { data } = await axiosClient.get<Curso[]>(BASE);
  return data;
};

export const crearCurso = async (curso: Omit<Curso, "id">): Promise<Curso> => {
  const { data } = await axiosClient.post<Curso>(BASE, curso);
  return data;
};
