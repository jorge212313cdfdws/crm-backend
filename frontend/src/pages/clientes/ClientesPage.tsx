import { useEffect, useState } from "react";
import { getClientes } from "../../services/clienteService";
import type { Cliente } from "../../types";

import { ClientesTable } from "./ClientesTable";
import ClientesToolbar from "./ClientesToolbar";

function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = () => {
    getClientes().then((data) => {
      setClientes(data);
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
