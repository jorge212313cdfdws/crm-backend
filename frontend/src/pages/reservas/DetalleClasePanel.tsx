import React, { useState, useEffect } from 'react';
import { ClaseSesion, Cliente } from '../../types';
import { getClientes } from '../../services/clienteService'; 
import { Search, UserPlus, X, Check, UserCircle } from "lucide-react";

interface Props {
  clase: ClaseSesion | null;
  onClose: () => void;
}

export const DetalleClasePanel: React.FC<Props> = ({ clase, onClose }) => {
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [clientesTotales, setClientesTotales] = useState<Cliente[]>([]);
  
  // ESTADO PARA LOS CLIENTES QUE YA ESTÁN EN ESTA CLASE
  const [clientesEnEstaClase, setClientesEnEstaClase] = useState<Cliente[]>([]);

  useEffect(() => {
    if (isAddingClient) {
      getClientes().then(setClientesTotales).catch(console.error);
    }
  }, [isAddingClient]);

  if (!clase) return null;

  const handleAddCliente = (cliente: Cliente) => {
    // 1. Evitamos duplicados en la lista visual
    if (clientesEnEstaClase.some(c => c.id === cliente.id)) return;

    // 2. Añadimos el objeto cliente completo a nuestra lista local
    setClientesEnEstaClase([...clientesEnEstaClase, cliente]);

    // 3. Volvemos a la ficha principal para ver el resultado
    setIsAddingClient(false);
    setBusqueda("");
  };

  const clientesFiltrados = clientesTotales.filter(c => 
    c.nombre?.toLowerCase().includes(busqueda.toLowerCase()) || 
    c.numeroCliente?.toString().includes(busqueda)
  );

  return (
    <div className="side-panel">
      <div className="side-panel-header">
        <h3>Ficha de Sesión</h3>
        <button className="close-btn" onClick={onClose}><X size={20} /></button>
      </div>

      <div className="side-panel-content">
        <div className={`badge-actividad badge-${clase.actividad.toLowerCase()}`}>
          {clase.actividad}
        </div>
        <div className="session-mini-info">
            <span><strong>Horario:</strong> {clase.horaInicio} - {clase.horaFin}</span>
        </div>
        
        <hr />

        {!isAddingClient ? (
          <div className="client-list-section">
            <h4>Clientes Apuntados</h4>
            
            {/* SI HAY CLIENTES, LOS MOSTRAMOS */}
            {clientesEnEstaClase.length > 0 ? (
              <div className="lista-inscritos-real">
                {clientesEnEstaClase.map(c => (
                  <div key={c.id} className="inscrito-item">
                    <UserCircle size={20} color="#6b7280" />
                    <div className="inscrito-info">
                      <span className="inscrito-nombre">{c.nombre} {c.apellidos}</span>
                      <span className="inscrito-socio">Socio: {c.numeroCliente || '---'}</span>
                    </div>
                  </div>
                ))}
                <button className="add-more-btn" onClick={() => setIsAddingClient(true)}>
                  + Añadir otro
                </button>
              </div>
            ) : (
              /* SI NO HAY, MOSTRAMOS EL RECUADRO VACÍO QUE YA TENÍAS */
              <div className="client-list-placeholder">
                <p>No hay clientes anotados.</p>
                <button className="secondary-btn" onClick={() => setIsAddingClient(true)}>
                  + Apuntar Cliente
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="add-client-view">
            <div className="search-bar-container">
              <Search size={16} />
              <input 
                type="text" 
                placeholder="Buscar cliente..." 
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                autoFocus
              />
            </div>

            <div className="mini-table-container">
              <table className="mini-clientes-table">
                <thead>
                  <tr>
                    <th>Img</th>
                    <th>Nº Socio</th>
                    <th>Nombre</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {clientesFiltrados.map(c => (
                    <tr key={c.id}>
                      <td><div className="mini-avatar">👤</div></td>
                      <td className="text-bold">{c.numeroCliente || "---"}</td>
                      <td><span className="main-name">{c.nombre} {c.apellidos}</span></td>
                      <td>
                        <button className="action-add-btn" onClick={() => handleAddCliente(c)}>
                          <UserPlus size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <button className="btn-back" onClick={() => setIsAddingClient(false)}>Cancelar</button>
          </div>
        )}
      </div>
    </div>
  );
};