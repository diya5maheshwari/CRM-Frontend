import { useState } from "react";

export default function SidebarDrawer({ title, children }) {
  const [open, setOpen] = useState(true);

  return (
    <div className="mt-6">
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center px-2 py-2 cursor-pointer text-gray-400 text-xs font-semibold uppercase tracking-wide"
      >
        {title}
        <span>{open ? "−" : "+"}</span>
      </div>

      {open && <div className="mt-2 space-y-2">{children}</div>}
    </div>
  );
}