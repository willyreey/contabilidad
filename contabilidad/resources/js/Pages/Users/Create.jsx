import { Head, useForm } from "@inertiajs/react";
import AppLayout from "../../Layouts/AppLayout";

export default function Create({ status }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    first_name: "",
    last_name: "",
    username: "",
    email: "",
    country: "",
    city: "",
    address: "",
    birth_date: "",
    password: "",
    password_confirmation: "",
  });

  const submit = (event) => {
    event.preventDefault();

    post(route("usuarios.store"), {
      onSuccess: () => reset(),
    });
  };

  return (
    <AppLayout>
      <Head title="Alta de Usuario" />

      <section>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="h4 fw-bold mb-1">Alta de Usuario</h2>
            <p className="mb-0" style={{ color: "var(--color-text-muted)" }}>
              Formulario exclusivo para administradores.
            </p>
          </div>
        </div>

        {status ? (
          <div className="alert alert-success" role="alert">
            {status}
          </div>
        ) : null}

        <div className="card border-0" style={{ boxShadow: "var(--shadow-sm)" }}>
          <div className="card-body p-4">
            <form onSubmit={submit} noValidate>
              <div className="row g-3">
                <div className="col-md-6">
                  <label className="form-label fw-semibold" htmlFor="first_name">
                    Nombre
                  </label>
                  <input
                    id="first_name"
                    type="text"
                    className={`form-control ${errors.first_name ? "is-invalid" : ""}`}
                    value={data.first_name}
                    onChange={(event) => setData("first_name", event.target.value)}
                  />
                  {errors.first_name ? <div className="invalid-feedback">{errors.first_name}</div> : null}
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold" htmlFor="last_name">
                    Apellido
                  </label>
                  <input
                    id="last_name"
                    type="text"
                    className={`form-control ${errors.last_name ? "is-invalid" : ""}`}
                    value={data.last_name}
                    onChange={(event) => setData("last_name", event.target.value)}
                  />
                  {errors.last_name ? <div className="invalid-feedback">{errors.last_name}</div> : null}
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold" htmlFor="username">
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    className={`form-control ${errors.username ? "is-invalid" : ""}`}
                    value={data.username}
                    onChange={(event) => setData("username", event.target.value)}
                  />
                  {errors.username ? <div className="invalid-feedback">{errors.username}</div> : null}
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold" htmlFor="email">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    value={data.email}
                    onChange={(event) => setData("email", event.target.value)}
                  />
                  {errors.email ? <div className="invalid-feedback">{errors.email}</div> : null}
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold" htmlFor="country">
                    Pais
                  </label>
                  <input
                    id="country"
                    type="text"
                    className={`form-control ${errors.country ? "is-invalid" : ""}`}
                    value={data.country}
                    onChange={(event) => setData("country", event.target.value)}
                  />
                  {errors.country ? <div className="invalid-feedback">{errors.country}</div> : null}
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold" htmlFor="city">
                    Ciudad
                  </label>
                  <input
                    id="city"
                    type="text"
                    className={`form-control ${errors.city ? "is-invalid" : ""}`}
                    value={data.city}
                    onChange={(event) => setData("city", event.target.value)}
                  />
                  {errors.city ? <div className="invalid-feedback">{errors.city}</div> : null}
                </div>

                <div className="col-12">
                  <label className="form-label fw-semibold" htmlFor="address">
                    Direccion
                  </label>
                  <input
                    id="address"
                    type="text"
                    className={`form-control ${errors.address ? "is-invalid" : ""}`}
                    value={data.address}
                    onChange={(event) => setData("address", event.target.value)}
                  />
                  {errors.address ? <div className="invalid-feedback">{errors.address}</div> : null}
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold" htmlFor="birth_date">
                    Fecha de nacimiento
                  </label>
                  <input
                    id="birth_date"
                    type="date"
                    className={`form-control ${errors.birth_date ? "is-invalid" : ""}`}
                    value={data.birth_date}
                    onChange={(event) => setData("birth_date", event.target.value)}
                  />
                  {errors.birth_date ? <div className="invalid-feedback">{errors.birth_date}</div> : null}
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold" htmlFor="password">
                    Contraseña
                  </label>
                  <input
                    id="password"
                    type="password"
                    className={`form-control ${errors.password ? "is-invalid" : ""}`}
                    autoComplete="new-password"
                    value={data.password}
                    onChange={(event) => setData("password", event.target.value)}
                  />
                  {errors.password ? <div className="invalid-feedback">{errors.password}</div> : null}
                </div>

                <div className="col-md-6">
                  <label className="form-label fw-semibold" htmlFor="password_confirmation">
                    Confirmar contraseña
                  </label>
                  <input
                    id="password_confirmation"
                    type="password"
                    className="form-control"
                    autoComplete="new-password"
                    value={data.password_confirmation}
                    onChange={(event) => setData("password_confirmation", event.target.value)}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end mt-4">
                <button
                  type="submit"
                  className="btn fw-semibold"
                  disabled={processing}
                  style={{
                    backgroundColor: "var(--color-primary)",
                    color: "var(--color-primary-contrast)",
                    border: "1px solid var(--color-primary)",
                  }}
                >
                  {processing ? "Creando..." : "Crear Usuario"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
