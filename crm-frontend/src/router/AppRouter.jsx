import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";

import DashboardPage from "../pages/dashboard/DashboardPage";
import ClientesPage from "../pages/clientes/ClientesPage";
import ClienteNuevoPage from "../pages/clientes/ClienteNuevoPage";

function AppRouter() {
  return (
    <BrowserRouter>

      <Routes>

        <Route element={<MainLayout />}>

          <Route path="/" element={<DashboardPage />} />

          <Route path="/clientes" element={<ClientesPage />} />

          <Route path="/clientes/nuevo" element={<ClienteNuevoPage />} />


        </Route>

      </Routes>

    </BrowserRouter>
  );
}

export default AppRouter;