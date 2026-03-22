import SidebarItem from "./SidebarItem";
import Logo from "../../assets/logo.webp";
import { X } from "lucide-react";

export default function Sidebar({ isOpen, setIsOpen }) {
  const menuItems = [
    { title: "Dashboard", active: true },
    { title: "New Lead" },
    { title: "Add Remark" },
    { title: "Profile" },
  ];

  return (
    <>
      {/* OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center p-4 border-b">
          <div>
            <img src={Logo} className="w-8 mb-1" />
            <h1 className="text-sm font-semibold">Sales Intelligence</h1>
          </div>

          <button onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* MENU */}
        <div className="p-4 space-y-2">
          {menuItems.map((item, i) => (
            <SidebarItem key={i} title={item.title} active={item.active} />
          ))}
        </div>

        {/* BUTTON */}
        <div className="p-4 mt-auto">
          <button className="w-full py-2 bg-blue-600 text-white rounded-lg">
            + New Deal
          </button>
        </div>
      </div>
    </>
  );
}