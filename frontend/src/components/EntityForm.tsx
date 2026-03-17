import "../styles/EntityForm.css";

export type FieldType = "text" | "email" | "select" | "checkbox";

export interface FieldDef {
  name: string;
  label: string;
  type: FieldType;
  required?: boolean;
  fullWidth?: boolean;
  options?: { value: string | number; label: string }[];
}

interface EntityFormProps {
  title: string;
  fields: FieldDef[];
  values: Record<string, string | boolean | number>;
  onChange: (name: string, value: string | boolean) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onCancel: () => void;
  guardando?: boolean;
  error?: string;
}

function EntityForm({
  title,
  fields,
  values,
  onChange,
  onSubmit,
  onCancel,
  guardando = false,
  error,
}: EntityFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, type } = e.target;
    const value = type === "checkbox"
      ? (e.target as HTMLInputElement).checked
      : e.target.value;
    onChange(name, value);
  };

  return (
    <div className="form-card entity-form-card">
      <h3>{title}</h3>
      <form onSubmit={onSubmit}>
        <div className="entity-form-grid">
          {fields.map((field) => (
            <div
              key={field.name}
              className={`form-group${field.fullWidth ? " full-width" : ""}`}
            >
              {field.type === "checkbox" ? (
                <div className="entity-form-checkbox">
                  <input
                    type="checkbox"
                    id={field.name}
                    name={field.name}
                    checked={!!values[field.name]}
                    onChange={handleChange}
                  />
                  <label htmlFor={field.name}>{field.label}</label>
                </div>
              ) : field.type === "select" ? (
                <>
                  <label>{field.label}</label>
                  <select
                    name={field.name}
                    value={String(values[field.name] ?? "")}
                    onChange={handleChange}
                    required={field.required}
                    className="entity-form-select"
                  >
                    <option value="">Seleccionar {field.label.toLowerCase()}</option>
                    {field.options?.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </>
              ) : (
                <>
                  <label>{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={String(values[field.name] ?? "")}
                    onChange={handleChange}
                    required={field.required}
                  />
                </>
              )}
            </div>
          ))}
        </div>
        {error && <p className="entity-form-error">{error}</p>}
        <div className="form-actions">
          <button type="submit" className="primary" disabled={guardando}>
            {guardando ? "Guardando..." : "Guardar"}
          </button>
          <button type="button" className="secondary" onClick={onCancel}>
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}

export default EntityForm;
