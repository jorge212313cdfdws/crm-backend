import { useEffect, useState } from "react";
import { getEmpleados, crearEmpleado, actualizarEmpleado } from "../../services/empleadoService";
import { getCentros } from "../../services/centroService";
import type { Empleado, Centro } from "../../types";
import FilterBar from "../../components/FilterBar";
import EntityForm from "../../components/EntityForm";
import type { FieldDef } from "../../components/EntityForm";
import "../../styles/EmpleadosPage.css";

const ROLES: { value: string; label: string }[] = [
  { value: "informatico",    label: "Informático"    },
  { value: "monitor",        label: "Monitor"        },
  { value: "administracion", label: "Administración" },
  { value: "rrhh",           label: "RRHH"           },
  { value: "marketing",      label: "Marketing"      },
  { value: "gerente",        label: "Gerente"        },
];

type FormValues = Record<string, string | boolean>;

const EMPTY_FORM: FormValues = {
  nombre: "",
  apellidos: "",
  email: "",
  rol: "",
  centro_id: "",
  activo: true,
};

function EmpleadosPage() {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [centros, setCentros] = useState<Centro[]>([]);
  const [mostrarForm, setMostrarForm] = useState<boolean>(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [form, setForm] = useState<FormValues>(EMPTY_FORM);
  const [error, setError] = useState<string>("");
  const [guardando, setGuardando] = useState<boolean>(false);

  const [busqueda, setBusqueda] = useState<string>("");
  const [filtroRol, setFiltroRol] = useState<string>("");
  const [filtroActivo, setFiltroActivo] = useState<string>("");

  useEffect(() => {
    cargar();
    getCentros().then(setCentros).catch(() => {});
  }, []);

  const cargar = () => getEmpleados().then(setEmpleados).catch(() => {});

  const campos = (centrosOpts: Centro[]): FieldDef[] => [
    { name: "nombre",    label: "Nombre",    type: "text",     required: true },
    { name: "apellidos", label: "Apellidos", type: "text",     required: true },
    { name: "email",     label: "Email",     type: "email",    required: true },
    { name: "rol",       label: "Rol",       type: "select",   required: true, options: ROLES },
    {
      name: "centro_id", label: "Centro", type: "select",
      options: centrosOpts.map((c) => ({ value: c.id, label: c.nombre })),
    },
    { name: "activo", label: "Activo", type: "checkbox" },
  ];

  const abrirEditar = (emp: Empleado) => {
    setEditandoId(emp.id);
    setForm({
      nombre:    emp.nombre,
      apellidos: emp.apellidos,
      email:     emp.email,
      rol:       emp.rol,
      centro_id: emp.centro?.id ?? "",
      activo:    emp.activo,
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

  const handleChange = (name: string, value: string | boolean) => {
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setGuardando(true);
    try {
      const centro = form.centro_id
        ? (centros.find((c) => c.id === Number(form.centro_id)) ?? null)
        : null;
      const payload = {
        nombre:    String(form.nombre),
        apellidos: String(form.apellidos),
        email:     String(form.email),
        rol:       String(form.rol),
        activo:    Boolean(form.activo),
        centro:    centro ? ({ id: centro.id } as Centro) : null,
      };
      if (editandoId !== null) {
        await actualizarEmpleado(editandoId, payload);
      } else {
        await crearEmpleado(payload);
      }
      cancelar();
      cargar();
    } catch {
      setError("Error al guardar el empleado.");
    } finally {
      setGuardando(false);
    }
  };

  const empleadosFiltrados = empleados.filter((emp) => {
    const nombreCompleto = `${emp.nombre} ${emp.apellidos}`.toLowerCase();
    if (busqueda && !nombreCompleto.includes(busqueda.toLowerCase())) return false;
    if (filtroRol && emp.rol !== filtroRol) return false;
    if (filtroActivo === "activo" && !emp.activo) return false;
    if (filtroActivo === "inactivo" && emp.activo) return false;
    return true;
  });

  return (
    <div className="content">
      <div className="page-header">
        <h1>Empleados</h1>
        <button className="primary" onClick={() => mostrarForm ? cancelar() : setMostrarForm(true)}>
          {mostrarForm ? "Cancelar" : "+ Nuevo empleado"}
        </button>
      </div>

      <FilterBar
        busqueda={busqueda}
        onBusqueda={setBusqueda}
        busquedaPlaceholder="Buscar por nombre..."
        selects={[
          {
            value: filtroRol,
            onChange: setFiltroRol,
            placeholder: "Todos los roles",
            options: ROLES,
          },
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
        hayFiltros={!!(busqueda || filtroRol || filtroActivo)}
        onLimpiar={() => { setBusqueda(""); setFiltroRol(""); setFiltroActivo(""); }}
      />

      {mostrarForm && (
        <EntityForm
          title={editandoId !== null ? "Editar empleado" : "Nuevo empleado"}
          fields={campos(centros)}
          values={form}
          onChange={handleChange}
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
              <th>Nombre</th>
              <th>Apellidos</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Centro</th>
              <th>Activo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {empleadosFiltrados.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.nombre}</td>
                <td>{emp.apellidos}</td>
                <td>{emp.email}</td>
                <td>{ROLES.find((r) => r.value === emp.rol)?.label ?? emp.rol ?? "---"}</td>
                <td>{emp.centro?.nombre || "---"}</td>
                <td>
                  <span className={`badge ${emp.activo ? "badge-activo" : "badge-inactivo"}`}>
                    {emp.activo ? "Sí" : "No"}
                  </span>
                </td>
                <td>
                  <button className="secondary btn-editar" onClick={() => abrirEditar(emp)}>
                    Editar
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

export default EmpleadosPage;
