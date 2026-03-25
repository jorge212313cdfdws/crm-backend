import { useState } from "react";
import FilterBar from "../../components/FilterBar";

function CrmPage() {
  const [busqueda, setBusqueda] = useState<string>("");

  return (
    <div className="content">
      <div className="page-header">
        <h1>CRM</h1>
      </div>

      <FilterBar
        busqueda={busqueda}
        onBusqueda={setBusqueda}
        busquedaPlaceholder="Buscar contacto..."
        hayFiltros={!!busqueda}
        onLimpiar={() => setBusqueda("")}
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Origen</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody />
        </table>
      </div>
    </div>
  );
}

export default CrmPage;
