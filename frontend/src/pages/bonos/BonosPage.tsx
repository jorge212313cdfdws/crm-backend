import { useEffect, useState } from "react";
import { getBonos } from "../../services/bonoService";
import type { Bono } from "../../types";
import FilterBar from "../../components/FilterBar";

function BonosPage() {
  const [bonos, setBonos] = useState<Bono[]>([]);
  const [busqueda, setBusqueda] = useState<string>("");

  useEffect(() => {
    getBonos().then(setBonos).catch(() => {});
  }, []);

  const filtrados = bonos.filter((b) =>
    !busqueda || b.bonoConfig?.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="content">
      <div className="page-header">
        <h1>Venta de Entradas</h1>
      </div>

      <FilterBar
        busqueda={busqueda}
        onBusqueda={setBusqueda}
        busquedaPlaceholder="Buscar por tipo de bono..."
        hayFiltros={!!busqueda}
        onLimpiar={() => setBusqueda("")}
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Tipo de bono</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((b) => (
              <tr key={b.id}>
                <td>{b.id}</td>
                <td>{b.bonoConfig?.nombre ?? "---"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BonosPage;
