import { createContext, useContext, useMemo, useState } from "react";

const AuthContext = createContext(null);

const MOCK_USER = {
  id: "usr-001",
  firstName: "Admin",
  lastName: "Contable",
  username: "admin",
  email: "admin@contabilidad.local",
  role: "admin",
  country: "Argentina",
  city: "Buenos Aires",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async ({ identifier, password }) => {
    const hasCredentials = Boolean(identifier?.trim()) && Boolean(password?.trim());

    if (!hasCredentials) {
      return { ok: false, message: "Credenciales incompletas" };
    }

    // Simulated API delay for UI flow testing.
    await new Promise((resolve) => setTimeout(resolve, 400));

    setUser({ ...MOCK_USER, identifier });
    return { ok: true, user: { ...MOCK_USER, identifier } };
  };

  const logout = () => {
    setUser(null);
  };

  const updateProfile = (partialProfile) => {
    setUser((prev) => {
      if (!prev) {
        return prev;
      }

      return { ...prev, ...partialProfile };
    });
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login,
      logout,
      updateProfile,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
