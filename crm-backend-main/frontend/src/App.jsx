import { useEffect, useState } from 'react';
import axios from 'axios';

import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar'; 
import { ClientesTable } from './pages/clientes/ClientesTable';

function App() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  // 3. Carga de datos desde tu Backend
  useEffect(() => {
    const fetchClientes = async () => {
      try {
        // Ajusta la URL si tu backend usa otro puerto (ej. 3000 o 5000)
        const res = await axios.get('http://localhost:5000/api/clientes');
        setClientes(res.data);
      } catch (err) {
        console.error("Error conectando con el servidor:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchClientes();
  }, []);

  return (
    <div className="h-screen flex flex-col font-sans bg-[#f4f7f6]">
      {/* Navbar Superior (Puedes usar el tuyo o este estilo PHOENIX) */}
      <header className="bg-[#1a1a1a] text-white h-12 flex items-center justify-between px-6 shadow-2xl z-50">
        <div className="flex items-center gap-2 text-xl italic font-black tracking-tighter">
          PHOENIX HUB
        </div>
        <div className="flex gap-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest items-center">
          <span className="cursor-pointer hover:text-white transition-colors">Inicio</span>
          <span className="cursor-pointer hover:text-white transition-colors">Caja: Zona General</span>
          <span className="text-white bg-blue-600/30 px-3 py-1 rounded-sm border border-blue-500/50 italic">
            JorgePH-
          </span>
        </div>
      </header>

      {/* Contenedor Principal con Sidebar a la derecha como en la foto */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Tabla de Clientes (Izquierda) */}
        <main className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="p-10 text-center text-gray-500 font-bold">Conectando con base de datos...</div>
          ) : (
            <ClientesTable clientes={clientes} />
          )}
        </main>
        
        {/* Sidebar de Categorías (Derecha) */}
        <Sidebar />
      </div>
    </div>
  );
}

export default App;
