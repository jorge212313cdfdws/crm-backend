import { Link } from "react-router-dom";

interface ClientesToolbarProps {
  search?: string;
  setSearch?: (value: string) => void;
}

function ClientesToolbar({ search = "", setSearch = () => {} }: ClientesToolbarProps) {
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
