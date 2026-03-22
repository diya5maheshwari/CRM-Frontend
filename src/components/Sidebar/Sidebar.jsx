import SidebarItem from "./SidebarItem";
import SidebarDrawer from "./SidebarDrawer";
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
      {/* MOBILE OVERLAY */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50
        transform transition-all duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        {/* CLOSE BUTTON (MOBILE) */}
        <div className="md:hidden flex justify-end p-4">
          <button onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* LOGO */}
        <div className="px-6 pb-4">
          <img src={Logo} alt="logo" className="w-10 mb-2" />
          <h1 className="text-lg font-semibold text-gray-900">
            Sales Intelligence
          </h1>
          <p className="text-xs text-gray-400">Luminescent Command</p>
        </div>

        {/* MENU */}
        <SidebarDrawer title="Menu">
          {menuItems.map((item, i) => (
            <SidebarItem key={i} title={item.title} active={item.active} />
          ))}
        </SidebarDrawer>

        {/* BUTTON */}
        <div className="p-4 mt-auto">
          <button className="w-full py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition">
            + New Deal
          </button>
        </div>
      </div>
    </>
  );
}