import { FileText, Table as TableIcon, Mail, Phone } from "lucide-react";
import type { Cliente } from "../../types";
import "../../styles/ClientesTable.css";

interface ClientesTableProps {
  clientes: Cliente[];
  recargar?: () => void;
}

export const ClientesTable = ({ clientes }: ClientesTableProps) => {
  return (
    <div className="clientes-table-wrapper">
      <div className="clientes-table-container">

        <div className="export-bar">
          <button className="btn-export">
            <FileText size={13} /> PDF
          </button>
          <button className="btn-export">
            <TableIcon size={13} /> EXCEL
          </button>
        </div>

        <table>
          <thead>
            <tr>
              <th className="col-img">Img</th>
              <th className="col-socio">Nº Socio</th>
              <th>Nombre</th>
              <th>Datos de contacto</th>
              <th>Alta</th>
              <th>Recursos</th>
              <th className="col-debe">Debe</th>
              <th>Pago</th>
            </tr>
          </thead>
          <tbody>
            {clientes && clientes.map((c) => (
              <tr key={c.id}>
                <td className="td-img">
                  <div className="avatar">👤</div>
                </td>
                <td className="td-num-socio">{c.numeroCliente || "---"}</td>
                <td className="td-nombre">{c.nombre} {c.apellidos}</td>
                <td className="td-contacto">
                  <div className="contacto-row">
                    <Mail size={12} className="contacto-icon" /> {c.email || "---"}
                  </div>
                  <div className="contacto-row">
                    <Phone size={12} className="contacto-icon" /> ---
                  </div>
                </td>
                <td className="td-alta">{c.fechaNacimiento || "---"}</td>
                <td>
                  <span className="recursos-badge">
                    {c.activo ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="td-debe">0 €</td>
                <td className="td-pago">{c.pagador ? "Sí" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};
