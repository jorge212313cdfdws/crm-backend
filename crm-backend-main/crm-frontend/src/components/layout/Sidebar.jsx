import { Link } from "react-router-dom";

function Sidebar() {

  return (

    <aside className="sidebar">

      <nav>

        <Link to="/">Dashboard</Link>

        <Link to="/clientes">Clientes</Link>

      </nav>

    </aside>

  );
}

export default Sidebar;