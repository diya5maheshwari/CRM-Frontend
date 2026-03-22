import { CheckCircle, Users, Clock, AlertTriangle } from "lucide-react";

export default function StatsCard({ type }) {

  const config = {
    leads: {
      title: "MATERIALIZED LEADS",
      value: "412",
      icon: <CheckCircle className="w-5 h-5 text-blue-500" />,
      bg: "bg-blue-50",
    },
    prospects: {
      title: "PROSPECTIVE LEADS",
      value: "1,284",
      icon: <Users className="w-5 h-5 text-purple-500" />,
      bg: "bg-purple-50",
    },
    followups: {
      title: "TODAY'S FOLLOW-UPS",
      value: "24",
      icon: <Clock className="w-5 h-5 text-yellow-500" />,
      bg: "bg-yellow-50",
    },
    pending: {
      title: "PENDING FOLLOW-UPS",
      value: "07",
      icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
      bg: "bg-red-50",
    },
  };

  const item = config[type];

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition">

      {/* ICON */}
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${item.bg}`}>
        {item.icon}
      </div>

      {/* TEXT */}
      <p className="text-xs text-gray-400 mt-3 tracking-wide">
        {item.title}
      </p>

      <h2 className="text-2xl font-semibold text-gray-900 mt-1">
        {item.value}
      </h2>

    </div>
  );
}