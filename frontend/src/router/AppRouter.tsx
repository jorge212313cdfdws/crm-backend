import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "../context/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import MainLayout from "../layouts/MainLayout";

import LoginPage from "../pages/login/LoginPage";
import HomePage from "../pages/home/HomePage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import ClientesPage from "../pages/clientes/ClientesPage";
import EmpresasPage from "../pages/empresas/EmpresasPage";
import EmpleadosPage from "../pages/empleados/EmpleadosPage";
import AccesosPage from "../pages/accesos/AccesosPage";
import VisitasPage from "../pages/visitas/VisitasPage";
import ListaNegraPage from "../pages/listanegra/ListaNegraPage";
import ActividadesPage from "../pages/actividades/ActividadesPage";
import LeadsPage from "../pages/leads/LeadsPage";
import ContratacionesPage from "../pages/contrataciones/ContratacionesPage";
import BonosPage from "../pages/bonos/BonosPage";
import CentrosPage from "../pages/centros/CentrosPage";
import ReservasPage from "../pages/reservas/ReservasPage";
import InformesPage from "../pages/informes/InformesPage";
import ContabilidadPage from "../pages/contabilidad/ContabilidadPage";
import CrmPage from "../pages/crm/CrmPage";
import InventarioPage from "../pages/inventario/InventarioPage";
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
            <Route path="/empresas"       element={<EmpresasPage />} />
            <Route path="/empleados"      element={<EmpleadosPage />} />
            <Route path="/accesos"        element={<AccesosPage />} />
            <Route path="/visitas"        element={<VisitasPage />} />
            <Route path="/lista-negra"    element={<ListaNegraPage />} />
            <Route path="/actividades"    element={<ActividadesPage />} />
            <Route path="/leads"          element={<LeadsPage />} />
            <Route path="/contrataciones" element={<ContratacionesPage />} />
            <Route path="/bonos"          element={<BonosPage />} />
            <Route path="/centros"        element={<CentrosPage />} />
            <Route path="/reservas"       element={<ReservasPage />} />
            <Route path="/informes"       element={<InformesPage />} />
            <Route path="/contabilidad"   element={<ContabilidadPage />} />
            <Route path="/crm"            element={<CrmPage />} />
            <Route path="/inventario"     element={<InventarioPage />} />
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
