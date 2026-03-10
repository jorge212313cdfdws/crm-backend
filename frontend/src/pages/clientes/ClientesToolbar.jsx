import { Link } from "react-router-dom";

function ClientesToolbar({ search, setSearch }) {

  return (
    <div className="clientes-toolbar">

      <input
        type="text"
        placeholder="Buscar cliente..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <Link to="/clientes/nuevo">
        <button>Nuevo Cliente</button>
      </Link>

    </div>
  );
}

export default ClientesToolbar;