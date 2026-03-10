import { useEffect, useState } from 'react';
import axios from 'axios';
import { Sidebar } from './components/layout/Sidebar';
import { ClientesTable } from './pages/clientes/ClientesTable';

function App() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(false); // Iniciamos en false para evitar pantalla en blanco

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/clientes');
        setClientes(res.data);
      } catch (err) {
        console.error("Backend no disponible. Mostrando interfaz de prueba.");
        // Datos de ejemplo para que veas el diseño profesional de PHOENIX HUB
        setClientes([{ 
          id: 1, 
          numeroSocio: 269, 
          nombre: "Carmen Dolores Jerez", 
          email: "carmen@test.com", 
          deuda: 0,
          recurso: "ACCESO CENTRO" 
        }]);
      }
    };
    fetchClientes();
  }, []);

  return (
    <div className="h-screen flex flex-col font-sans bg-[#f4f7f6]">
      {/* Navbar Superior PHOENIX */}
      <header className="bg-[#1a1a1a] text-white h-12 flex items-center justify-between px-6 shadow-2xl z-50">
        <div className="text-xl italic font-black tracking-tighter uppercase">PHOENIX HUB</div>
        <div className="flex gap-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest items-center">
          <span>Inicio</span>
          <span className="text-white bg-blue-600/30 px-3 py-1 rounded-sm border border-blue-500/50 italic">JorgePH-</span>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <main className="flex-1 overflow-y-auto">
          <ClientesTable clientes={clientes} />
        </main>
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
