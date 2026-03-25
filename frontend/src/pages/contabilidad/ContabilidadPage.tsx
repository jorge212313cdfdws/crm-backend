import { useState } from "react";
import FilterBar from "../../components/FilterBar";

function ContabilidadPage() {
  const [busqueda, setBusqueda] = useState<string>("");

  return (
    <div className="content">
      <div className="page-header">
        <h1>Contabilidad</h1>
      </div>

      <FilterBar
        busqueda={busqueda}
        onBusqueda={setBusqueda}
        busquedaPlaceholder="Buscar por concepto..."
        hayFiltros={!!busqueda}
        onLimpiar={() => setBusqueda("")}
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Concepto</th>
              <th>Tipo</th>
              <th>Importe</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody />
        </table>
      </div>
    </div>
  );
}

export default ContabilidadPage;
