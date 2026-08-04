import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout({ children }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <div className="app-shell d-flex">
      <Sidebar isCollapsed={isSidebarCollapsed} />

      <div className="d-flex flex-column flex-grow-1 app-main" style={{ minWidth: 0 }}>
        <Header isSidebarCollapsed={isSidebarCollapsed} onToggleSidebar={handleToggleSidebar} />

        <main className="flex-grow-1 p-3 p-lg-4">
          <div
            className="h-100"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              boxShadow: "var(--shadow-sm)",
              minHeight: "calc(100vh - 64px - 2.2rem)",
              padding: "1.25rem",
            }}
          >
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
