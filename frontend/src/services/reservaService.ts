import axios from 'axios';
import { ClaseSesion } from '../types';

// Asegúrate de que este sea el puerto real de tu Spring Boot
const API_URL = 'http://localhost:8080/api/reservas'; 

export const reservaService = {
  // 1. Obtener reservas
  getReservasByFecha: async (fecha: string) => {
    // IMPORTANTE: El formato de fecha aquí debe ser igual al que espera el Controller
    const response = await axios.get<ClaseSesion[]>(`${API_URL}?fecha=${fecha}`);
    return response.data;
  },

  // 2. Crear reserva
  createReserva: async (reserva: any): Promise<ClaseSesion> => {
    // Quitamos el id por si acaso viene vacío o null, ya que la DB lo genera
    const { id, ...datosParaEnviar } = reserva; 
    
    console.log("🚀 Payload que sale hacia Java:", datosParaEnviar);

    try {
      const response = await axios.post<ClaseSesion>(API_URL, datosParaEnviar);
      return response.data;
    } catch (error: any) {
      // Si hay un error, lo imprimimos detallado en la consola del navegador
      console.error("❌ Error en la petición POST:", error.response?.data || error.message);
      throw error; // Re-lanzamos para que el Reservas.tsx lo capture en su alert
    }
  },

  // 3. Eliminar reserva
  deleteReserva: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
  }
};