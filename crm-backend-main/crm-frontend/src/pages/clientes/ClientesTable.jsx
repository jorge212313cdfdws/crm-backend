import { useNavigate } from "react-router-dom";
import { deleteCliente } from "../../services/clienteService";

function ClientesTable({ clientes, recargar }) {

  const navigate = useNavigate();

  const eliminarCliente = (id) => {

    const confirmar = window.confirm("¿Seguro que quieres eliminar este cliente?");

    if (!confirmar) return;

    deleteCliente(id).then(() => {
      recargar();
    });

  };

  return (

    <table className="clientes-table">

      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Apellidos</th>
          <th>Email</th>
          <th>Activo</th>
          <th>Acciones</th>
        </tr>
      </thead>

      <tbody>

        {clientes.map((cliente) => (

          <tr key={cliente.id}>

            <td>{cliente.id}</td>

            <td>{cliente.nombre}</td>

            <td>{cliente.apellidos}</td>

            <td>{cliente.email}</td>

            <td>{cliente.activo ? "Sí" : "No"}</td>

            <td>

              <button
                onClick={() => navigate(`/clientes/editar/${cliente.id}`)}
              >
                Editar
              </button>

              <button
                onClick={() => eliminarCliente(cliente.id)}
              >
                Eliminar
              </button>

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  );

}

export default ClientesTable;