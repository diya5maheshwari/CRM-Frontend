import SidebarItem from "./SidebarItem";
import SidebarDrawer from "./SidebarDrawer";
import Logo from "../../assets/logo.webp";

const menuItems = [
  { title: "Dashboard", active: true },
  { title: "New Lead" },
  { title: "Add Remark" },
  { title: "Profile" },
];

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col justify-between">
      {/* TOP SECTION */}
      <div className="px-5 pt-6">
        {/* Logo + Text */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gray-100 p-2 rounded-lg">
            <img src={Logo} className="w-12 h-12 object-contain" />
          </div>{" "}
          <div>
            <h1 className="text-sm font-semibold text-gray-900">
              Sales Intelligence
            </h1>

            <p className="text-xs text-gray-400 tracking-wide">
              LUMINESCENT COMMAND
            </p>
          </div>
        </div>

        {/* MENU */}
        <div className="space-y-2">
          {menuItems.map((item, index) => (
            <SidebarItem key={index} title={item.title} active={item.active} />
          ))}
        </div>
      </div>

      {/* BOTTOM BUTTON */}
      <div className="px-5 pb-6">
        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-medium shadow-md hover:opacity-90 transition">
          + New Deal
        </button>
      </div>
    </div>
  );
}
