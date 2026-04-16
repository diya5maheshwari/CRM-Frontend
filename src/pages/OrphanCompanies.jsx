import { useEffect, useState } from "react";

export default function OrphanCompanies() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [leadForm, setLeadForm] = useState({
    leadTitle: "",
    leadStatus: "New",
    nextFollowUpDate: "",
  });

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    const token = localStorage.getItem("token");

    const res = await fetch(
      "https://crm-2umd.onrender.com/api/crm/get-orphan-Company",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();
    setCompanies(data);
  };

  const handleCreateLead = async () => {
    try {
      const token = localStorage.getItem("token");

      await fetch(
        `https://crm-2umd.onrender.com/api/crm/company/${selectedCompany.id}/add-lead`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(leadForm),
        }
      );

      setSelectedCompany(null);
      setLeadForm({
        leadTitle: "",
        leadStatus: "New",
        nextFollowUpDate: "",
      });

      fetchCompanies();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">

      {/* HEADER */}
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800">
          Orphan Companies
        </h2>
        <p className="text-gray-500 text-sm">
          Companies without leads — convert them into opportunities 🚀
        </p>
      </div>

      {/* EMPTY STATE */}
      {companies.length === 0 && (
        <div className="text-center py-20 text-gray-500">
          No orphan companies found 😕
        </div>
      )}

      {/* DESKTOP TABLE */}
      <div className="hidden md:block bg-white rounded-xl shadow-md overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-4">Company</th>
              <th className="p-4">Contact</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Email</th>
              <th className="p-4">Status</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>

          <tbody>
            {companies.map((c) => (
              <tr
                key={c.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-4 font-medium text-gray-800">
                  {c.companyName}
                </td>
                <td className="p-4">{c.contactPerson}</td>
                <td className="p-4">{c.contactPhone}</td>
                <td className="p-4">{c.contactEmail}</td>

                <td className="p-4">
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                    {c.status}
                  </span>
                </td>

                <td className="p-4">
                  <button
                    onClick={() => setSelectedCompany(c)}
                    className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white px-4 py-1.5 rounded-lg shadow-sm transition"
                  >
                    Make Lead
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="md:hidden space-y-4">
        {companies.map((c) => (
          <div
            key={c.id}
            className="bg-white p-4 rounded-xl shadow-sm border"
          >
            <h3 className="font-semibold text-lg text-gray-800">
              {c.companyName}
            </h3>

            <p className="text-sm text-gray-500">
              {c.contactPerson}
            </p>

            <div className="mt-2 text-sm text-gray-600 space-y-1">
              <p>📞 {c.contactPhone}</p>
              <p>✉️ {c.contactEmail}</p>
            </div>

            <button
              onClick={() => setSelectedCompany(c)}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg"
            >
              Make Lead
            </button>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedCompany && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center px-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">

            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              Create Lead
            </h3>

            <input
              placeholder="Lead Title"
              className="w-full border rounded-lg p-2 mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
              value={leadForm.leadTitle}
              onChange={(e) =>
                setLeadForm({ ...leadForm, leadTitle: e.target.value })
              }
            />

            <select
              className="w-full border rounded-lg p-2 mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
              value={leadForm.leadStatus}
              onChange={(e) =>
                setLeadForm({ ...leadForm, leadStatus: e.target.value })
              }
            >
              <option>New</option>
              <option>Prospective</option>
              <option>Materialized</option>
            </select>

            <input
              type="date"
              className="w-full border rounded-lg p-2 mb-4 focus:ring-2 focus:ring-blue-400 outline-none"
              value={leadForm.nextFollowUpDate}
              onChange={(e) =>
                setLeadForm({
                  ...leadForm,
                  nextFollowUpDate: e.target.value,
                })
              }
            />

            <div className="flex justify-between">
              <button
                onClick={() => setSelectedCompany(null)}
                className="px-4 py-2 bg-gray-200 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={handleCreateLead}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}