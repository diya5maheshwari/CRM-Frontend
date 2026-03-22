export default function SidebarDrawer({ title, children }) {
  return (
    <div className="px-4 mt-4">
      <h2 className="text-xs text-gray-400 mb-2 uppercase">{title}</h2>
      <div className="space-y-1">{children}</div>
    </div>
  );
}