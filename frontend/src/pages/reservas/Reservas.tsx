import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Reservas.css';
import { ReservaModal } from './Reservamodal';
import { DetalleClasePanel } from './DetalleClasePanel'; // <-- Importamos la nueva clase
import { ClaseSesion } from '../../types';
import { reservaService } from '../../services/reservaService';

const ACTIVIDADES = ["PILATES", "BODYROLL", "COMBINADA"];
const HORAS_LISTA = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "17:00", "18:00", "19:00", "20:00"];
const HORA_INICIO_GYM = 8;

const LANES: Record<string, number> = { "PILATES": 0, "BODYROLL": 1, "COMBINADA": 2 };

export const Reservas = () => {
  const [fecha, setFecha] = useState(new Date());
  const [clases, setClases] = useState<ClaseSesion[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [claseSeleccionada, setClaseSeleccionada] = useState<ClaseSesion | null>(null);

  useEffect(() => {
    const cargarReservas = async () => {
      setLoading(true);
      try {
        const fechaStr = fecha.toISOString().split('T')[0];
        const data = await reservaService.getReservasByFecha(fechaStr);
        setClases(Array.isArray(data) ? data : []);
      } catch (error) {
        setClases([]);
      } finally {
        setLoading(false);
      }
    };
    cargarReservas();
  }, [fecha]);

  const handleSaveReserva = async (actividad: string, horaInicio: string) => {
    if (clases.some(c => c.horaInicio === horaInicio && c.actividad === actividad)) {
      alert("Ya existe esa clase a esa hora."); return;
    }
    const duraciones: Record<string, number> = { "BODYROLL": 30, "PILATES": 60, "COMBINADA": 90 };
    const duracion = duraciones[actividad] || 60;
    const [h, m] = horaInicio.split(':').map(Number);
    const totalMinutosFin = (h * 60 + m) + duracion;
    const horaFin = `${Math.floor(totalMinutosFin / 60).toString().padStart(2, '0')}:${(totalMinutosFin % 60).toString().padStart(2, '0')}`;

    const nuevaReserva = {
      actividad,
      fecha: fecha.toISOString().split('T')[0],
      horaInicio, horaFin,
      sala: "SALA 1", monitor: "Staff"
    };

    try {
      const guardada = await reservaService.createReserva(nuevaReserva);
      setClases(prev => [...prev, guardada]);
      setIsModalOpen(false);
    } catch (error) { alert("Error al guardar."); }
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

      {/* NUEVO PANEL INDEPENDIENTE */}
      <DetalleClasePanel 
        clase={claseSeleccionada} 
        onClose={() => setClaseSeleccionada(null)} 
      />

      <aside className="reservas-sidebar">
        <Calendar onChange={(d: any) => setFecha(d)} value={fecha} locale="es-ES" />
        <div className="info-resumen">
          <p>Día seleccionado:</p>
          <strong>{fecha.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}</strong>
        </div>
        <button className="primary-btn" onClick={() => setIsModalOpen(true)}>+ NUEVA ACTIVIDAD</button>
      </aside>

      <main className="calendar-main">
        <div className="grid-header">HORA</div>
        <div className="grid-header-lanes">
          <span>PILATES</span><span>BODYROLL</span><span>COMBINADA</span>
        </div>

        <div className="time-col">
          {HORAS_LISTA.map(h => <div key={h} className="time-slot-label">{h}</div>)}
        </div>

        <div className="day-column">
          <div className="lane-divider" style={{ left: '33.33%' }}></div>
          <div className="lane-divider" style={{ left: '66.66%' }}></div>

          {clases.map(clase => {
            const [h, m] = (clase.horaInicio || "08:00").split(':').map(Number);
            const [hF, mF] = (clase.horaFin || "09:00").split(':').map(Number);
            const top = (h - HORA_INICIO_GYM) * 80 + (m * 80 / 60);
            const height = ((hF * 60 + mF) - (h * 60 + m)) * 80 / 60;
            const laneIndex = LANES[clase.actividad] ?? 0;

            return (
              <div 
                key={clase.id} 
                className={`clase-card card-${clase.actividad.toLowerCase()}`} 
                style={{ 
                  top: `${top}px`, height: `${height - 2}px`,
                  left: `calc(${(laneIndex * 33.33)}% + 5px)`,
                  width: 'calc(33.33% - 10px)' 
                }}
                onClick={() => setClaseSeleccionada(clase)}
              >
                <div className="clase-content">
                  <strong>{clase.actividad}</strong>
                  <span>{clase.horaInicio}</span>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
};