import { useEffect, useState } from "react";
import { getContrataciones } from "../../services/contratacionService";
import type { Contratacion } from "../../types";
import FilterBar from "../../components/FilterBar";

function ContratacionesPage() {
  const [contrataciones, setContrataciones] = useState<Contratacion[]>([]);
  const [busqueda, setBusqueda] = useState<string>("");

  useEffect(() => {
    getContrataciones().then(setContrataciones).catch(() => {});
  }, []);

  const filtradas = contrataciones.filter((c) =>
    !busqueda || String(c.id).includes(busqueda)
  );

  return (
    <div className="content">
      <div className="page-header">
        <h1>Altas Online</h1>
      </div>

      <FilterBar
        busqueda={busqueda}
        onBusqueda={setBusqueda}
        busquedaPlaceholder="Buscar por ID..."
        hayFiltros={!!busqueda}
        onLimpiar={() => setBusqueda("")}
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
            </tr>
          </thead>
          <tbody>
            {filtradas.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ContratacionesPage;
