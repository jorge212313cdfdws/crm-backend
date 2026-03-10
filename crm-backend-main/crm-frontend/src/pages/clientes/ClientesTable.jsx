import { FileText, Table as TableIcon, Mail, Phone, Users, Search } from 'lucide-react';

export const TablaClientes = ({ clientes }) => {
  return (
    <div className="flex-1 p-6 bg-[#f4f7f6] overflow-y-auto">
      {/* Encabezado Superior */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-light flex items-center gap-3 text-gray-700">
          <div className="bg-gray-200 p-2 rounded-full"><Users size={24} /></div>
          Gestión de clientes
          <button className="bg-[#5cb85c] hover:bg-[#4cae4c] text-white text-[11px] px-3 py-1 rounded font-bold uppercase transition-all shadow-sm">
            Nueva Alta
          </button>
        </h1>
        <div className="flex items-center gap-3 bg-white p-2 rounded-md shadow-sm border border-gray-200">
          <span className="text-xs font-bold text-gray-500 uppercase">Buscar Tarjeta/Nº:</span>
          <div className="relative">
            <input type="text" className="border border-gray-300 p-1.5 rounded w-48 text-sm focus:ring-1 focus:ring-blue-400 outline-none" />
            <Search size={14} className="absolute right-2 top-2 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Contenedor de la Tabla */}
      <div className="bg-white rounded-md shadow-lg overflow-hidden border border-gray-200">
        <div className="bg-[#337ab7] text-white px-4 py-2.5 flex justify-between items-center text-sm">
          <span className="font-semibold tracking-wide">Listado de clientes (filtros activos: solamente socios)</span>
          <div className="flex gap-1.5">
            <button className="bg-[#5bc0de] hover:bg-[#31b0d5] px-3 py-1 rounded flex items-center gap-1.5 text-xs font-bold"><FileText size={12}/> PDF</button>
            <button className="bg-[#5bc0de] hover:bg-[#31b0d5] px-3 py-1 rounded flex items-center gap-1.5 text-xs font-bold"><TableIcon size={12}/> EXCEL</button>
          </div>
        </div>

        <table className="w-full text-left">
          <thead className="bg-[#f9f9f9] text-gray-600 text-[11px] uppercase font-bold border-b">
            <tr>
              <th className="p-4 w-16">Img</th>
              <th className="p-4 w-24">Nº Socio</th>
              <th className="p-4">Nombre</th>
              <th className="p-4">Datos de contacto</th>
              <th className="p-4">Alta</th>
              <th className="p-4">Recursos</th>
              <th className="p-4 text-center">Debe</th>
              <th className="p-4">Pago</th>
            </tr>
          </thead>
          <tbody className="text-sm divide-y divide-gray-100">
            {clientes && clientes.map((c) => (
              <tr key={c._id} className="hover:bg-blue-50/50 transition-colors group">
                <td className="p-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 border border-gray-200 group-hover:bg-white">👤</div>
                </td>
                <td className="p-4 font-bold text-gray-500">{c.numeroSocio || '---'}</td>
                <td className="p-4 font-bold text-gray-800">{c.nombre}</td>
                <td className="p-4 text-[11px] text-gray-600">
                  <div className="flex items-center gap-1.5">
                    <Mail size={12} className="text-gray-400" /> {c.email}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <Phone size={12} className="text-gray-400" /> {c.telefono || '600000000'}
                  </div>
                </td>
                <td className="p-4 text-xs font-medium text-gray-500">{c.fechaAlta || '01/01/2024'}</td>
                <td className="p-4">
                  <span className="text-[10px] font-black text-gray-400 bg-gray-50 px-2 py-1 rounded-sm border border-gray-100 uppercase">
                    {c.recurso || 'Acceso Centro'}
                  </span>
                </td>
                <td className={`p-4 text-center font-black ${c.deuda > 0 ? 'text-red-500' : 'text-gray-800'}`}>
                  {c.deuda || 0} €
                </td>
                <td className="p-4 text-xs font-semibold text-gray-500">{c.metodoPago || 'Efectivo'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};