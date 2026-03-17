import { useEffect, useState } from "react";
import { getClientes, crearCliente, actualizarCliente } from "../../services/clienteService";
import type { Cliente } from "../../types";
import { ClientesTable } from "./ClientesTable";
import FilterBar from "../../components/FilterBar";
import EntityForm from "../../components/EntityForm";
import type { FieldDef } from "../../components/EntityForm";
import "../../styles/ClientesPage.css";

const CAMPOS: FieldDef[] = [
  { name: "nombre",          label: "Nombre",           type: "text",     required: true },
  { name: "apellidos",       label: "Apellidos",        type: "text",     required: true },
  { name: "email",           label: "Email",            type: "email",    required: true },
  { name: "fechaNacimiento", label: "Fecha nacimiento", type: "text" },
  { name: "activo",          label: "Activo",           type: "checkbox" },
  { name: "pagador",         label: "Pagador",          type: "checkbox" },
];

type FormValues = Record<string, string | boolean>;

const EMPTY_FORM: FormValues = {
  nombre: "", apellidos: "", email: "", fechaNacimiento: "", activo: true, pagador: false,
};

function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [mostrarForm, setMostrarForm] = useState<boolean>(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [form, setForm] = useState<FormValues>(EMPTY_FORM);
  const [guardando, setGuardando] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const [filtroNumero, setFiltroNumero] = useState<string>("");
  const [filtroActivo, setFiltroActivo] = useState<string>("");
  const [filtroPagador, setFiltroPagador] = useState<string>("");

  useEffect(() => { cargar(); }, []);

  const cargar = () => getClientes().then(setClientes).catch(() => {});

  const cancelar = () => {
    setMostrarForm(false);
    setEditandoId(null);
    setForm(EMPTY_FORM);
    setError("");
  };

  const handleChange = (name: string, value: string | boolean) => {
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setGuardando(true);
    try {
      const payload = {
        nombre:          String(form.nombre),
        apellidos:       String(form.apellidos),
        email:           String(form.email),
        fechaNacimiento: String(form.fechaNacimiento) || undefined,
        activo:          Boolean(form.activo),
        pagador:         Boolean(form.pagador),
      };
      if (editandoId !== null) {
        await actualizarCliente(editandoId, payload);
      } else {
        await crearCliente(payload);
      }
      cancelar();
      cargar();
    } catch {
      setError("Error al guardar el socio.");
    } finally {
      setGuardando(false);
    }
  };

  const clientesFiltrados = clientes.filter((c) => {
    if (filtroNumero && !String(c.numeroCliente ?? "").includes(filtroNumero)) return false;
    if (filtroActivo === "activo" && !c.activo) return false;
    if (filtroActivo === "inactivo" && c.activo) return false;
    if (filtroPagador === "si" && !c.pagador) return false;
    if (filtroPagador === "no" && c.pagador) return false;
    return true;
  });

  return (
    <div>
      <div className="page-header page-header-padding">
        <h1>Socios</h1>
        <button className="primary" onClick={() => mostrarForm ? cancelar() : setMostrarForm(true)}>
          {mostrarForm ? "Cancelar" : "+ Nuevo socio"}
        </button>
      </div>

      <div className="clientes-filters-padding">
        {mostrarForm && (
          <EntityForm
            title={editandoId !== null ? "Editar socio" : "Nuevo socio"}
            fields={CAMPOS}
            values={form}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={cancelar}
            guardando={guardando}
            error={error}
          />
        )}
        <FilterBar
          busqueda={filtroNumero}
          onBusqueda={setFiltroNumero}
          busquedaPlaceholder="Buscar por nº de socio..."
          selects={[
            {
              value: filtroActivo,
              onChange: setFiltroActivo,
              placeholder: "Activo e inactivo",
              options: [
                { value: "activo",   label: "Solo activos"   },
                { value: "inactivo", label: "Solo inactivos" },
              ],
            },
            {
              value: filtroPagador,
              onChange: setFiltroPagador,
              placeholder: "Pagador y no pagador",
              options: [
                { value: "si", label: "Solo pagadores"    },
                { value: "no", label: "Solo no pagadores" },
              ],
            },
          ]}
          hayFiltros={!!(filtroNumero || filtroActivo || filtroPagador)}
          onLimpiar={() => { setFiltroNumero(""); setFiltroActivo(""); setFiltroPagador(""); }}
        />
      </div>

      <ClientesTable clientes={clientesFiltrados} recargar={cargar} />
    </div>
  );
}

export default ClientesPage;
