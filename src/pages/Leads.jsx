import { useEffect, useState } from "react";

export default function Leads({ type }) {
  const [leads, setLeads] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const leadsPerPage = 20;

  // pagination logic
  const indexOfLast = currentPage * leadsPerPage;
  const indexOfFirst = indexOfLast - leadsPerPage;
  const currentLeads = leads.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(leads.length / leadsPerPage);

  useEffect(() => {
    fetchLeads();
  }, [type]);

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem("token");

      const url =
        type === "all"
          ? "https://crm-2umd.onrender.com/api/crm/get/AllLeads"
          : "https://crm-2umd.onrender.com/api/crm/get/myLeads";

      const res = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setLeads(data);
      setCurrentPage(1); // reset page when data changes
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <h2 className="text-2xl font-bold text-gray-800">
          {type === "all" ? "All Leads" : "My Leads"}
        </h2>

        <span className="text-sm text-gray-500">
          Total: {leads.length} leads
        </span>
      </div>

      {/* TABLE (DESKTOP) */}
      <div className="hidden md:block bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Company</th>
              <th className="p-4 text-left">Contact</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-left">Follow Up</th>
            </tr>
          </thead>

          <tbody>
            {currentLeads.map((l) => (
              <tr
                key={l.leadId}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium">{l.leadTitle}</td>
                <td className="p-4">{l.companyName}</td>
                <td className="p-4">{l.contactPerson}</td>
                <td className="p-4">{l.contactPhone}</td>

                <td className="p-4">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      l.leadStatus?.toLowerCase() === "won"
                        ? "bg-green-100 text-green-700"
                        : l.leadStatus?.toLowerCase() === "lost"
                        ? "bg-red-100 text-red-600"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {l.leadStatus}
                  </span>
                </td>

                <td className="p-4">
                  {l.nextFollowUpDate || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE VIEW (CARDS) */}
      <div className="md:hidden space-y-4">
        {currentLeads.map((l) => (
          <div
            key={l.leadId}
            className="bg-white p-4 rounded-xl shadow"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-semibold text-gray-800">
                {l.leadTitle}
              </h3>

              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                {l.leadStatus}
              </span>
            </div>

            <p className="text-sm text-gray-500">
              {l.companyName}
            </p>

            <p className="text-sm mt-2">
              👤 {l.contactPerson}
            </p>

            <p className="text-sm">
              📞 {l.contactPhone}
            </p>

            <p className="text-xs text-gray-400 mt-2">
              Follow Up: {l.nextFollowUpDate || "-"}
            </p>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center items-center gap-3 mt-8 flex-wrap">

        {/* FIRST */}
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-white border rounded shadow-sm disabled:opacity-40"
        >
          ⏮
        </button>

        {/* PREV */}
        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-white border rounded shadow-sm disabled:opacity-40"
        >
          ◀
        </button>

        {/* PAGE INFO */}
        <span className="px-4 py-1 bg-blue-50 text-blue-700 rounded font-medium">
          Page {currentPage} of {totalPages || 1}
        </span>

        {/* NEXT */}
        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-white border rounded shadow-sm disabled:opacity-40"
        >
          ▶
        </button>

        {/* LAST */}
        <button
          onClick={() => setCurrentPage(totalPages)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-white border rounded shadow-sm disabled:opacity-40"
        >
          ⏭
        </button>
      </div>
    </div>
  );
}