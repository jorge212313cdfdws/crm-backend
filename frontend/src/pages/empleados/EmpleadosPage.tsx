import { useEffect, useState } from "react";
import { getEmpleados, crearEmpleado, actualizarEmpleado } from "../../services/empleadoService";
import { getCentros } from "../../services/centroService";
import type { Empleado, Centro } from "../../types";

const ROLES: { value: string; label: string }[] = [
  { value: "informatico",   label: "Informático"   },
  { value: "monitor",       label: "Monitor"       },
  { value: "administracion",label: "Administración"},
  { value: "rrhh",          label: "RRHH"          },
  { value: "marketing",     label: "Marketing"     },
  { value: "gerente",       label: "Gerente"       },
];

type EmpleadoForm = Omit<Empleado, "id">;

const EMPTY_FORM: EmpleadoForm = {
  nombre: "",
  apellidos: "",
  email: "",
  activo: true,
  rol: "",
  centro: null,
};

function EmpleadosPage() {
  const [empleados, setEmpleados] = useState<Empleado[]>([]);
  const [centros, setCentros] = useState<Centro[]>([]);
  const [mostrarForm, setMostrarForm] = useState<boolean>(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [form, setForm] = useState<EmpleadoForm>(EMPTY_FORM);
  const [error, setError] = useState<string>("");
  const [guardando, setGuardando] = useState<boolean>(false);

  useEffect(() => {
    cargar();
    getCentros().then(setCentros).catch(() => {});
  }, []);

  const cargar = () => {
    getEmpleados().then(setEmpleados).catch(() => {});
  };

  const abrirEditar = (emp: Empleado) => {
    setEditandoId(emp.id);
    setForm({
      nombre: emp.nombre,
      apellidos: emp.apellidos,
      email: emp.email,
      rol: emp.rol,
      activo: emp.activo,
      centro: emp.centro ?? null,
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    if (name === "centro_id") {
      const centro = centros.find((c) => c.id === parseInt(value, 10)) ?? null;
      setForm((f) => ({ ...f, centro }));
    } else {
      setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }) as EmpleadoForm);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setGuardando(true);
    try {
      const payload = {
        ...form,
        centro: form.centro ? { id: form.centro.id } as Centro : null,
      };
      if (editandoId !== null) {
        await actualizarEmpleado(editandoId, payload);
      } else {
        await crearEmpleado(payload);
      }
      setForm(EMPTY_FORM);
      setEditandoId(null);
      setMostrarForm(false);
      cargar();
    } catch {
      setError("Error al guardar el empleado.");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="content">
      <div className="page-header">
        <h1>Empleados</h1>
        <button className="primary" onClick={() => mostrarForm ? cancelar() : setMostrarForm(true)}>
          {mostrarForm ? "Cancelar" : "+ Nuevo empleado"}
        </button>
      </div>

      {mostrarForm && (
        <div className="form-card" style={{ marginBottom: 24, width: "100%", maxWidth: 600 }}>
          <h3 style={{ marginBottom: 16 }}>{editandoId !== null ? "Editar empleado" : "Nuevo empleado"}</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div className="form-group">
                <label>Nombre</label>
                <input name="nombre" value={form.nombre} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Apellidos</label>
                <input name="apellidos" value={form.apellidos} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input name="email" type="email" value={form.email} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label>Rol</label>
                <select name="rol" value={form.rol} onChange={handleChange} required style={{ width: "100%", padding: "8px", borderRadius: 6, border: "1px solid #ccc" }}>
                  <option value="">Seleccionar rol</option>
                  {ROLES.map((r) => (
                    <option key={r.value} value={r.value}>{r.label}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Centro</label>
                <select name="centro_id" value={form.centro?.id ?? ""} onChange={handleChange} style={{ width: "100%", padding: "8px", borderRadius: 6, border: "1px solid #ccc" }}>
                  <option value="">Sin centro</option>
                  {centros.map((c) => (
                    <option key={c.id} value={c.id}>{c.nombre}</option>
                  ))}
                </select>
              </div>
              <div className="form-group" style={{ display: "flex", alignItems: "center", gap: 8, paddingTop: 22 }}>
                <input type="checkbox" name="activo" id="activo" checked={form.activo} onChange={handleChange} />
                <label htmlFor="activo" style={{ marginBottom: 0 }}>Activo</label>
              </div>
            </div>
            {error && <p style={{ color: "#dc2626", fontSize: 13, marginBottom: 8 }}>{error}</p>}
            <div className="form-actions">
              <button type="submit" className="primary" disabled={guardando}>
                {guardando ? "Guardando..." : "Guardar"}
              </button>
              <button type="button" className="secondary" onClick={cancelar}>Cancelar</button>
            </div>
          </form>
        </div>
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
            {empleados.map((emp) => (
              <tr key={emp.id}>
                <td>{emp.nombre}</td>
                <td>{emp.apellidos}</td>
                <td>{emp.email}</td>
                <td>{ROLES.find((r) => r.value === emp.rol)?.label ?? emp.rol ?? "---"}</td>
                <td>{emp.centro?.nombre || "---"}</td>
                <td>
                  <span style={{
                    padding: "2px 10px", borderRadius: 999, fontSize: 12, fontWeight: 600,
                    background: emp.activo ? "#d1fae5" : "#fee2e2",
                    color: emp.activo ? "#065f46" : "#991b1b",
                  }}>
                    {emp.activo ? "Sí" : "No"}
                  </span>
                </td>
                <td>
                  <button className="secondary" style={{ fontSize: 12, padding: "2px 10px" }} onClick={() => abrirEditar(emp)}>
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
