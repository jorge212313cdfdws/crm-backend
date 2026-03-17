import { useEffect, useState } from "react";
import { getAccesos } from "../../services/accesoService";
import type { Acceso } from "../../types";
import FilterBar from "../../components/FilterBar";

function AccesosPage() {
  const [accesos, setAccesos] = useState<Acceso[]>([]);
  const [busqueda, setBusqueda] = useState<string>("");

  useEffect(() => {
    getAccesos().then(setAccesos).catch(() => {});
  }, []);

  const filtrados = accesos.filter((a) =>
    !busqueda || a.fecha.includes(busqueda)
  );

  return (
    <div className="content">
      <div className="page-header">
        <h1>Visitas</h1>
      </div>

      <FilterBar
        busqueda={busqueda}
        onBusqueda={setBusqueda}
        busquedaPlaceholder="Buscar por fecha..."
        hayFiltros={!!busqueda}
        onLimpiar={() => setBusqueda("")}
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Fecha</th>
              <th>ID Cliente</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.fecha}</td>
                <td>{a.clienteId ?? "---"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AccesosPage;
