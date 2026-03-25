import { useEffect, useState } from "react";
import { getClientes, crearCliente, actualizarCliente } from "../../services/clienteService";
import type { Cliente } from "../../types";
import { ClientesTable } from "../clientes/ClientesTable";
import FilterBar from "../../components/FilterBar";
import EntityForm from "../../components/EntityForm";
import type { FieldDef } from "../../components/EntityForm";
import "../../styles/ClientesPage.css";

const TIPOS_EMPRESA = [
  { value: "VISITA",   label: "Visita"   },
  { value: "PRL",      label: "PRL"      },
  { value: "MUTUA",    label: "Mutua"    },
  { value: "INVITADO", label: "Invitado" },
];

const TIPOS_EMPRESA_SET = new Set(["VISITA", "PRL", "MUTUA", "INVITADO"]);

const CAMPOS: FieldDef[] = [
  { name: "nombre",          label: "Nombre",           type: "text",  required: true },
  { name: "apellidos",       label: "Apellidos",        type: "text",  required: true },
  { name: "email",           label: "Email",            type: "email", required: true },
  { name: "fechaNacimiento", label: "Fecha nacimiento", type: "text" },
  { name: "tipoAcceso",      label: "Tipo",             type: "select", options: TIPOS_EMPRESA },
  { name: "activo",          label: "Activo",           type: "checkbox" },
  { name: "pagador",         label: "Pagador",          type: "checkbox" },
];

type FormValues = Record<string, string | boolean>;

const EMPTY_FORM: FormValues = {
  nombre: "", apellidos: "", email: "", fechaNacimiento: "", tipoAcceso: "VISITA", activo: true, pagador: false,
};

function EmpresasPage() {
  const [clientes, setClientes]       = useState<Cliente[]>([]);
  const [mostrarForm, setMostrarForm] = useState<boolean>(false);
  const [editandoId, setEditandoId]   = useState<number | null>(null);
  const [form, setForm]               = useState<FormValues>(EMPTY_FORM);
  const [guardando, setGuardando]     = useState<boolean>(false);
  const [error, setError]             = useState<string>("");

  const [filtroNumero, setFiltroNumero] = useState<string>("");
  const [filtroActivo, setFiltroActivo] = useState<string>("");

  useEffect(() => { cargar(); }, []);

  const cargar = () => getClientes().then(setClientes).catch(() => {});

  const abrirEditar = (c: Cliente) => {
    setEditandoId(c.id);
    setForm({
      nombre:          c.nombre,
      apellidos:       c.apellidos,
      email:           c.email,
      fechaNacimiento: c.fechaNacimiento ?? "",
      tipoAcceso:      c.tipoAcceso      ?? "",
      activo:          c.activo,
      pagador:         c.pagador         ?? false,
    });
    setMostrarForm(true);
    setError("");
  };

  const cancelar = () => {
    setMostrarForm(false);
    setEditandoId(null);
    setForm(EMPTY_FORM);
    setError("");
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
        tipoAcceso:      String(form.tipoAcceso)      || undefined,
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
      setError("Error al guardar la empresa.");
    } finally {
      setGuardando(false);
    }
  };

  const filtrados = clientes.filter((c) => {
    if (!TIPOS_EMPRESA_SET.has(c.tipoAcceso ?? "")) return false;
    if (filtroNumero && !String(c.id).includes(filtroNumero)) return false;
    if (filtroActivo === "activo" && !c.activo) return false;
    if (filtroActivo === "inactivo" && c.activo) return false;
    return true;
  });

  return (
    <div>
      <div className="page-header page-header-padding">
        <h1>Empresas</h1>
        <button className="primary" onClick={() => mostrarForm ? cancelar() : setMostrarForm(true)}>
          {mostrarForm ? "Cancelar" : "+ Nueva empresa"}
        </button>
      </div>

      <div className="clientes-filters-padding">
        {mostrarForm && (
          <EntityForm
            title={editandoId !== null ? "Editar empresa" : "Nueva empresa"}
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
          busqueda={filtroNumero}
          onBusqueda={setFiltroNumero}
          busquedaPlaceholder="Buscar por ID..."
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
          ]}
          hayFiltros={!!(filtroNumero || filtroActivo)}
          onLimpiar={() => { setFiltroNumero(""); setFiltroActivo(""); }}
        />
      </div>

      <ClientesTable clientes={filtrados} recargar={cargar} onEditar={abrirEditar} />
    </div>
  );
}

export default EmpresasPage;
