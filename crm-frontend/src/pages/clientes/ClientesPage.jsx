import { useEffect, useState } from "react";
import { getClientes } from "../../services/clienteService";

import ClientesToolbar from "./ClientesToolbar";
import ClientesTable from "./ClientesTable";

import "./ClientesPage.css";

function ClientesPage() {

  const [clientes, setClientes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    getClientes().then(res => {
      setClientes(res.data);
    });
  }, []);

  const clientesFiltrados = clientes.filter(c =>
    c.nombre.toLowerCase().includes(search.toLowerCase())
  );

  return (

    <div className="clientes-container">

      <ClientesToolbar
        search={search}
        setSearch={setSearch}
      />

      <ClientesTable
        clientes={clientesFiltrados}
      />

    </div>

  );
}

export default ClientesPage;