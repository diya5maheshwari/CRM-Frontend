export default function LeadsFilter({ filters, setFilters }) {
  return (
    <div className="flex flex-wrap gap-3 mb-4">

      {/* STATUS */}
      <select
        value={filters.status}
        onChange={(e) =>
          setFilters({ ...filters, status: e.target.value })
        }
        className="border p-2 rounded-lg text-sm"
      >
        <option value="">All Status</option>
        <option value="New">New</option>
        <option value="Prospective">Prospective</option>
        <option value="Materialized">Materialized</option>
      </select>

      {/* DATE */}
      <input
        type="date"
        value={filters.date}
        onChange={(e) =>
          setFilters({ ...filters, date: e.target.value })
        }
        className="border p-2 rounded-lg text-sm"
      />

    </div>
  );
}