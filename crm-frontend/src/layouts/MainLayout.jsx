import { Link } from "react-router-dom";

function MainLayout({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      
      {/* Sidebar */}
      <div style={{
        width: "220px",
        background: "#1f2937",
        color: "white",
        padding: "20px"
      }}>
        <h2>CRM</h2>

        <nav style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link to="/" style={{ color: "white" }}>Dashboard</Link>
          <Link to="/clientes" style={{ color: "white" }}>Clientes</Link>
          <Link to="/empleados" style={{ color: "white" }}>Empleados</Link>
          <Link to="/centros" style={{ color: "white" }}>Centros</Link>
        </nav>
      </div>

      {/* Contenido */}
      <div style={{ flex: 1, padding: "30px", background: "#f3f4f6" }}>
        {children}
      </div>

    </div>
  );
}

export default MainLayout;