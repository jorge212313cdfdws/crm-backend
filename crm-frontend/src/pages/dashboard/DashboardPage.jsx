import { Link } from "react-router-dom";

import "./DashboardPage.css";

function DashboardPage() {

  return (

    <div className="dashboard">

      <h2>Panel CRM</h2>

      <div className="dashboard-grid">

        <Link to="/clientes" className="dashboard-card">
          Clientes
        </Link>

        <div className="dashboard-card">
          Reservas
        </div>

        <div className="dashboard-card">
          CRM
        </div>

        <div className="dashboard-card">
          TPV
        </div>

      </div>

    </div>

  );
}

export default DashboardPage;