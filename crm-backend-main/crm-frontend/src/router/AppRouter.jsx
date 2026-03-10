import { BrowserRouter, Routes, Route } from "react-router-dom";

import DashboardPage from "../pages/dashboard/DashboardPage";
import ClientesPage from "../pages/clientes/ClientesPage";
import ClienteNuevoPage from "../pages/clientes/ClienteNuevoPage";

function AppRouter() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/" element={<DashboardPage />} />

        <Route path="/clientes" element={<ClientesPage />} />

        <Route path="/clientes/nuevo" element={<ClienteNuevoPage />} />

      </Routes>

    </BrowserRouter>

  );

}

export default AppRouter;