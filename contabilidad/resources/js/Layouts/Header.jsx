import { Link } from "@inertiajs/react";
import { useAuth } from "../hooks/useAuth";

export default function Header({ isSidebarCollapsed, onToggleSidebar }) {
  const { user } = useAuth();

  const fullName = [user?.first_name, user?.last_name].filter(Boolean).join(" ") || "Usuario";

  return (
    <header
      className="navbar navbar-expand px-3"
      style={{
        height: "64px",
        backgroundColor: "var(--color-surface)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div className="container-fluid px-0">
        <div className="d-flex align-items-center gap-2">
          <button
            type="button"
            className="btn btn-sm"
            onClick={onToggleSidebar}
            aria-label="Alternar menu lateral"
            title={isSidebarCollapsed ? "Expandir menu" : "Contraer menu"}
            style={{
              border: "1px solid var(--color-border)",
              color: "var(--color-text)",
              backgroundColor: "transparent",
              width: "36px",
              height: "36px",
              padding: 0,
            }}
          >
            {isSidebarCollapsed ? ">" : "<"}
          </button>

          <h1 className="h5 mb-0 fw-bold" style={{ color: "var(--color-text)" }}>
            Panel Contable
          </h1>
        </div>

        <div className="ms-auto d-flex align-items-center gap-3">
          <div className="text-end">
            <div className="fw-semibold small" style={{ color: "var(--color-text)" }}>
              {fullName}
            </div>
            <div className="small" style={{ color: "var(--color-text-muted)" }}>
              {user?.role || "usuario"}
            </div>
          </div>

          <Link
            href={route("logout")}
            method="post"
            as="button"
            className="btn btn-sm"
            style={{
              backgroundColor: "var(--color-accent)",
              color: "var(--color-accent-contrast)",
              border: "1px solid var(--color-accent)",
            }}
          >
            Cerrar sesion
          </Link>
        </div>
      </div>
    </header>
  );
}
