import "./ClientesPage.css";

function ClientesToolbar({ search, setSearch }) {

  return (
    <div className="clientes-toolbar">

      <div className="clientes-title">
        <h1>Clientes</h1>
        <span>Gestión de clientes del sistema</span>
      </div>

      <div className="clientes-actions">

        <input
          type="text"
          placeholder="Buscar cliente..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button className="btn-primary">
          + Nuevo cliente
        </button>

      </div>

    </div>
  );
}

export default ClientesToolbar;