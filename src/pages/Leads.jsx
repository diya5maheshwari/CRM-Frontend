import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Leads({ type }) {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();


  const leadsPerPage = 20;

  // FILTER
  const filteredLeads = leads.filter((l) => {
    const status = l.leadStatus?.toLowerCase();

    if (filter === "all") return true;
    if (filter === "won") return status === "won";
    if (filter === "pending") return status === "pending";
    if (filter === "prospective") return status === "prospective";

    if (filter === "today") {
      const today = new Date().toISOString().split("T")[0];
      return l.nextFollowUpDate === today;
    }

    return true;
  });

  // PAGINATION
  const indexOfLast = currentPage * leadsPerPage;
  const indexOfFirst = indexOfLast - leadsPerPage;

  const currentLeads = filteredLeads.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredLeads.length / leadsPerPage)
  );

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
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");

      await fetch(
        `https://crm-2umd.onrender.com/api/crm/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchLeads();
    } catch (err) {
      console.error(err);
    }
  };

  // EDIT
  const handleEdit = (lead) => {
    console.log("Edit Lead:", lead);
  };

  // DATE FORMAT
  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString("en-IN");
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6 flex-wrap">
        <h2 className="text-2xl font-bold">
          {type === "all" ? "All Leads" : "My Leads"}
        </h2>

        <span className="text-sm text-gray-500">
          {filteredLeads.length} results
        </span>
      </div>

      {/* FILTER DROPDOWN */}
      <div className="flex justify-between items-center mb-4 flex-wrap gap-3">
        <div>
          <p className="text-sm text-gray-500">Filter Leads</p>
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="border px-3 py-2 rounded-lg text-sm bg-white shadow-sm mt-1"
          >
            <option value="all">All Leads</option>
            <option value="won">Materialized (Won)</option>
            <option value="pending">Pending</option>
            <option value="prospective">Prospective</option>
            <option value="today">Today's Follow-up</option>
          </select>
        </div>

        <span className="text-sm text-gray-600">
          Showing {filteredLeads.length} results
        </span>
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-xl shadow overflow-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">#</th>
              <th className="p-3">Title</th>
              <th className="p-3">Status</th>
              <th className="p-3">Follow Up</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Company</th>
              <th className="p-3">GST</th>
              <th className="p-3">Description</th>
              <th className="p-3">Created By</th>
              <th className="p-3">Created At</th>

              {/* ✅ ONLY FOR ALL LEADS */}
              {<th className="p-3">Action</th>}
            </tr>
          </thead>

          <tbody>
            {currentLeads.map((l, index) => (
              <tr key={l.leadId} className="border-t hover:bg-gray-50">

                <td className="p-3">
                  {indexOfFirst + index + 1}
                </td>
<td
  onClick={() => navigate(`/lead/${l.leadId}/remarks`)}
  className="p-3 text-blue-600 font-medium cursor-pointer hover:underline"
>
  {l.leadTitle}
</td>

                <td className="p-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">
                    {l.leadStatus}
                  </span>
                </td>

                <td className="p-3">
                  {formatDate(l.nextFollowUpDate)}
                </td>

                <td className="p-3">{l.contactPerson}</td>
                <td className="p-3">{l.contactPhone}</td>
                <td className="p-3">{l.companyName}</td>
                <td className="p-3">{l.gstNo}</td>
                <td className="p-3">{l.goodsDescription}</td>
                <td className="p-3">{l.createdBy}</td>
                <td className="p-3">
                  {formatDate(l.createdAt)}
                </td>

                {/* ACTION ONLY IN ALL LEADS */}
                {/* {type === "all" && (
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => handleEdit(l)}
                      className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(l.leadId)}
                      className="px-2 py-1 bg-red-500 text-white rounded text-xs"
                    >
                      Delete
                    </button>
                  </td>
                )} */}

                <td className="p-3 flex gap-2">

  {/* ✅ EDIT ONLY IN ALL LEADS */}
  {type === "all" && (
    <button
      onClick={() => handleEdit(l)}
      className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
    >
      Edit
    </button>
  )}

  {/* ✅ DELETE IN BOTH */}
  <button
    onClick={() => handleDelete(l.leadId)}
    className="px-2 py-1 bg-red-500 text-white rounded text-xs"
  >
    Delete
  </button>

</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center gap-2 mt-6">
        <button onClick={() => setCurrentPage(1)}>⏮</button>

        <button
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          ◀
        </button>

        <span className="px-3">
          {currentPage} / {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
        >
          ▶
        </button>

        <button onClick={() => setCurrentPage(totalPages)}>⏭</button>
      </div>
    </div>
  );
}
