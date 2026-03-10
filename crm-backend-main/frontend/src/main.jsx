import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // Añadida extensión .jsx para Vite
import "./index.css";      // ¡ESTA LÍNEA ES VITAL PARA QUE SE VEA EL DISEÑO!

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
