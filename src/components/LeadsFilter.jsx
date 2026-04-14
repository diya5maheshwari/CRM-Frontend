// export default function LeadsFilter({ filters, setFilters }) {
//   return (
//     <div className="flex gap-4 mb-4">
//       {/* ROLE FILTER */}
//       <select
//         value={filters.status}
//         onChange={(e) => setFilters({ ...filters, status: e.target.value })}
//       >
//         <option value="">All</option>
//         <option value="MATERIALIZED">Materialized</option>
//         <option value="PROSPECTIVE">Prospective</option>
//         <option value="PENDING">Pending</option>
//       </select>

//       {/* SEARCH */}
//       <input
//         type="text"
//         placeholder="Search name..."
//         className="border p-2 rounded"
//         onChange={(e) => setFilters({ ...filters, search: e.target.value })}
//       />
//     </div>
//   );
// }


export default function LeadsFilter({ filters, setFilters }) {
  return (
    <div className="flex gap-4 mb-4">

      <select
        value={filters.status}
        onChange={(e) =>
          setFilters({ ...filters, status: e.target.value })
        }
        className="border p-2 rounded"
      >
        <option value="">All</option>
        <option value="MATERIALIZED">Materialized</option>
        <option value="PROSPECTIVE">Prospective</option>
        <option value="PENDING">Pending</option>
      </select>

      <input
        type="text"
        placeholder="Search name..."
        className="border p-2 rounded"
        onChange={(e) =>
          setFilters({ ...filters, search: e.target.value })
        }
      />

    </div>
  );
}