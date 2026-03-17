import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getEmpleados } from "../../services/empleadoService";
import supabase from "../../api/supabaseClient";

function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // 1. Autenticar con Supabase Auth
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
      if (authError) {
        setError("Correo o contraseña incorrectos.");
        return;
      }

      // 2. Verificar que el email está en la tabla de empleados
      const empleados = await getEmpleados();
      const encontrado = empleados.find(
        (emp) => emp.email?.toLowerCase() === email.toLowerCase()
      );
      if (!encontrado) {
        await supabase.auth.signOut();
        setError("Este usuario no tiene acceso como empleado.");
        return;
      }

      login(encontrado);
      navigate("/home");
    } catch {
      setError("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-title">PHOENIX HUB</h1>
        <p className="login-subtitle">Acceso para empleados</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <label>Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          {error && <p className="login-error">{error}</p>}
          <button type="submit" className="primary login-btn-full" disabled={loading}>
            {loading ? "Comprobando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
