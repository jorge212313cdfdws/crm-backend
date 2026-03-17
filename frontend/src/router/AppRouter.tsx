import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

import LoginPage from "../pages/login/LoginPage";
import HomePage from "../pages/home/HomePage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ClientesPage from "../pages/clientes/ClientesPage";
import ClienteNuevoPage from "../pages/clientes/ClienteNuevoPage";
import EmpleadosPage from "../pages/empleados/EmpleadosPage";
import AccesosPage from "../pages/accesos/AccesosPage";
import ActividadesPage from "../pages/actividades/ActividadesPage";
import LeadsPage from "../pages/leads/LeadsPage";
import ContratacionesPage from "../pages/contrataciones/ContratacionesPage";
import BonosPage from "../pages/bonos/BonosPage";

function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Pública */}
          <Route path="/login" element={<LoginPage />} />

          {/* Inicio tras login */}
          <Route path="/home" element={
            <ProtectedRoute><HomePage /></ProtectedRoute>
          } />

          {/* Rutas con sidebar */}
          <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
            <Route path="/dashboard"      element={<DashboardPage />} />
            <Route path="/clientes"       element={<ClientesPage />} />
            <Route path="/clientes/nuevo" element={<ClienteNuevoPage />} />
            <Route path="/empleados"      element={<EmpleadosPage />} />
            <Route path="/accesos"        element={<AccesosPage />} />
            <Route path="/actividades"    element={<ActividadesPage />} />
            <Route path="/leads"          element={<LeadsPage />} />
            <Route path="/contrataciones" element={<ContratacionesPage />} />
            <Route path="/bonos"          element={<BonosPage />} />
          </Route>

          {/* Raíz → login */}
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppRouter;
