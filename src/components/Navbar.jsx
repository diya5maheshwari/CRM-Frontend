import { useState } from "react";
import { Search } from "lucide-react";

export default function Navbar() {
  const [search, setSearch] = useState("");

  const data = [
    "John Doe",
    "Jane Smith",
    "Robert Brown",
    "Alice White",
    "Rahul Sharma",
    "Amit Verma",
  ];

  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between gap-4 flex-wrap md:flex-nowrap">

      {/* SEARCH BAR */}
      <div className="relative w-full md:w-1/2">

        <Search className="absolute left-3 top-3 text-gray-400 w-4 h-4" />

        <input
          type="text"
          placeholder="Search employees, roles, or leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        />

        {/* DROPDOWN */}
        {search && (
          <div className="absolute top-12 w-full bg-white border border-gray-200 rounded-lg shadow-md max-h-40 overflow-y-auto z-50">
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <div
                  key={index}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  {item}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-400 text-sm">
                No results found
              </div>
            )}
          </div>
        )}
      </div>

      {/* PROFILE SECTION */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-end">

        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-gray-900">Alex Rivera</p>
          <p className="text-xs text-gray-400">Lead Specialist</p>
        </div>

        <div className="w-9 h-9 md:w-10 md:h-10 bg-gray-200 rounded-full flex items-center justify-center">
          {/* 👤 */}
          <img src="https://static.vecteezy.com/system/resources/thumbnails/029/271/062/small/avatar-profile-icon-in-flat-style-male-user-profile-illustration-on-isolated-background-man-profile-sign-business-concept-vector.jpg" alt="" />
        </div>
      </div>

    </div>
  );
}