import { useEffect, useState } from "react";
import { getClientes } from "../../services/clienteService";
import { getListaNegra, crearListaNegra, actualizarListaNegra, eliminarListaNegra } from "../../services/listaNegrService";
import type { Cliente, ListaNegra } from "../../types";
import { useAuth } from "../../context/AuthContext";
import FilterBar from "../../components/FilterBar";

const TIPOS_PERMITIDOS = new Set(["SOCIO", "SINDICATO", "ASOCIACIONES"]);

function ListaNegraPage() {
  const { empleado }                          = useAuth();
  const [registros, setRegistros]             = useState<ListaNegra[]>([]);
  const [candidatos, setCandidatos]           = useState<Cliente[]>([]);
  const [busqueda, setBusqueda]               = useState<string>("");
  const [mostrarForm, setMostrarForm]         = useState<boolean>(false);
  const [seleccionId, setSeleccionId]         = useState<string>("");
  const [motivo, setMotivo]                   = useState<string>("");
  const [guardando, setGuardando]             = useState<boolean>(false);

  useEffect(() => { cargar(); }, []);

  const cargar = async () => {
    const [lista, clientes] = await Promise.all([
      getListaNegra().catch(() => []),
      getClientes().catch(() => []),
    ]);
    const idsEnLista = new Set(lista.map((r) => r.cliente?.id));
    setRegistros(lista);
    setCandidatos(clientes.filter((c) => TIPOS_PERMITIDOS.has(c.tipoAcceso ?? "") && !idsEnLista.has(c.id)));
  };

  const agregar = async () => {
    if (!seleccionId || !motivo.trim()) return;
    setGuardando(true);
    try {
      await crearListaNegra({
        cliente:       { id: Number(seleccionId) },
        motivo,
        autorEmpleado: empleado ? { id: empleado.id } : undefined,
        activo:        true,
      });
      setSeleccionId("");
      setMotivo("");
      setMostrarForm(false);
      cargar();
    } catch {
      alert("Error al añadir a la lista negra.");
    } finally {
      setGuardando(false);
    }
  };

  const quitar = async (registro: ListaNegra) => {
    try {
      await eliminarListaNegra(registro.id);
      cargar();
    } catch {
      alert("Error al quitar de la lista negra.");
    }
  };

  const filtrados = registros.filter((r) => {
    if (!busqueda) return true;
    const nombre = `${r.cliente?.nombre ?? ""} ${r.cliente?.apellidos ?? ""}`.toLowerCase();
    return nombre.includes(busqueda.toLowerCase());
  });

  return (
    <div className="content">
      <div className="page-header">
        <h1>Lista Negra</h1>
        <button className="primary" onClick={() => setMostrarForm((v) => !v)}>
          {mostrarForm ? "Cancelar" : "+ Añadir cliente"}
        </button>
      </div>

      {mostrarForm && (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px", maxWidth: "500px" }}>
          <select
            value={seleccionId}
            onChange={(e) => setSeleccionId(e.target.value)}
            style={{ padding: "8px", borderRadius: "6px" }}
          >
            <option value="">Seleccionar socio, sindicato o asociación...</option>
            {candidatos.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nombre} {c.apellidos} — {c.tipoAcceso}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Motivo del bloqueo..."
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            rows={3}
            style={{ padding: "8px", borderRadius: "6px", resize: "vertical" }}
          />
          <button
            className="primary"
            onClick={agregar}
            disabled={!seleccionId || !motivo.trim() || guardando}
          >
            {guardando ? "Guardando..." : "Añadir"}
          </button>
        </div>
      )}

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
              <th>Cliente</th>
              <th>Motivo</th>
              <th>Fecha bloqueo</th>
              <th>Empleado</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.cliente?.nombre} {r.cliente?.apellidos}</td>
                <td>{r.motivo ?? "---"}</td>
                <td>{r.fechaBloqueo ?? "---"}</td>
                <td>{r.autorEmpleado?.id ?? "---"}</td>
                <td>
                  <button className="secondary" onClick={() => quitar(r)}>
                    Quitar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListaNegraPage;
