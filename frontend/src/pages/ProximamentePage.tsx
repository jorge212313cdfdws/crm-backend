interface Props {
  titulo: string;
}

function ProximamentePage({ titulo }: Props) {
  return (
    <div className="content">
      <div className="page-header">
        <h1>{titulo}</h1>
      </div>
      <p className="page-header-subtitle">Sección en construcción.</p>
    </div>
  );
}

export default ProximamentePage;
