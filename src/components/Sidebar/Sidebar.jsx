import SidebarItem from "./SidebarItem";
import Logo from "../../assets/logo.webp";
import { X } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function Sidebar({ isOpen, setIsOpen }) {
  const menuItems = [
    { title: "Dashboard", path: "/" },
    { title: "New Lead", path: "/new-lead" },
    { title: "Add Remark", path: "/add-remark" },
    { title: "Profile", path: "/profile" },
    { title: "My Leads", path: "/myLeads" },
  ];
   const navigate = useNavigate();

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
          {/* LOGO + TEXT */}
          <div className=" flex items-center gap-2">
            <img src={Logo} alt="logo" className="w-16 h-13 object-contain" />

            <div>
              <h1 className="text-sm font-semibold text-gray-900">
                Sales Intelligence
              </h1>
              <p className="text-xs text-gray-400">Luminescent Command</p>
            </div>
          </div>

          {/* CLOSE BUTTON */}
          <button onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* MENU */}
        <div className="p-4 space-y-2">
          {menuItems.map((item, i) => (
            <SidebarItem key={i} title={item.title} path={item.path} />
          ))}
        </div>
      </div>
    </>
  );
}
