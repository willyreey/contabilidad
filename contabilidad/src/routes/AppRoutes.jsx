import { Navigate, Route, Routes } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import { useAuth } from "../context/AuthContext";
import Login from "../views/auth/Login";
import UserProfile from "../views/profile/UserProfile";
import UserRegister from "../views/users/UserRegister";
import ImportTransactions from "../views/transactions/ImportTransactions";

function DashboardView() {
  return (
    <section>
      <h2 className="h4 fw-bold mb-2">Dashboard</h2>
      <p className="mb-0" style={{ color: "var(--color-text-muted)" }}>
        Bienvenido al panel principal del sistema contable.
      </p>
    </section>
  );
}

function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />}
      />

      <Route
        path="/"
        element={
          <PrivateRoute>
            <AppLayout />
          </PrivateRoute>
        }
      >
        <Route path="dashboard" element={<DashboardView />} />
        <Route path="perfil" element={<UserProfile />} />
        <Route path="usuarios" element={<UserRegister />} />
        <Route path="importar" element={<ImportTransactions />} />
        <Route index element={<Navigate to="/dashboard" replace />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
      />
    </Routes>
  );
}
