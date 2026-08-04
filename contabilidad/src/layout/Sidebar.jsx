import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/importar", label: "Importar Archivos" },
  { to: "/usuarios", label: "Gestion de Usuarios" },
  { to: "/perfil", label: "Mi Perfil" },
];

export default function Sidebar({ isCollapsed }) {
  return (
    <aside
      className={`d-flex flex-column app-sidebar ${isCollapsed ? "collapsed" : ""}`}
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--color-primary)",
        color: "var(--color-primary-contrast)",
      }}
    >
      <div
        className="d-flex align-items-center px-3"
        style={{
          height: "64px",
          borderBottom: "1px solid rgb(255 255 255 / 15%)",
        }}
      >
        <span className="fw-bold text-uppercase small sidebar-brand">Contabilidad</span>
      </div>

      <nav className="px-2 py-3">
        <ul className="nav nav-pills flex-column gap-1">
          {navItems.map((item) => (
            <li className="nav-item" key={item.to}>
              <NavLink
                to={item.to}
                className="nav-link"
                style={({ isActive }) => ({
                  color: "var(--color-primary-contrast)",
                  backgroundColor: isActive ? "rgb(255 255 255 / 16%)" : "transparent",
                  borderRadius: "var(--radius-sm)",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  fontWeight: isActive ? 700 : 500,
                })}
              >
                <span className="sidebar-label">{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
