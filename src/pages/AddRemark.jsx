import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function AddRemark() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [remarks, setRemarks] = useState([]);
  const [lead, setLead] = useState(null);

  // 🔥 NEW STATES
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    content: "",
    leadStatus: "NEW",
    nextFollowUpDate: "",
    callDurationInMinutes: "",
  });

  useEffect(() => {
    fetchRemarks();
  }, [id]);

  const fetchRemarks = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://crm-2umd.onrender.com/api/crm/lead/${id}/remarks`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        setRemarks([]);
        return;
      }

      const data = await res.json();
      setRemarks(data.remarks || []);
      setLead(data.lead || null);
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 ADD REMARK FUNCTION
  const handleAddRemark = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        `https://crm-2umd.onrender.com/api/crm/lead/${id}/addRemark`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      if (res.ok) {
        setShowModal(false);
        setForm({
          content: "",
          leadStatus: "NEW",
          nextFollowUpDate: "",
          callDurationInMinutes: "",
        });

        fetchRemarks(); // refresh
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">

      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Back to Leads
      </button>

      {/* LEAD INFO */}
      {lead && (
        <div className="bg-white p-4 rounded-xl shadow mb-6">
          <h2 className="text-xl font-bold">{lead.leadTitle}</h2>
          <p className="text-gray-500">{lead.companyName}</p>

          <div className="flex gap-6 mt-2 text-sm text-gray-600">
            <span>👤 {lead.contactPerson}</span>
            <span>📞 {lead.contactPhone}</span>

            {/* STATUS BADGE */}
            <span className="bg-blue-100 px-2 py-1 rounded text-blue-700 text-xs">
              {lead.leadStatus}
            </span>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Remarks</h2>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
        >
          + Add Remark
        </button>
      </div>

      {/* REMARK LIST */}
      <div className="space-y-4">
        {remarks.length === 0 ? (
          <div className="text-center text-gray-500 py-10 bg-white rounded-xl shadow">
            No remarks found
          </div>
        ) : (
          remarks.map((r) => (
            <div
              key={r.id}
              className="bg-white border rounded-xl p-4 shadow"
            >
              <p className="text-lg font-medium mb-2">{r.content}</p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-500 items-center">
                <span>📅 {r.createdAt?.slice(0, 10)}</span>
                <span>👤 {r.createdByName || "You"}</span>

                {/* 🔥 STATUS TEXT (NO GREEN BOX) */}
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    r.leadStatus === "WON"
                      ? "bg-green-100 text-green-700"
                      : r.leadStatus === "PENDING"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {r.leadStatus}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* 🔥 MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-96">
            <h3 className="text-lg font-bold mb-4">Add Remark</h3>

            <input
              placeholder="Remark"
              value={form.content}
              onChange={(e) =>
                setForm({ ...form, content: e.target.value })
              }
              className="w-full border p-2 mb-2 rounded"
            />

            {/* STATUS DROPDOWN */}
            <select
              value={form.leadStatus}
              onChange={(e) =>
                setForm({ ...form, leadStatus: e.target.value })
              }
              className="w-full border p-2 mb-2 rounded"
            >
              <option>NEW</option>
              <option>PENDING</option>
              <option>WON</option>
              <option>PROSPECTIVE</option>
            </select>

            <input
              type="date"
              value={form.nextFollowUpDate}
              onChange={(e) =>
                setForm({ ...form, nextFollowUpDate: e.target.value })
              }
              className="w-full border p-2 mb-2 rounded"
            />

            <input
              placeholder="Call Duration"
              value={form.callDurationInMinutes}
              onChange={(e) =>
                setForm({
                  ...form,
                  callDurationInMinutes: e.target.value,
                })
              }
              className="w-full border p-2 mb-4 rounded"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 border rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleAddRemark}
                className="bg-blue-500 text-white px-3 py-1 rounded"
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