import { useState } from "react";
import { Search, Menu } from "lucide-react";

export default function Navbar({ setIsOpen }) {
  const [search, setSearch] = useState("");

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
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
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