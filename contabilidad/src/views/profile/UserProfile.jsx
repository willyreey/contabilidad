import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";

export default function UserProfile() {
  const { user, updateProfile } = useAuth();
  const [profileMessage, setProfileMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");

  const initials = useMemo(() => {
    const first = user?.firstName?.[0] || "U";
    const last = user?.lastName?.[0] || "";
    return `${first}${last}`.toUpperCase();
  }, [user]);

  const {
    register: registerProfile,
    handleSubmit: handleSubmitProfile,
    formState: { errors: profileErrors, isSubmitting: isSavingProfile },
  } = useForm({
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      description: user?.description || "",
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    watch,
    formState: { errors: passwordErrors, isSubmitting: isSavingPassword },
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  const onSubmitProfile = async (values) => {
    setProfileMessage("");
    await new Promise((resolve) => setTimeout(resolve, 300));
    updateProfile(values);
    setProfileMessage("Perfil actualizado correctamente.");
  };

  const onSubmitPassword = async () => {
    setPasswordMessage("");
    await new Promise((resolve) => setTimeout(resolve, 300));
    setPasswordMessage("Contraseña actualizada correctamente.");
    resetPassword();
  };

  return (
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

              <h3 className="h5 mt-3 mb-1">{[user?.firstName, user?.lastName].filter(Boolean).join(" ")}</h3>
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

              {profileMessage ? (
                <div className="alert alert-success py-2" role="alert">
                  {profileMessage}
                </div>
              ) : null}

              <form onSubmit={handleSubmitProfile(onSubmitProfile)} noValidate>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold" htmlFor="firstName">
                      Nombre
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      className={`form-control ${profileErrors.firstName ? "is-invalid" : ""}`}
                      {...registerProfile("firstName", { required: "El nombre es obligatorio" })}
                    />
                    {profileErrors.firstName ? (
                      <div className="invalid-feedback">{profileErrors.firstName.message}</div>
                    ) : null}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold" htmlFor="lastName">
                      Apellido
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      className={`form-control ${profileErrors.lastName ? "is-invalid" : ""}`}
                      {...registerProfile("lastName", { required: "El apellido es obligatorio" })}
                    />
                    {profileErrors.lastName ? (
                      <div className="invalid-feedback">{profileErrors.lastName.message}</div>
                    ) : null}
                  </div>

                  <div className="col-12">
                    <label className="form-label fw-semibold" htmlFor="description">
                      Descripcion
                    </label>
                    <textarea
                      id="description"
                      rows="4"
                      className={`form-control ${profileErrors.description ? "is-invalid" : ""}`}
                      placeholder="Describe tu rol o responsabilidades"
                      {...registerProfile("description", {
                        maxLength: {
                          value: 300,
                          message: "Maximo 300 caracteres",
                        },
                      })}
                    />
                    {profileErrors.description ? (
                      <div className="invalid-feedback">{profileErrors.description.message}</div>
                    ) : null}
                  </div>
                </div>

                <div className="mt-3 d-flex justify-content-end">
                  <button
                    type="submit"
                    className="btn fw-semibold"
                    disabled={isSavingProfile}
                    style={{
                      backgroundColor: "var(--color-primary)",
                      color: "var(--color-primary-contrast)",
                    }}
                  >
                    {isSavingProfile ? "Guardando..." : "Guardar Perfil"}
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div className="card border-0" style={{ boxShadow: "var(--shadow-sm)" }}>
            <div className="card-body">
              <h3 className="h6 fw-bold mb-3">Actualizar Contraseña</h3>

              {passwordMessage ? (
                <div className="alert alert-success py-2" role="alert">
                  {passwordMessage}
                </div>
              ) : null}

              <form onSubmit={handleSubmitPassword(onSubmitPassword)} noValidate>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label fw-semibold" htmlFor="currentPassword">
                    Contraseña actual
                    </label>
                    <input
                      id="currentPassword"
                      type="password"
                      className={`form-control ${passwordErrors.currentPassword ? "is-invalid" : ""}`}
                      {...registerPassword("currentPassword", {
                        required: "Ingresa tu contraseña actual",
                      })}
                    />
                    {passwordErrors.currentPassword ? (
                      <div className="invalid-feedback">{passwordErrors.currentPassword.message}</div>
                    ) : null}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold" htmlFor="newPassword">
                      Nueva contraseña
                    </label>
                    <input
                      id="newPassword"
                      type="password"
                      className={`form-control ${passwordErrors.newPassword ? "is-invalid" : ""}`}
                      {...registerPassword("newPassword", {
                        required: "Ingresa una nueva contraseña",
                        minLength: {
                          value: 8,
                          message: "Debe tener al menos 8 caracteres",
                        },
                      })}
                    />
                    {passwordErrors.newPassword ? (
                      <div className="invalid-feedback">{passwordErrors.newPassword.message}</div>
                    ) : null}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label fw-semibold" htmlFor="confirmPassword">
                      Confirmar nueva contraseña
                    </label>
                    <input
                      id="confirmPassword"
                      type="password"
                      className={`form-control ${passwordErrors.confirmPassword ? "is-invalid" : ""}`}
                      {...registerPassword("confirmPassword", {
                        required: "Confirma tu nueva contraseña",
                        validate: (value) => value === newPassword || "Las contraseñas no coinciden",
                      })}
                    />
                    {passwordErrors.confirmPassword ? (
                      <div className="invalid-feedback">{passwordErrors.confirmPassword.message}</div>
                    ) : null}
                  </div>
                </div>

                <div className="mt-3 d-flex justify-content-end">
                  <button
                    type="submit"
                    className="btn fw-semibold"
                    disabled={isSavingPassword}
                    style={{
                      backgroundColor: "var(--color-accent)",
                      color: "var(--color-accent-contrast)",
                    }}
                  >
                    {isSavingPassword ? "Actualizando..." : "Actualizar Contraseña"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
