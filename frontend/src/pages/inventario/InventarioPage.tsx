import { useState } from "react";
import FilterBar from "../../components/FilterBar";

function InventarioPage() {
  const [busqueda, setBusqueda] = useState<string>("");

  return (
    <div className="content">
      <div className="page-header">
        <h1>Inventario</h1>
      </div>

      <FilterBar
        busqueda={busqueda}
        onBusqueda={setBusqueda}
        busquedaPlaceholder="Buscar artículo..."
        hayFiltros={!!busqueda}
        onLimpiar={() => setBusqueda("")}
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Artículo</th>
              <th>Cantidad</th>
              <th>Ubicación</th>
            </tr>
          </thead>
          <tbody />
        </table>
      </div>
    </div>
  );
}

export default InventarioPage;
