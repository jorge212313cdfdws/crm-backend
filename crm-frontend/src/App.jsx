import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import ClientesPage from "./pages/clientes/ClientesPage";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/clientes" element={<ClientesPage />} />
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;