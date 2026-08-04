import { Head, useForm } from "@inertiajs/react";

export default function Login({ status }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    identifier: "",
    password: "",
  });

  const submit = (event) => {
    event.preventDefault();

    post(route("login"), {
      onFinish: () => reset("password"),
    });
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center p-3">
      <Head title="Iniciar Sesion" />

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

              {status ? (
                <div className="alert alert-success py-2" role="alert">
                  {status}
                </div>
              ) : null}

              {errors.identifier ? (
                <div className="alert alert-danger py-2" role="alert">
                  {errors.identifier}
                </div>
              ) : null}

              <form onSubmit={submit} noValidate>
                <div className="mb-3">
                  <label className="form-label fw-semibold" htmlFor="identifier">
                    Username o Email
                  </label>
                  <input
                    id="identifier"
                    type="text"
                    className={`form-control ${errors.identifier ? "is-invalid" : ""}`}
                    placeholder="admin o admin@contabilidad.local"
                    autoComplete="username"
                    autoFocus
                    value={data.identifier}
                    onChange={(event) => setData("identifier", event.target.value)}
                    required
                  />
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
                    value={data.password}
                    onChange={(event) => setData("password", event.target.value)}
                    required
                  />
                  {errors.password ? <div className="invalid-feedback">{errors.password}</div> : null}
                </div>

                <button
                  type="submit"
                  className="btn w-100 fw-semibold"
                  disabled={processing}
                  style={{
                    backgroundColor: "var(--color-accent)",
                    color: "var(--color-accent-contrast)",
                    border: "1px solid var(--color-accent)",
                  }}
                >
                  {processing ? "Validando..." : "Ingresar"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
