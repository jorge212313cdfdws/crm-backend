import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearCliente } from "../../services/clienteService";

function ClienteNuevoPage() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState<string>("");
  const [apellidos, setApellidos] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const guardarCliente = () => {
    const nuevoCliente = {
      nombre,
      apellidos,
      email,
      activo: true,
    };

    crearCliente(nuevoCliente).then(() => {
      navigate("/clientes");
    });
  };

  return (
    <div>
      <h1>Nuevo Cliente</h1>

      <div>
        <label>Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
      </div>

      <div>
        <label>Apellidos</label>
        <input
          type="text"
          value={apellidos}
          onChange={(e) => setApellidos(e.target.value)}
        />
      </div>

      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <br />

      <button onClick={guardarCliente}>
        Guardar cliente
      </button>

      <button onClick={() => navigate("/clientes")}>
        Cancelar
      </button>
    </div>
  );
}

export default ClienteNuevoPage;
