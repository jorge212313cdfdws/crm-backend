import React from 'react';
import './Reservas.css';
interface ReservaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (actividad: string, hora: string) => void;
  actividades: string[];
  horas: string[];
}

export const ReservaModal = ({ isOpen, onClose, onSave, actividades, horas }: ReservaModalProps) => {
  const [actividad, setActividad] = React.useState(actividades[0]);
  const [hora, setHora] = React.useState(horas[0]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>Nueva Reserva</h2>
        <div className="form-group">
          <label>Actividad</label>
          <select value={actividad} onChange={(e) => setActividad(e.target.value)}>
            {actividades.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
        <div className="form-group">
          <label>Hora</label>
          <select value={hora} onChange={(e) => setHora(e.target.value)}>
            {horas.map(h => <option key={h} value={h}>{h}</option>)}
          </select>
        </div>
        <div className="modal-actions">
          <button className="secondary" onClick={onClose}>Cancelar</button>
          <button className="primary" onClick={() => onSave(actividad, hora)}>Guardar</button>
        </div>
      </div>
    </div>
  );
};