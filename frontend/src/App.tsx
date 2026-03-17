import { useEffect, useState } from "react";
import axios from "axios";
import { Sidebar } from "./components/layout/Sidebar";
import { ClientesTable } from "./pages/clientes/ClientesTable";
import type { Cliente } from "./types";
import "./styles/index.css";

function App() {
  const [clientes, setClientes] = useState<Cliente[]>([]);

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
      <Sidebar />
      <div className="content">
        <header className="page-header">
          <div>
            <h1>PHOENIX HUB</h1>
            <p className="page-header-subtitle">JorgePH</p>
          </div>
          <button className="primary">Nueva Alta</button>
        </header>
        <div className="table-container">
          <ClientesTable clientes={clientes} />
        </div>
      </div>
    </div>
  );
}

export default App;
