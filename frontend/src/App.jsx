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

        console.log("Backend no disponible");

        setClientes([
          {
            id: 1,
            numeroSocio: 269,
            nombre: "Carmen Dolores Jerez",
            email: "carmen@test.com",
            deuda: 0,
            recurso: "ACCESO CENTRO"
          }
        ]);
      }
    };

    fetchClientes();

  }, []);

  return (

    <div className="layout">

      <Sidebar />

      <div className="content">

        <header className="topbar">
          <h1>PHOENIX HUB</h1>
          <span>JorgePH</span>
        </header>

        <ClientesTable clientes={clientes} />

      </div>

    </div>

  );
}

export default App;