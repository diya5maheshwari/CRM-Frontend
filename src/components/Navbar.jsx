import { useState } from "react";
import { Search, Menu } from "lucide-react";

export default function Navbar({ setIsOpen }) {
  const [search, setSearch] = useState("");
  const [history, setHistory] = useState([]);

  const data = [
    "Leads",
    "Jane Smith",
    "Robert Brown",
    "Alice White",
    "Rahul Sharma",
    "Amit Verma",
  ];

  // Filter results
  const filteredData = data.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  // Handle click on result
  const handleSelect = (item) => {
    setSearch(item);

    // Add to history (avoid duplicates)
    if (!history.includes(item)) {
      setHistory([item, ...history.slice(0, 4)]); // max 5 items
    }
  };

  return (
    <div className="w-full bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between">

      {/* LEFT */}
      <div className="flex items-center gap-3 w-full max-w-xl">

        {/* MENU BUTTON */}
        <button onClick={() => setIsOpen(true)}>
          <Menu className="w-6 h-6 text-gray-700" />
        </button>

        {/* SEARCH */}
        <div className="relative w-full">
          <Search className="absolute left-3 top-2.5 text-gray-400 w-4 h-4" />

          <input
            type="text"
            placeholder="Search employees, roles, or leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 border focus:outline-none focus:ring-1 focus:ring-blue-400"
          />

          {/* DROPDOWN */}
          {(search || history.length > 0) && (
            <div className="absolute top-11 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-56 overflow-y-auto">

              {/* SEARCH RESULTS */}
              {search && (
                <>
                  <p className="px-4 py-2 text-xs text-gray-400">Results</p>

                  {filteredData.length > 0 ? (
                    filteredData.map((item, i) => (
                      <div
                        key={i}
                        onClick={() => handleSelect(item)}
                        className="px-4 py-2 text-sm hover:bg-blue-50 cursor-pointer"
                      >
                        {item}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-400">
                      No results found
                    </div>
                  )}
                </>
              )}

              {/* HISTORY */}
              {!search && history.length > 0 && (
                <>
                  <p className="px-4 py-2 text-xs text-gray-400">
                    Recent Searches
                  </p>

                  {history.map((item, i) => (
                    <div
                      key={i}
                      onClick={() => handleSelect(item)}
                      className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                      {item}
                    </div>
                  ))}
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 ml-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-gray-900">Alex Rivera</p>
          <p className="text-xs text-gray-400">Lead Specialist</p>
        </div>

        <div className="w-10 h-10 rounded-full overflow-hidden border">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/029/271/062/small/avatar-profile-icon-in-flat-style-male-user-profile-illustration-on-isolated-background-man-profile-sign-business-concept-vector.jpg"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}