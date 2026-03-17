import { Link } from "react-router-dom";

interface DashboardCardProps {
  title: string;
  link: string;
}

export default function DashboardCard({ title, link }: DashboardCardProps) {
  return (
    <Link to={link} className="dashboard-card">
      <h2>{title}</h2>
    </Link>
  );
}
