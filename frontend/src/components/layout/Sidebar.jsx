import React from 'react';

export const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2>PHOENIX HUB</h2>
      <nav>
        <p className="section-title">Categorías de fichas</p>
        <a href="#">Socios</a>
        <a href="#">Empleados</a>
        <a href="#">Visitas</a>
        <a href="#">Grupos</a>
        <a href="#">Leads</a>
        
        <p className="section-title">Ventas</p>
        <a href="#">Altas Online</a>
        <a href="#">Venta de entradas</a>
      </nav>
    </aside>
  );
};
