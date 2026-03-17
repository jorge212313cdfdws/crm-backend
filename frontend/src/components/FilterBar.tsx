import "../styles/FilterBar.css";

interface SelectFilter {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: { value: string; label: string }[];
}

interface FilterBarProps {
  busqueda: string;
  onBusqueda: (value: string) => void;
  busquedaPlaceholder?: string;
  selects?: SelectFilter[];
  hayFiltros: boolean;
  onLimpiar: () => void;
}

function FilterBar({
  busqueda,
  onBusqueda,
  busquedaPlaceholder = "Buscar...",
  selects = [],
  hayFiltros,
  onLimpiar,
}: FilterBarProps) {
  return (
    <div className="filter-bar">
      <input
        placeholder={busquedaPlaceholder}
        value={busqueda}
        onChange={(e) => onBusqueda(e.target.value)}
      />
      {selects.map((s, i) => (
        <select
          key={i}
          value={s.value}
          onChange={(e) => s.onChange(e.target.value)}
        >
          <option value="">{s.placeholder}</option>
          {s.options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      ))}
      {hayFiltros && (
        <button
          className="secondary btn-limpiar"
          onClick={onLimpiar}
        >
          Limpiar filtros
        </button>
      )}
    </div>
  );
}

export default FilterBar;
