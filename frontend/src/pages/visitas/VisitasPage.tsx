import { useEffect, useState } from "react";
import { getClientes, actualizarCliente } from "../../services/clienteService";
import type { Cliente, TipoCliente } from "../../types";
import FilterBar from "../../components/FilterBar";

const CONVERSIONES: { label: string; tipo: TipoCliente }[] = [
  { label: "Socio",        tipo: "SOCIO"        },
  { label: "Sindicato",    tipo: "SINDICATO"    },
  { label: "Asociación",   tipo: "ASOCIACIONES" },
];

function VisitasPage() {
  const [visitas, setVisitas]   = useState<Cliente[]>([]);
  const [busqueda, setBusqueda] = useState<string>("");

  useEffect(() => { cargar(); }, []);

  const cargar = () =>
    getClientes()
      .then((data) => setVisitas(data.filter((c) => !c.tipoAcceso || c.tipoAcceso === "VISITA")))
      .catch(() => {});

  const convertir = async (cliente: Cliente, tipo: TipoCliente) => {
    try {
      await actualizarCliente(cliente.id, { tipoAcceso: tipo });
      cargar();
    } catch {
      alert("Error al convertir el cliente.");
    }
  };

  const filtrados = visitas.filter((c) => {
    if (!busqueda) return true;
    return `${c.nombre} ${c.apellidos}`.toLowerCase().includes(busqueda.toLowerCase());
  });

  return (
    <div className="content">
      <div className="page-header">
        <h1>Visitas</h1>
      </div>

      <FilterBar
        busqueda={busqueda}
        onBusqueda={setBusqueda}
        busquedaPlaceholder="Buscar por nombre..."
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
              <th>Convertir a</th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.nombre} {c.apellidos}</td>
                <td>{c.email}</td>
                <td>
                  <div style={{ display: "flex", gap: "6px" }}>
                    {CONVERSIONES.map(({ label, tipo }) => (
                      <button
                        key={tipo}
                        className="secondary"
                        onClick={() => convertir(c, tipo)}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VisitasPage;
