// import { useEffect, useState } from "react";
// import StatsCard from "../components/Dashboard/StatsCard";
// import Activity from "../components/Dashboard/Activity";
// import RightPanel from "../components/Dashboard/RightPanel";
// import { useNavigate } from "react-router-dom";
// import { getAdminLeads, getExecutiveLeads } from "../services/api";
// import { useEffect, useState } from "react";
// import { getAdminDashboard } from "../services/api";

// export default function DashboardLayout({ role }) {
//   const navigate = useNavigate();
//   const [leads, setLeads] = useState([]);

//   const [dashboardData, setDashboardData] = useState(null);

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   const fetchDashboard = async () => {
//     try {
//       const data = await getAdminDashboard();
//       setDashboardData(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchLeads = async () => {
//     try {
//       const data =
//         role === "ADMIN" ? await getAdminLeads() : await getExecutiveLeads();

//       //  SAME TRANSFORMATION
//       const transformed = data.map((lead, index) => {
//         const statuses = ["MATERIALIZED", "PROSPECTIVE", "PENDING"];

//         return {
//           ...lead,
//           status: statuses[index % 3],
//           followUpDate: new Date(Date.now() + (index % 5) * 86400000)
//             .toISOString()
//             .split("T")[0],
//         };
//       });

//       setLeads(transformed);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const today = new Date().toISOString().split("T")[0];

//   const materialized = leads.filter((l) => l.status === "MATERIALIZED").length;

//   const prospective = leads.filter((l) => l.status === "PROSPECTIVE").length;

//   const pending = leads.filter((l) => l.status === "PENDING").length;

//   const todayFollowUps = leads.filter((l) => l.followUpDate === today).length;

//   return (
//     <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
//       <div className="mb-6">
//         <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
//           Intelligence Canvas
//         </h1>

//         <p className="text-sm text-gray-400">
//           {role === "ADMIN"
//             ? "Admin overview of entire sales system."
//             : "Strategic oversight for your current sales pipeline."}
//         </p>
//       </div>

//       {/* STATS */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//         <div
//           onClick={() => navigate("/myLeads?filter=materialized")}
//           className="cursor-pointer"
//         >
//           <StatsCard type="leads" value={materialized} />
//         </div>

//         <div
//           onClick={() => navigate("/myLeads?filter=prospective")}
//           className="cursor-pointer"
//         >
//           <StatsCard type="prospects" value={prospective} />
//         </div>

//         <div
//           onClick={() => navigate("/myLeads?filter=today")}
//           className="cursor-pointer"
//         >
//           <StatsCard type="followups" value={todayFollowUps} />
//         </div>

//         <div
//           onClick={() => navigate("/myLeads?filter=pending")}
//           className="cursor-pointer"
//         >
//           <StatsCard type="pending" value={pending} />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2">
//           <Activity role={role} />
//         </div>

//         <RightPanel role={role} />
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import StatsCard from "../components/Dashboard/StatsCard";
import Activity from "../components/Dashboard/Activity";
import RightPanel from "../components/Dashboard/RightPanel";
import { useNavigate } from "react-router-dom";
import { getAdminDashboard } from "../services/api";

export default function DashboardLayout({ role }) {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getAdminDashboard();
      setDashboardData(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
          Intelligence Canvas
        </h1>

        <p className="text-sm text-gray-400">
          {role === "ADMIN"
            ? "Admin overview of entire sales system."
            : "Strategic oversight for your current sales pipeline."}
        </p>
      </div>

      {/* LOADER */}
      {!dashboardData ? (
        <p>Loading dashboard...</p>
      ) : (

        <>
          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

            <div
              onClick={() => navigate("/myLeads?filter=materialized")}
              className="cursor-pointer"
            >
              <StatsCard
                type="leads"
                value={dashboardData.totalMaterializedLeads}
              />
            </div>

            <div
              onClick={() => navigate("/myLeads?filter=prospective")}
              className="cursor-pointer"
            >
              <StatsCard
                type="prospects"
                value={dashboardData.totalProspectiveLeads}
              />
            </div>

            <div
              onClick={() => navigate("/myLeads?filter=today")}
              className="cursor-pointer"
            >
              <StatsCard
                type="followups"
                value={dashboardData.todayFollowUpLeads}
              />
            </div>

            <div
              onClick={() => navigate("/myLeads?filter=pending")}
              className="cursor-pointer"
            >
              <StatsCard
                type="pending"
                value={dashboardData.pendingFollowUpLeads}
              />
            </div>

          </div>

          {/* MAIN */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Activity role={role} />
            </div>

            <RightPanel role={role} />
          </div>
        </>
      )}
    </div>
  );
}