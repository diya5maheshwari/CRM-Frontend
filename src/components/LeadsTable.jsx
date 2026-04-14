export default function LeadsTable({ leads }) {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full text-sm">
        
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Contact</th>
            <th className="p-3 text-left">Address</th>
            <th className="p-3 text-left">Role</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead.id} className="border-t hover:bg-gray-50">
              <td className="p-3 font-medium">{lead.fullName}</td>
              <td className="p-3">{lead.contactNumber}</td>
              <td className="p-3">{lead.address}</td>
              <td className="p-3">{lead.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}