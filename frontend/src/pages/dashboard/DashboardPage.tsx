import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Users, UserCheck, UserX, Dumbbell, Building2, Ticket, DoorOpen } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getClientes } from "../../services/clienteService";
import { getEmpleados } from "../../services/empleadoService";
import { getActividades } from "../../services/actividadService";
import { getCentros } from "../../services/centroService";
import { getBonos } from "../../services/bonoService";
import { getAccesos } from "../../services/accesoService";
import "../../styles/DashboardPage.css";

interface Stat {
  label: string;
  value: number | null;
  to: string;
  icon: LucideIcon;
}

function DashboardPage() {
  const [stats, setStats] = useState<Stat[]>([
    { label: "Socios",               value: null, to: "/clientes",    icon: Users     },
    { label: "Empleados activos",    value: null, to: "/empleados",   icon: UserCheck },
    { label: "Empleados inactivos",  value: null, to: "/empleados",   icon: UserX     },
    { label: "Actividades",          value: null, to: "/actividades", icon: Dumbbell  },
    { label: "Centros",              value: null, to: "/centros",     icon: Building2 },
    { label: "Bonos",                value: null, to: "/bonos",       icon: Ticket    },
    { label: "Visitas",              value: null, to: "/accesos",     icon: DoorOpen  },
  ]);

  useEffect(() => {
    Promise.allSettled([
      getClientes(),
      getEmpleados(),
      getActividades(),
      getCentros(),
      getBonos(),
      getAccesos(),
    ]).then(([clientes, empleados, actividades, centros, bonos, accesos]) => {
      const emp = empleados.status === "fulfilled" ? empleados.value : [];
      setStats((prev) =>
        prev.map((s) => {
          switch (s.label) {
            case "Socios":              return { ...s, value: clientes.status    === "fulfilled" ? clientes.value.length    : 0 };
            case "Empleados activos":   return { ...s, value: emp.filter((e) => e.activo).length  };
            case "Empleados inactivos": return { ...s, value: emp.filter((e) => !e.activo).length };
            case "Actividades":         return { ...s, value: actividades.status === "fulfilled" ? actividades.value.length : 0 };
            case "Centros":             return { ...s, value: centros.status     === "fulfilled" ? centros.value.length     : 0 };
            case "Bonos":               return { ...s, value: bonos.status       === "fulfilled" ? bonos.value.length       : 0 };
            case "Visitas":             return { ...s, value: accesos.status     === "fulfilled" ? accesos.value.length     : 0 };
            default:                    return s;
          }
        })
      );
    });
  }, []);

  return (
    <div className="dashboard">
      <h2>Panel general</h2>
      <div className="dashboard-grid">
        {stats.map((s) => (
          <Link key={s.label} to={s.to} className="dashboard-card">
            <s.icon size={28} className="dashboard-card-icon" />
            <span className="dashboard-card-value">{s.value === null ? "—" : s.value}</span>
            <span className="dashboard-card-label">{s.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default DashboardPage;
