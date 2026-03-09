import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createCliente } from "../../services/clienteService";

function CrearClientePage() {

  const navigate = useNavigate();

  const [cliente, setCliente] = useState({
    nombre: "",
    email: "",
    telefono: ""
  });

  const handleChange = (e) => {

    setCliente({
      ...cliente,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    await createCliente(cliente);

    navigate("/clientes"); // vuelve a la lista

  };

  return (

    <div>

      <h2>Nuevo Cliente</h2>

      <form onSubmit={handleSubmit}>

        <input
          name="nombre"
          placeholder="Nombre"
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          name="telefono"
          placeholder="Telefono"
          onChange={handleChange}
        />

        <button type="submit">
          Guardar
        </button>

      </form>

    </div>

  );

}

export default CrearClientePage;