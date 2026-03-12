import { useEffect, useState } from "react";
import axios from "axios";
import { Sidebar } from "./components/layout/Sidebar";
import { ClientesTable } from "./pages/clientes/ClientesTable";
import "./index.css";

function App() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/clientes");
        setClientes(res.data);
      } catch (err) {
        console.log("Backend no disponible, cargando datos de prueba");
        setClientes([
          {
            id: 1,
            numeroSocio: 269,
            nombre: "Carmen Dolores Jerez",
            email: "carmen@test.com",
            telefono: "600000000",
            alta: "01/01/2024",
            recurso: "ACCESO CENTRO",
            debe: 0,
            pago: "Efectivo"
          }
        ]);
      }
    };
    fetchClientes();
  }, []);

  return (
    /* 1. Usamos "app-layout" para activar el flexbox del CSS */
    <div className="app-layout">
      
      {/* 2. El Sidebar se posicionará a la izquierda automáticamente */}
      <Sidebar />

      {/* 3. "content" tomará el resto del espacio y tendrá scroll si es necesario */}
      <div className="content">
        
        {/* 4. Usamos "page-header" para que el título y el usuario se alineen bien */}
        <header className="page-header">
          <div>
            <h1>PHOENIX HUB</h1>
            <p style={{ color: '#6b7280', fontSize: '14px' }}>JorgePH</p>
          </div>
          <button className="primary">Nueva Alta</button>
        </header>

        {/* 5. La tabla se renderiza dentro del contenedor blanco con sombra */}
        <div className="table-container">
          <ClientesTable clientes={clientes} />
        </div>

      </div>
    </div>
  );
}

export default App;
