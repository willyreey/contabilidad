import { Head, useForm, usePage } from "@inertiajs/react";
import { useMemo } from "react";
import AppLayout from "../../Layouts/AppLayout";

export default function Edit({ status }) {
  const { auth } = usePage().props;
  const user = auth.user;

  const initials = useMemo(() => {
    const first = user?.first_name?.[0] || "U";
    const last = user?.last_name?.[0] || "";
    return `${first}${last}`.toUpperCase();
  }, [user]);

  const profileForm = useForm({
    first_name: user?.first_name || "",
    last_name: user?.last_name || "",
    description: user?.description || "",
  });

  const passwordForm = useForm({
    current_password: "",
    password: "",
    password_confirmation: "",
  });

  const submitProfile = (event) => {
    event.preventDefault();
    profileForm.patch(route("profile.update"), { preserveScroll: true });
  };

  const submitPassword = (event) => {
    event.preventDefault();
    passwordForm.put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => passwordForm.reset(),
      onError: () => passwordForm.reset("current_password", "password", "password_confirmation"),
    });
  };

  return (
    <AppLayout>
      <Head title="Mi Perfil" />

      <section>
        <h2 className="h4 fw-bold mb-3">Mi Perfil</h2>

        <div className="row g-4">
          <div className="col-12 col-lg-4">
            <div className="card border-0 h-100" style={{ boxShadow: "var(--shadow-sm)" }}>
              <div className="card-body text-center">
                <div
                  className="mx-auto d-flex align-items-center justify-content-center rounded-circle fw-bold"
                  style={{
                    width: "96px",
                    height: "96px",
                    backgroundColor: "var(--color-primary)",
                    color: "var(--color-primary-contrast)",
                    fontSize: "1.75rem",
                  }}
                >
                  {initials}
                </div>

                <h3 className="h5 mt-3 mb-1">{[user?.first_name, user?.last_name].filter(Boolean).join(" ")}</h3>
                <p className="small mb-0" style={{ color: "var(--color-text-muted)" }}>
                  {user?.email}
                </p>
              </div>
            </div>
          </div>

          <div className="col-12 col-lg-8">
            <div className="card border-0 mb-4" style={{ boxShadow: "var(--shadow-sm)" }}>
              <div className="card-body">
                <h3 className="h6 fw-bold mb-3">Datos del Perfil</h3>

                {status === "profile-updated" ? (
                  <div className="alert alert-success py-2" role="alert">
                    Perfil actualizado correctamente.
                  </div>
                ) : null}

                <form onSubmit={submitProfile} noValidate>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold" htmlFor="first_name">
                        Nombre
                      </label>
                      <input
                        id="first_name"
                        type="text"
                        className={`form-control ${profileForm.errors.first_name ? "is-invalid" : ""}`}
                        value={profileForm.data.first_name}
                        onChange={(event) => profileForm.setData("first_name", event.target.value)}
                      />
                      {profileForm.errors.first_name ? (
                        <div className="invalid-feedback">{profileForm.errors.first_name}</div>
                      ) : null}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold" htmlFor="last_name">
                        Apellido
                      </label>
                      <input
                        id="last_name"
                        type="text"
                        className={`form-control ${profileForm.errors.last_name ? "is-invalid" : ""}`}
                        value={profileForm.data.last_name}
                        onChange={(event) => profileForm.setData("last_name", event.target.value)}
                      />
                      {profileForm.errors.last_name ? (
                        <div className="invalid-feedback">{profileForm.errors.last_name}</div>
                      ) : null}
                    </div>

                    <div className="col-12">
                      <label className="form-label fw-semibold" htmlFor="description">
                        Descripcion
                      </label>
                      <textarea
                        id="description"
                        rows="4"
                        className={`form-control ${profileForm.errors.description ? "is-invalid" : ""}`}
                        placeholder="Describe tu rol o responsabilidades"
                        value={profileForm.data.description}
                        onChange={(event) => profileForm.setData("description", event.target.value)}
                      />
                      {profileForm.errors.description ? (
                        <div className="invalid-feedback">{profileForm.errors.description}</div>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-3 d-flex justify-content-end">
                    <button
                      type="submit"
                      className="btn fw-semibold"
                      disabled={profileForm.processing}
                      style={{
                        backgroundColor: "var(--color-primary)",
                        color: "var(--color-primary-contrast)",
                      }}
                    >
                      {profileForm.processing ? "Guardando..." : "Guardar Perfil"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="card border-0" style={{ boxShadow: "var(--shadow-sm)" }}>
              <div className="card-body">
                <h3 className="h6 fw-bold mb-3">Actualizar Contraseña</h3>

                <form onSubmit={submitPassword} noValidate>
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-semibold" htmlFor="current_password">
                        Contraseña actual
                      </label>
                      <input
                        id="current_password"
                        type="password"
                        className={`form-control ${passwordForm.errors.current_password ? "is-invalid" : ""}`}
                        value={passwordForm.data.current_password}
                        onChange={(event) => passwordForm.setData("current_password", event.target.value)}
                      />
                      {passwordForm.errors.current_password ? (
                        <div className="invalid-feedback">{passwordForm.errors.current_password}</div>
                      ) : null}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold" htmlFor="password">
                        Nueva contraseña
                      </label>
                      <input
                        id="password"
                        type="password"
                        className={`form-control ${passwordForm.errors.password ? "is-invalid" : ""}`}
                        value={passwordForm.data.password}
                        onChange={(event) => passwordForm.setData("password", event.target.value)}
                      />
                      {passwordForm.errors.password ? (
                        <div className="invalid-feedback">{passwordForm.errors.password}</div>
                      ) : null}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-semibold" htmlFor="password_confirmation">
                        Confirmar nueva contraseña
                      </label>
                      <input
                        id="password_confirmation"
                        type="password"
                        className="form-control"
                        value={passwordForm.data.password_confirmation}
                        onChange={(event) => passwordForm.setData("password_confirmation", event.target.value)}
                      />
                    </div>
                  </div>

                  <div className="mt-3 d-flex justify-content-end">
                    <button
                      type="submit"
                      className="btn fw-semibold"
                      disabled={passwordForm.processing}
                      style={{
                        backgroundColor: "var(--color-accent)",
                        color: "var(--color-accent-contrast)",
                      }}
                    >
                      {passwordForm.processing ? "Actualizando..." : "Actualizar Contraseña"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
