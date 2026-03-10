import DashboardCard from "../components/DashboardCard"

export default function Dashboard() {

  return (
    <div className="dashboard">

      <DashboardCard
        title="Clientes"
        link="/clients"
      />

      <DashboardCard
        title="Reservas"
        link="/reservations"
      />

      <DashboardCard
        title="CRM"
        link="/crm"
      />

      <DashboardCard
        title="TPV"
        link="/pos"
      />

    </div>
  )
}