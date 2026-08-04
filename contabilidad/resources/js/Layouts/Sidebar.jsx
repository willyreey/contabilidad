import { Link, usePage } from "@inertiajs/react";
import { useAuth } from "../hooks/useAuth";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/importar", label: "Importar Archivos" },
  { href: "/usuarios", label: "Gestion de Usuarios", adminOnly: true },
  { href: "/perfil", label: "Mi Perfil" },
];

export default function Sidebar({ isCollapsed }) {
  const { url } = usePage();
  const { isAdmin } = useAuth();

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
          {navItems
            .filter((item) => !item.adminOnly || isAdmin)
            .map((item) => {
              const isActive = url.startsWith(item.href);

              return (
                <li className="nav-item" key={item.href}>
                  <Link
                    href={item.href}
                    className="nav-link"
                    style={{
                      color: "var(--color-primary-contrast)",
                      backgroundColor: isActive ? "rgb(255 255 255 / 16%)" : "transparent",
                      borderRadius: "var(--radius-sm)",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      fontWeight: isActive ? 700 : 500,
                    }}
                  >
                    <span className="sidebar-label">{item.label}</span>
                  </Link>
                </li>
              );
            })}
        </ul>
      </nav>
    </aside>
  );
}
