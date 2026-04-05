import { useEffect, useState } from "react";
import LeadsTable from "../components/LeadsTable";
import LeadsFilter from "../components/LeadsFilter";
import { useSearchParams } from "react-router-dom";

export default function MyLeads() {
  const [leads, setLeads] = useState([]);
  const [filters, setFilters] = useState({
    status: "",
    date: "",
  });

  useEffect(() => {
    const dummyData = [
      {
        title: "First Lead",
        status: "Materialized",
        followUpDate: "30-03-2022",
        contactPerson: "Divya",
        phone: "1234567892",
        company: "Privates Limited",
        gst: "12BHISON45BUIB8",
        description: "dx",
        createdBy: "Diya Maheshwari",
        createdAt: "06-03-2026 15:57",
      },
    ];

    setLeads(dummyData);
  }, []);

  //filter option 
  const [searchParams] = useSearchParams();
  const filter = searchParams.get("filter");

  const today = new Date().toISOString().split("T")[0];

  const filteredLeads = leads.filter((lead) => {
    if (!filter) return true;

    if (filter === "materialized") {
      return lead.status === "Materialized";
    }

    if (filter === "prospective") {
      return lead.status === "Prospective";
    }

    if (filter === "today") {
      return lead.followUpDate === today;
    }

    if (filter === "pending") {
      return lead.followUpDate < today;
    }

    return true;
  });

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h2 className="text-xl font-semibold mb-4">My Leads</h2>
      {/* <h1 className="text-xl">{filter}</h1> */}

      {/* FILTER */}
      <LeadsFilter filters={filters} setFilters={setFilters} />

      {/* TABLE */}
      <LeadsTable leads={filteredLeads} />
    </div>
  );
}
