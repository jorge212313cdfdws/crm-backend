import "./ClientesPage.css";

function ClientesTable({ clientes }) {

  return (
    <table className="clientes-table">

      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>
        {clientes.map((cliente) => (
          <tr key={cliente.id}>
            <td>{cliente.id}</td>
            <td>{cliente.nombre}</td>
            <td>{cliente.email}</td>
            <td>{cliente.telefono}</td>
            <td>
              <span className="status-activo">
                Activo
              </span>
            </td>
            <td className="acciones">
              <button>Ver</button>
              <button>Editar</button>
              <button className="danger">Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>

    </table>
  );
}

export default ClientesTable;