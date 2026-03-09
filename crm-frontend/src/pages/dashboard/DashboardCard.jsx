import { Link } from "react-router-dom"

export default function DashboardCard({ title, link }) {
  return (

    <Link to={link} className="dashboard-card">

      <h2>{title}</h2>

    </Link>

  )
}