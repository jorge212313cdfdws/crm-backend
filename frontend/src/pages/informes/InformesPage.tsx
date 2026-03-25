import { useState } from "react";
import FilterBar from "../../components/FilterBar";

function InformesPage() {
  const [busqueda, setBusqueda] = useState<string>("");

  return (
    <div className="content">
      <div className="page-header">
        <h1>Informes</h1>
      </div>

      <FilterBar
        busqueda={busqueda}
        onBusqueda={setBusqueda}
        busquedaPlaceholder="Buscar informe..."
        hayFiltros={!!busqueda}
        onLimpiar={() => setBusqueda("")}
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Título</th>
              <th>Tipo</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody />
        </table>
      </div>
    </div>
  );
}

export default InformesPage;
