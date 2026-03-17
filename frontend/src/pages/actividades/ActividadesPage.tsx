import { useEffect, useState } from "react";
import { getActividades, crearActividad } from "../../services/actividadService";
import type { Actividad } from "../../types";
import FilterBar from "../../components/FilterBar";
import EntityForm from "../../components/EntityForm";
import type { FieldDef } from "../../components/EntityForm";

const CAMPOS: FieldDef[] = [
  { name: "nombre", label: "Nombre", type: "text", required: true, fullWidth: true },
];

type FormValues = Record<string, string | boolean>;
const EMPTY_FORM: FormValues = { nombre: "" };

function ActividadesPage() {
  const [actividades, setActividades] = useState<Actividad[]>([]);
  const [mostrarForm, setMostrarForm] = useState<boolean>(false);
  const [form, setForm] = useState<FormValues>(EMPTY_FORM);
  const [guardando, setGuardando] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [busqueda, setBusqueda] = useState<string>("");

  useEffect(() => { cargar(); }, []);

  const cargar = () => getActividades().then(setActividades).catch(() => {});

  const cancelar = () => { setMostrarForm(false); setForm(EMPTY_FORM); setError(""); };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setGuardando(true);
    try {
      await crearActividad({ nombre: String(form.nombre) });
      cancelar();
      cargar();
    } catch {
      setError("Error al guardar la actividad.");
    } finally {
      setGuardando(false);
    }
  };

  const filtradas = actividades.filter((a) =>
    !busqueda || a.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="content">
      <div className="page-header">
        <h1>Grupos / Actividades</h1>
        <button className="primary" onClick={() => mostrarForm ? cancelar() : setMostrarForm(true)}>
          {mostrarForm ? "Cancelar" : "+ Nueva actividad"}
        </button>
      </div>

      {mostrarForm && (
        <EntityForm
          title="Nueva actividad"
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
            </tr>
          </thead>
          <tbody>
            {filtradas.map((a) => (
              <tr key={a.id}>
                <td>{a.id}</td>
                <td>{a.nombre}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ActividadesPage;
