import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

import LoginPage from "../pages/login/LoginPage";
import HomePage from "../pages/home/HomePage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ClientesPage from "../pages/clientes/ClientesPage";
import EmpleadosPage from "../pages/empleados/EmpleadosPage";
import AccesosPage from "../pages/accesos/AccesosPage";
import ActividadesPage from "../pages/actividades/ActividadesPage";
import LeadsPage from "../pages/leads/LeadsPage";
import ContratacionesPage from "../pages/contrataciones/ContratacionesPage";
import BonosPage from "../pages/bonos/BonosPage";
import CentrosPage from "../pages/centros/CentrosPage";
import ProximamentePage from "../pages/ProximamentePage";
import {Reservas}   from "../pages/reservas/Reservas"; 

import { Error400, Error401, Error403, Error404, Error500 } from "../pages/error/ErrorPage";

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
            <Route path="/empleados"      element={<EmpleadosPage />} />
            <Route path="/accesos"        element={<AccesosPage />} />
            <Route path="/actividades"    element={<ActividadesPage />} />
            <Route path="/leads"          element={<LeadsPage />} />
            <Route path="/contrataciones" element={<ContratacionesPage />} />
            <Route path="/bonos"          element={<BonosPage />} />
            <Route path="/centros"        element={<CentrosPage />} />

            {/* --- 2. CAMBIA ESTA LÍNEA ESPECÍFICA --- */}
            <Route path="/reservas"       element={<Reservas />} />

            <Route path="/informes"       element={<ProximamentePage titulo="Informes" />} />
            <Route path="/contabilidad"   element={<ProximamentePage titulo="Contabilidad" />} />
            <Route path="/crm"            element={<ProximamentePage titulo="CRM" />} />
            <Route path="/inventario"     element={<ProximamentePage titulo="Inventario" />} />
          </Route>

          {/* Raíz → login */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Errores */}
          <Route path="/400" element={<Error400 />} />
          <Route path="/401" element={<Error401 />} />
          <Route path="/403" element={<Error403 />} />
          <Route path="/500" element={<Error500 />} />

          {/* 404 catch-all */}
          <Route path="*" element={<Error404 />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppRouter;