import { useNavigate } from "react-router-dom";
import "../../styles/ErrorPage.css";

interface ErrorPageProps {
  code: number;
  title: string;
  description: string;
}

function ErrorPage({ code, title, description }: ErrorPageProps) {
  const navigate = useNavigate();

  return (
    <div className="error-page">
      <div className="error-card">
        <span className="error-code">{code}</span>
        <h1 className="error-title">{title}</h1>
        <p className="error-description">{description}</p>
        <div className="error-actions">
          <button className="primary" onClick={() => navigate(-1)}>
            Volver atrás
          </button>
          <button className="secondary" onClick={() => navigate("/home")}>
            Ir al inicio
          </button>
        </div>
      </div>
    </div>
  );
}

export const Error400 = () => (
  <ErrorPage
    code={400}
    title="Solicitud incorrecta"
    description="Los datos enviados no son válidos o están incompletos."
  />
);

export const Error401 = () => (
  <ErrorPage
    code={401}
    title="No autorizado"
    description="Necesitas iniciar sesión para acceder a este recurso."
  />
);

export const Error403 = () => (
  <ErrorPage
    code={403}
    title="Acceso denegado"
    description="No tienes permisos para acceder a esta sección."
  />
);

export const Error404 = () => (
  <ErrorPage
    code={404}
    title="Página no encontrada"
    description="La página que buscas no existe o ha sido movida."
  />
);

export const Error500 = () => (
  <ErrorPage
    code={500}
    title="Error del servidor"
    description="Algo ha fallado en el servidor. Inténtalo de nuevo más tarde."
  />
);

export default ErrorPage;
