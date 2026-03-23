import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Reservas.css';
import { ReservaModal } from './Reservamodal';
import { ClaseSesion } from '../../types';
import { reservaService } from '../../services/reservaService';

const ACTIVIDADES = ["PILATES", "BODYROLL", "COMBINADA"];
const HORAS_LISTA = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "17:00", "18:00", "19:00", "20:00"];
const HORA_INICIO_GYM = 8;

export const Reservas = () => {
  const [fecha, setFecha] = useState(new Date());
  const [clases, setClases] = useState<ClaseSesion[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // --- 1. CARGAR RESERVAS AL CAMBIAR FECHA ---
  useEffect(() => {
    const cargarReservas = async () => {
      setLoading(true);
      try {
        // Formato ISO: "2026-03-23" (Evita el Error 500 en el GET)
        const fechaStr = fecha.toISOString().split('T')[0];
        const data = await reservaService.getReservasByFecha(fechaStr);
        setClases(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error al obtener reservas:", error);
        setClases([]);
      } finally {
        setLoading(false);
      }
    };
    cargarReservas();
  }, [fecha]);

  // --- 2. GUARDAR NUEVA RESERVA ---
  const handleSaveReserva = async (actividad: string, horaInicio: string) => {
    // Cálculo automático de horaFin según actividad
    const duraciones: Record<string, number> = { "BODYROLL": 30, "PILATES": 60, "COMBINADA": 90 };
    const duracion = duraciones[actividad] || 60;

    const [h, m] = horaInicio.split(':').map(Number);
    const totalMinutosFin = (h * 60 + m) + duracion;
    const horaFin = `${Math.floor(totalMinutosFin / 60).toString().padStart(2, '0')}:${(totalMinutosFin % 60).toString().padStart(2, '0')}`;

    // Objeto limpio para Java (mismos campos que tu Entity)
    const nuevaReserva = {
      actividad,
      fecha: fecha.toISOString().split('T')[0],
      horaInicio,
      horaFin,
      sala: "SALA 1",
      monitor: "Staff" // Incluido porque tu Entity lo requiere
    };

    console.log("Enviando a Java:", nuevaReserva);

    try {
      const guardada = await reservaService.createReserva(nuevaReserva);
      setClases(prev => [...prev, guardada]);
      setIsModalOpen(false);
      alert("¡Reserva guardada con éxito!");
    } catch (error: any) {
      console.error("Detalle del error:", error.response?.data || error.message);
      
      // Desglose del error para verlo en pantalla
      const mensajeError = error.response?.data 
        ? JSON.stringify(error.response.data, null, 2) 
        : "Error de conexión con el servidor";
        
      alert(`Error al guardar (500/400):\n${mensajeError}`);
    }
  };

  return (
    <div className="reservas-layout">
      <ReservaModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSaveReserva}
        actividades={ACTIVIDADES}
        horas={HORAS_LISTA}
      />

      {/* BARRA LATERAL: Calendario y Acciones */}
      <aside className="reservas-sidebar">
        <Calendar 
          onChange={(d: any) => setFecha(d)} 
          value={fecha} 
          locale="es-ES" 
        />
        <div className="info-resumen">
            <p>{loading ? "Actualizando..." : "Día seleccionado:"}</p>
            <strong>{fecha.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</strong>
        </div>
        <button className="primary-btn" onClick={() => setIsModalOpen(true)}>
            + NUEVA ACTIVIDAD
        </button>
      </aside>

      {/* CUERPO CENTRAL: Grilla de horarios */}
      <main className="calendar-main">
        <div className="grid-header">HORA</div>
        <div className="grid-header">ACTIVIDADES DEL DÍA</div>

        <div className="time-col">
          {HORAS_LISTA.map(h => <div key={h} className="time-slot-label">{h}</div>)}
        </div>

        <div className="day-column">
          {clases.map(clase => {
            // Lógica de posicionamiento dinámico
            const [h, m] = (clase.horaInicio || "08:00").split(':').map(Number);
            const [hF, mF] = (clase.horaFin || "09:00").split(':').map(Number);
            
            const top = (h - HORA_INICIO_GYM) * 80 + (m * 80 / 60);
            const height = ((hF * 60 + mF) - (h * 60 + m)) * 80 / 60;

            return (
              <div 
                key={clase.id} 
                className={`clase-card card-${clase.actividad.toLowerCase()}`} 
                style={{ top: `${top}px`, height: `${height - 4}px` }}
              >
                <div className="clase-content">
                  <strong>{clase.actividad}</strong>
                  <span>{clase.horaInicio} - {clase.horaFin}</span>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};