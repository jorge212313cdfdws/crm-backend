import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCliente } from "../../services/clienteService";

function ClienteNuevoPage() {

  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [email, setEmail] = useState("");

  const guardarCliente = () => {

    const nuevoCliente = {

      nombre: nombre,
      apellidos: apellidos,
      email: email,
      activo: true

    };

    createCliente(nuevoCliente).then(() => {

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

      <br/>

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