import StatsCard from "../components/Dashboard/StatsCard";
import Activity from "../components/Dashboard/Activity";
import RightPanel from "../components/Dashboard/RightPanel";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-gray-900">
          Intelligence Canvas
        </h1>
        <p className="text-sm text-gray-400">
          Strategic oversight for your current sales pipeline.
        </p>
      </div>

      {/* STATS CARDS */}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard type="leads" />
        <StatsCard type="prospects" />
        <StatsCard type="followups" />
        <StatsCard type="pending" />
      </div> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

        <div 
        onClick={() => navigate("/myleads?filter=materialized")}
        className="cursor-pointer"
        >
          <StatsCard type="leads" />
        </div>

        <div onClick={() => navigate("/myleads?filter=prospective")}
          className="cursor-pointer">
          <StatsCard type="prospects" />
        </div>

        <div onClick={() => navigate("/myleads?filter=today")}
          className="cursor-pointer">
          <StatsCard type="followups" />
        </div>

        <div onClick={() => navigate("/myleads?filter=pending")}
          className="cursor-pointer">
          <StatsCard type="pending" />
        </div>

      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT (Activity) */}
        <div className="lg:col-span-2">
          <Activity />
        </div>

        {/* RIGHT PANEL */}
        <RightPanel />
      </div>
      
    </div>
  );
}
