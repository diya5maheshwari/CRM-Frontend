import { NavLink } from "react-router-dom";

export default function SidebarItem({ title, path }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        `block px-4 py-2 rounded-lg text-sm font-medium transition
        ${
          isActive
            ? "bg-blue-100 text-blue-600"
            : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      {title}
    </NavLink>
  );
}