import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import type { Empleado } from "../types";

interface AuthContextType {
  empleado: Empleado | null;
  login: (emp: Empleado) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [empleado, setEmpleado] = useState<Empleado | null>(() => {
    const stored = localStorage.getItem("empleado");
    return stored ? (JSON.parse(stored) as Empleado) : null;
  });

  const login = (emp: Empleado) => {
    localStorage.setItem("empleado", JSON.stringify(emp));
    setEmpleado(emp);
  };

  const logout = () => {
    localStorage.removeItem("empleado");
    setEmpleado(null);
  };

  return (
    <AuthContext.Provider value={{ empleado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de AuthProvider");
  return ctx;
};
