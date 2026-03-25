import { FileText, Table as TableIcon, Mail, Phone } from "lucide-react";
import type { Cliente } from "../../types";
import "../../styles/ClientesTable.css";

interface ClientesTableProps {
  clientes: Cliente[];
  recargar?: () => void;
  onEditar?: (cliente: Cliente) => void;
}

export const ClientesTable = ({ clientes, onEditar }: ClientesTableProps) => {
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
              <th>Tipo</th>
              <th>Recursos</th>
              <th className="col-debe">Debe</th>
              <th>Pago</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {clientes && clientes.map((c) => (
              <tr key={c.id}>
                <td className="td-img">
                  <div className="avatar">👤</div>
                </td>
                <td className="td-num-socio">{c.id}</td>
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
                <td>{c.tipoAcceso ?? "---"}</td>
                <td>
                  <span className="recursos-badge">
                    {c.activo ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="td-debe">0 €</td>
                <td className="td-pago">{c.pagador ? "Sí" : "No"}</td>
                <td>
                  {onEditar && (
                    <button className="secondary btn-editar" onClick={() => onEditar(c)}>
                      Editar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};
