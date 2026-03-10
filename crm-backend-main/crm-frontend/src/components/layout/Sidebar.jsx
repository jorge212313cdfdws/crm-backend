import { Users, UserCog, Footprints, Users2, Target, CreditCard, ShoppingCart } from 'lucide-react';

const SidebarItem = ({ icon: Icon, label, active, count }) => (
  <div className={`flex items-center justify-between p-3 cursor-pointer transition-all border-b border-gray-100 ${active ? 'bg-[#337ab7] text-white shadow-inner' : 'hover:bg-gray-50 text-gray-700'}`}>
    <div className="flex items-center gap-3">
      <Icon size={18} className={active ? 'text-white' : 'text-blue-500'} />
      <span className="text-[13px] font-bold uppercase tracking-tight">{label}</span>
    </div>
    {count && (
      <div className="bg-gray-400 text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
        {count}
      </div>
    )}
  </div>
);

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-white shadow-xl border-l border-gray-200 h-full flex flex-col">
      <div className="p-3 bg-[#f9f9f9] border-b font-black text-[#337ab7] text-[11px] uppercase tracking-widest">
        Categorías de fichas
      </div>
      <SidebarItem icon={Users} label="Socios" active count="?" />
      <SidebarItem icon={UserCog} label="Empleados" count="?" />
      <SidebarItem icon={Footprints} label="Visitas" count="?" />
      <SidebarItem icon={Users2} label="Grupos" count="?" />
      <SidebarItem icon={Target} label="Leads" count="?" />
      
      <div className="p-3 bg-[#f9f9f9] border-b border-t mt-4 font-black text-[#337ab7] text-[11px] uppercase tracking-widest">
        Alta Online y Venta
      </div>
      <SidebarItem icon={CreditCard} label="Altas Online" count="0" />
      <SidebarItem icon={ShoppingCart} label="Venta de entradas" count="0" />
    </aside>
  );
};