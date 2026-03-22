import { useState } from "react";
import { Search, Menu } from "lucide-react";

export default function Navbar({ setIsOpen }) {
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
    <div className="w-full bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between gap-3">

      {/* LEFT SECTION (MENU + SEARCH) */}
      <div className="flex items-center gap-3 w-full md:w-1/2">

        {/* MENU BUTTON (MOBILE ONLY) */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(true)}
        >
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
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 border border-transparent focus:border-blue-400 focus:ring-1 focus:ring-blue-400 outline-none text-sm transition"
          />

          {/* DROPDOWN */}
          {search && (
            <div className="absolute top-11 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-44 overflow-y-auto z-50">

              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <div
                    key={index}
                    className="px-4 py-2 text-sm hover:bg-blue-50 cursor-pointer transition"
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
      </div>

      {/* RIGHT SECTION (PROFILE) */}
      <div className="flex items-center gap-3 shrink-0">

        {/* TEXT (HIDE ON SMALL MOBILE) */}
        <div className="hidden sm:block text-right">
          <p className="text-sm font-medium text-gray-900">
            Alex Rivera
          </p>
          <p className="text-xs text-gray-400">
            Lead Specialist
          </p>
        </div>

        {/* AVATAR */}
        <div className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden border border-gray-200">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/029/271/062/small/avatar-profile-icon-in-flat-style-male-user-profile-illustration-on-isolated-background-man-profile-sign-business-concept-vector.jpg"
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>

      </div>
    </div>
  );
}