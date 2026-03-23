import { useEffect, useState } from "react";
import axios from "axios";
import { Sidebar } from "./components/layout/Sidebar";
import { ClientesTable } from "./pages/clientes/ClientesTable";
import  Reservas from "./pages/reservas/Reservas"; // Ajustada la ruta según tu captura
import type { Cliente } from "./types";
import "./styles/index.css";

function App() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  // Este es el "interruptor" para cambiar de pantalla
  const [view, setView] = useState<"clientes" | "reservas">("clientes");

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const res = await axios.get<Cliente[]>("http://localhost:8080/api/clientes");
        setClientes(res.data);
      } catch {
        console.log("Backend no disponible, cargando datos de prueba");
        setClientes([
          {
            id: 1,
            nombre: "Carmen Dolores Jerez",
            apellidos: "",
            email: "carmen@test.com",
            activo: true,
          },
        ]);
      }
    };
    fetchClientes();
  }, []);

  return (
    <div className="app-layout">
      {/* Sidebar fijo */}
      <Sidebar />
      
      <div className="content">
        <header className="page-header">
          <div>
            <h1>PHOENIX HUB</h1>
            <p className="page-header-subtitle">
              {view === "clientes" ? "Gestión de Clientes" : "Calendario de Reservas"}
            </p>
          </div>
          
          {/* Botones para alternar vistas (puedes quitarlos cuando el Sidebar funcione) */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className={view === "clientes" ? "primary" : "secondary"} 
              onClick={() => setView("clientes")}
            >
              Clientes
            </button>
            <button 
              className={view === "reservas" ? "primary" : "secondary"} 
              onClick={() => setView("reservas")}
            >
              Reservas
            </button>
          </div>
        </header>

        <div className="table-container">
          {/* Renderizado dinámico */}
          {view === "clientes" ? (
            <ClientesTable clientes={clientes} />
          ) : (
            <Reservas />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;