import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [authError, setAuthError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  const onSubmit = async (values) => {
    setAuthError("");

    const result = await login(values);

    if (!result.ok) {
      setAuthError(result.message || "No se pudo iniciar sesion");
      return;
    }

    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center p-3">
      <div className="row w-100 justify-content-center">
        <div className="col-12 col-md-8 col-lg-5 col-xl-4">
          <div className="card border-0" style={{ boxShadow: "var(--shadow-md)", borderRadius: "var(--radius-md)" }}>
            <div
              className="card-header border-0 py-3"
              style={{ backgroundColor: "var(--color-primary)", color: "var(--color-primary-contrast)" }}
            >
              <h1 className="h5 mb-0 fw-bold">Iniciar Sesión</h1>
            </div>

            <div className="card-body p-4">
              <p className="small mb-4" style={{ color: "var(--color-text-muted)" }}>
                Ingresa con tu username o email y tu contraseña.
              </p>

              {authError ? (
                <div className="alert alert-danger py-2" role="alert">
                  {authError}
                </div>
              ) : null}

              <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="mb-3">
                  <label className="form-label fw-semibold" htmlFor="identifier">
                    Username o Email
                  </label>
                  <input
                    id="identifier"
                    type="text"
                    className={`form-control ${errors.identifier ? "is-invalid" : ""}`}
                    placeholder="admin o admin@email.com"
                    {...register("identifier", {
                      required: "Este campo es obligatorio",
                      minLength: {
                        value: 3,
                        message: "Debe tener al menos 3 caracteres",
                      },
                      validate: (value) => {
                        const trimmed = value.trim();
                        const isEmail = trimmed.includes("@");
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                        if (isEmail && !emailRegex.test(trimmed)) {
                          return "Ingresa un email valido";
                        }

                        return true;
                      },
                    })}
                  />
                  {errors.identifier ? (
                    <div className="invalid-feedback">{errors.identifier.message}</div>
                  ) : null}
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold" htmlFor="password">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    placeholder="********"
                    autoComplete="current-password"
                    {...register("password", {
                      required: "La contraseña es obligatoria",
                      minLength: {
                        value: 6,
                        message: "Debe tener al menos 6 caracteres",
                      },
                    })}
                  />
                  {errors.password ? (
                    <div className="invalid-feedback">{errors.password.message}</div>
                  ) : null}
                </div>

                <button
                  type="submit"
                  className="btn w-100 fw-semibold"
                  disabled={isSubmitting}
                  style={{
                    backgroundColor: "var(--color-accent)",
                    color: "var(--color-accent-contrast)",
                    border: "1px solid var(--color-accent)",
                  }}
                >
                  {isSubmitting ? "Validando..." : "Ingresar"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
