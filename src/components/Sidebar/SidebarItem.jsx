export default function SidebarItem({ title, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-4 py-2.5 rounded-lg cursor-pointer relative transition-all
      ${
        active
          ? "bg-blue-50 text-blue-600 font-medium"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {/* LEFT ACTIVE BAR */}
      {active && (
        <div className="absolute left-0 top-0 h-full w-1 bg-blue-500 rounded-r"></div>
      )}

      <span className="text-sm">{title}</span>
    </div>
  );
}