import { useEffect, useState } from "react";
import LeadsTable from "../components/LeadsTable";

export default function MyLeads() {
  const [leads, setLeads] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchLeads();
  }, []);

 const fetchLeads = async () => {
  try {
    setLeads([]);
  } catch (err) {
    console.error(err);
  }
};
  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold mb-4">
        {role === "ADMIN" ? "All Leads" : "My Leads"}
      </h2>

      <LeadsTable leads={leads} />
    </div>
  );
}