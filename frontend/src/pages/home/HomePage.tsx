import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { LucideIcon } from "lucide-react";
import {
  Users, CalendarDays, BarChart2, DollarSign,
  Building2, Megaphone, Package, LayoutDashboard
} from "lucide-react";

interface HomeCard {
  label: string;
  icon: LucideIcon;
  to: string;
  color: string;
}

const CARDS: HomeCard[] = [
  { label: "Fichas",        icon: Users,          to: "/clientes",       color: "#3b82f6" },
  { label: "Reservas",      icon: CalendarDays,   to: "/reservas",       color: "#8b5cf6" },
  { label: "Informes",      icon: BarChart2,       to: "/informes",       color: "#f59e0b" },
  { label: "Contabilidad",  icon: DollarSign,      to: "/contabilidad",   color: "#10b981" },
  { label: "Centros",       icon: Building2,       to: "/centros",        color: "#ef4444" },
  { label: "CRM",           icon: Megaphone,       to: "/crm",            color: "#ec4899" },
  { label: "Inventario",    icon: Package,         to: "/inventario",     color: "#f97316" },
  { label: "Dashboard",     icon: LayoutDashboard, to: "/dashboard",      color: "#6366f1" },
];

function HomePage() {
  const { empleado, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="home-page">
      <header className="home-header">
        <h1>PHOENIX HUB</h1>
        <div className="home-user">
          <span>{empleado?.nombre} {empleado?.apellidos}</span>
          <button className="secondary" onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </header>

      <div className="home-grid">
        {CARDS.map(({ label, icon: Icon, to, color }) => (
          <button key={label} className="home-card" onClick={() => navigate(to)}>
            <div className="home-card-icon" style={{ background: color }}>
              <Icon size={32} color="white" />
            </div>
            <span>{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
