import { useEffect, useState } from "react";
import { getCentros, crearCentro, actualizarCentro, eliminarCentro } from "../../services/centroService";
import type { Centro } from "../../types";
import FilterBar from "../../components/FilterBar";
import EntityForm from "../../components/EntityForm";
import type { FieldDef } from "../../components/EntityForm";

const CAMPOS: FieldDef[] = [
  { name: "nombre", label: "Nombre", type: "text", required: true, fullWidth: true },
];

type FormValues = Record<string, string | boolean>;
const EMPTY_FORM: FormValues = { nombre: "" };

function CentrosPage() {
  const [centros, setCentros] = useState<Centro[]>([]);
  const [mostrarForm, setMostrarForm] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [form, setForm] = useState<FormValues>(EMPTY_FORM);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState("");
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => { cargar(); }, []);

  const cargar = () => getCentros().then(setCentros).catch(() => {});

  const cancelar = () => {
    setMostrarForm(false);
    setEditandoId(null);
    setForm(EMPTY_FORM);
    setError("");
  };

  const abrirEditar = (centro: Centro) => {
    setEditandoId(centro.id);
    setForm({ nombre: centro.nombre });
    setMostrarForm(true);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setGuardando(true);
    try {
      const payload = { nombre: String(form.nombre) };
      if (editandoId !== null) {
        await actualizarCentro(editandoId, payload);
      } else {
        await crearCentro(payload);
      }
      cancelar();
      cargar();
    } catch {
      setError("Error al guardar el centro.");
    } finally {
      setGuardando(false);
    }
  };

  const handleEliminar = async (id: number) => {
    if (!confirm("¿Eliminar este centro?")) return;
    try {
      await eliminarCentro(id);
      cargar();
    } catch {
      setError("Error al eliminar el centro.");
    }
  };

  const filtrados = centros.filter((c) =>
    !busqueda || c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="content">
      <div className="page-header">
        <h1>Centros</h1>
        <button className="primary" onClick={() => mostrarForm ? cancelar() : setMostrarForm(true)}>
          {mostrarForm ? "Cancelar" : "+ Nuevo centro"}
        </button>
      </div>

      <FilterBar
        busqueda={busqueda}
        onBusqueda={setBusqueda}
        busquedaPlaceholder="Buscar por nombre..."
        hayFiltros={!!busqueda}
        onLimpiar={() => setBusqueda("")}
      />

      {mostrarForm && (
        <EntityForm
          title={editandoId !== null ? "Editar centro" : "Nuevo centro"}
          fields={CAMPOS}
          values={form}
          onChange={(name, value) => setForm((f) => ({ ...f, [name]: value }))}
          onSubmit={handleSubmit}
          onCancel={cancelar}
          guardando={guardando}
          error={error}
        />
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtrados.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.nombre}</td>
                <td>
                  <button className="secondary btn-editar" onClick={() => abrirEditar(c)}>
                    Editar
                  </button>
                  {" "}
                  <button className="danger btn-editar" onClick={() => handleEliminar(c.id)}>
                    Eliminar
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

export default CentrosPage;
