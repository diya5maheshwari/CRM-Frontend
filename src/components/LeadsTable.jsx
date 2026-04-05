export default function LeadsTable({ leads }) {
  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow">

      <table className="min-w-full text-sm">

        {/* HEADER */}
        <thead className="bg-gray-600 text-white">
          <tr>
            <th className="p-3 text-left">#</th>
            <th className="p-3 text-left">Title</th>
            <th className="p-3">Status</th>
            <th className="p-3">Next Follow-up</th>
            <th className="p-3">Contact Person</th>
            <th className="p-3">Phone</th>
            <th className="p-3">Company</th>
            <th className="p-3">GST No</th>
            <th className="p-3">Goods Description</th>
            <th className="p-3">Created By</th>
            <th className="p-3">Created At</th>
          </tr>
        </thead>

        {/* BODY */}
        <tbody>
          {leads.map((lead, index) => (
            <tr
              key={index}
              className="border-t hover:bg-gray-50 text-center"
            >
              <td className="p-3">{index + 1}</td>

              <td className="p-3 text-blue-600 cursor-pointer text-left">
                {lead.title}
              </td>

              {/* STATUS BADGE */}
              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded text-xs font-semibold ${
                    lead.status === "Materialized"
                      ? "bg-green-100 text-green-600"
                      : lead.status === "Prospective"
                      ? "bg-purple-100 text-purple-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {lead.status}
                </span>
              </td>

              <td className="p-3">{lead.followUpDate}</td>
              <td className="p-3">{lead.contactPerson}</td>
              <td className="p-3">{lead.phone}</td>
              <td className="p-3">{lead.company}</td>
              <td className="p-3">{lead.gst}</td>

              {/* DESCRIPTION */}
              <td className="p-3 max-w-[150px] truncate">
                {lead.description}
              </td>

              <td className="p-3">{lead.createdBy}</td>
              <td className="p-3">{lead.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}