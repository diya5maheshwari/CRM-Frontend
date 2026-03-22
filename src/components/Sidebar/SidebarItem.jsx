export default function SidebarItem({ title, active }) {
  return (
    <div
      className={`px-4 py-2 rounded-lg cursor-pointer text-sm font-medium transition
      ${
        active
          ? "bg-blue-100 text-blue-600"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {title}
    </div>
  );
}