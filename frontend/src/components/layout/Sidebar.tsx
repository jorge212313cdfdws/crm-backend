import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2>PHOENIX HUB</h2>
      <nav>
        <p className="section-title">Categorías de fichas</p>
        <NavLink to="/clientes">Socios</NavLink>
        <NavLink to="/empleados">Empleados</NavLink>
        <NavLink to="/accesos">Visitas</NavLink>
        <NavLink to="/actividades">Grupos</NavLink>
        <NavLink to="/leads">Leads</NavLink>

        <p className="section-title">Ventas</p>
        <NavLink to="/contrataciones">Altas Online</NavLink>
        <NavLink to="/bonos">Venta de entradas</NavLink>
      </nav>
    </aside>
  );
};
