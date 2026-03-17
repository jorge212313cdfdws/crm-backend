import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

interface SidebarSection {
  label: string;
  to?: string;
  children?: { label: string; to: string }[];
}

const SECTIONS: SidebarSection[] = [
  {
    label: "Fichas",
    children: [
      { label: "Socios",    to: "/clientes"    },
      { label: "Empleados", to: "/empleados"   },
      { label: "Visitas",   to: "/accesos"     },
      { label: "Grupos",    to: "/actividades" },
      { label: "Leads",     to: "/leads"       },
    ],
  },
  { label: "Reservas",     to: "/reservas"     },
  { label: "Informes",     to: "/informes"     },
  { label: "Contabilidad", to: "/contabilidad" },
  { label: "Centros",      to: "/centros"      },
  { label: "CRM",          to: "/crm"          },
  { label: "Inventario",   to: "/inventario"   },
  { label: "Dashboard",    to: "/dashboard"    },
];

export const Sidebar = () => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggle = (label: string, to?: string) => {
    if (to) {
      navigate(to);
    } else {
      setExpanded((prev) => (prev === label ? null : label));
    }
  };

  return (
    <aside className="sidebar">
      <h2>PHOENIX HUB</h2>
      <nav>
        {SECTIONS.map(({ label, to, children }) => (
          <div key={label}>
            <button
              className={`sidebar-section-btn${expanded === label ? " open" : ""}`}
              onClick={() => toggle(label, to)}
            >
              {label}
              {children && (
                <span className="sidebar-chevron">
                  {expanded === label ? "▾" : "▸"}
                </span>
              )}
            </button>

            {children && expanded === label && (
              <div className="sidebar-children">
                {children.map((c) => (
                  <NavLink key={c.to} to={c.to} className="sidebar-child-link">
                    {c.label}
                  </NavLink>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};
