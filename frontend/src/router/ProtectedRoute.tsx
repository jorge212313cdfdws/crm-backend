import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { empleado } = useAuth();
  return empleado ? <>{children}</> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;
