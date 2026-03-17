import { useState } from "react";
import type { Lead } from "../../types";
import FilterBar from "../../components/FilterBar";
import EntityForm from "../../components/EntityForm";
import type { FieldDef } from "../../components/EntityForm";

const CAMPOS: FieldDef[] = [
  { name: "nombre", label: "Nombre", type: "text",  required: true },
  { name: "email",  label: "Email",  type: "email" },
];

type FormValues = Record<string, string | boolean>;
const EMPTY_FORM: FormValues = { nombre: "", email: "" };

function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [mostrarForm, setMostrarForm] = useState<boolean>(false);
  const [form, setForm] = useState<FormValues>(EMPTY_FORM);
  const [guardando, setGuardando] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [busqueda, setBusqueda] = useState<string>("");

  const cancelar = () => { setMostrarForm(false); setForm(EMPTY_FORM); setError(""); };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setGuardando(true);
    try {
      // TODO: conectar leadService cuando esté disponible
      const nuevoLead: Lead = { id: Date.now(), nombre: String(form.nombre), email: String(form.email) };
      setLeads((prev) => [...prev, nuevoLead]);
      cancelar();
    } catch {
      setError("Error al guardar el lead.");
    } finally {
      setGuardando(false);
    }
  };

  const filtrados = leads.filter((l) => {
    const texto = `${l.nombre} ${l.email ?? ""}`.toLowerCase();
    return !busqueda || texto.includes(busqueda.toLowerCase());
  });

  return (
    <div className="content">
      <div className="page-header">
        <h1>Leads</h1>
        <button className="primary" onClick={() => mostrarForm ? cancelar() : setMostrarForm(true)}>
          {mostrarForm ? "Cancelar" : "+ Nuevo lead"}
        </button>
      </div>

      {mostrarForm && (
        <EntityForm
          title="Nuevo lead"
          fields={CAMPOS}
          values={form}
          onChange={(name, value) => setForm((f) => ({ ...f, [name]: value }))}
          onSubmit={handleSubmit}
          onCancel={cancelar}
          guardando={guardando}
          error={error}
        />
      )}

      <FilterBar
        busqueda={busqueda}
        onBusqueda={setBusqueda}
        busquedaPlaceholder="Buscar por nombre o email..."
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
            </tr>
          </thead>
          <tbody>
            {filtrados.map((l) => (
              <tr key={l.id}>
                <td>{l.id}</td>
                <td>{l.nombre}</td>
                <td>{l.email ?? "---"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeadsPage;
