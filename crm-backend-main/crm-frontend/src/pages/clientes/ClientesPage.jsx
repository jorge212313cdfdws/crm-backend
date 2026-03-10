import { useEffect, useState } from "react";
import { getClientes } from "../../services/clienteService";

import ClientesTable from "./ClientesTable";
import ClientesToolbar from "./ClientesToolbar";

function ClientesPage() {

  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = () => {
    getClientes().then(res => {
      setClientes(res.data);
    });
  };

  return (
    <div>

      <ClientesToolbar />

      <ClientesTable
        clientes={clientes}
        recargar={cargarClientes}
      />

    </div>
  );
}

export default ClientesPage;