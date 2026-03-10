import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";

import "./MainLayout.css";

function MainLayout() {

  return (

    <div className="crm-layout">

      <Navbar />

      <div className="crm-body">

        <Sidebar />

        <main className="crm-content">
          <Outlet />
        </main>

      </div>

    </div>

  );
}

export default MainLayout;