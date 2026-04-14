import AdminDashboard from "./AdminDashboard";
import ExecutiveDashboard from "./ExecutiveDashboard";

export default function Dashboard() {
  const role = localStorage.getItem("role");

  if (role === "ADMIN") {
    return <AdminDashboard />;
  }

  return <ExecutiveDashboard />;
}