import { useState } from "react";
import { useForm } from "react-hook-form";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function UserRegister() {
  const [inviteMessage, setInviteMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      country: "",
      city: "",
      address: "",
      birthDate: "",
    },
  });

  const onSubmit = async (values) => {
    setInviteMessage("");

    await new Promise((resolve) => setTimeout(resolve, 500));

    setInviteMessage(`Invitacion enviada a ${values.email}. El usuario podra crear su contraseña desde el correo.`);
    reset();
  };

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="h4 fw-bold mb-1">Alta de Usuario</h2>
          <p className="mb-0" style={{ color: "var(--color-text-muted)" }}>
            Formulario exclusivo para administradores.
          </p>
        </div>
      </div>

      {inviteMessage ? (
        <div className="alert alert-success" role="alert">
          {inviteMessage}
        </div>
      ) : null}

      <div className="card border-0" style={{ boxShadow: "var(--shadow-sm)" }}>
        <div className="card-body p-4">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold" htmlFor="firstName">
                  Nombre
                </label>
                <input
                  id="firstName"
                  type="text"
                  className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                  {...register("firstName", {
                    required: "El nombre es obligatorio",
                    minLength: { value: 2, message: "Minimo 2 caracteres" },
                  })}
                />
                {errors.firstName ? <div className="invalid-feedback">{errors.firstName.message}</div> : null}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold" htmlFor="lastName">
                  Apellido
                </label>
                <input
                  id="lastName"
                  type="text"
                  className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                  {...register("lastName", {
                    required: "El apellido es obligatorio",
                    minLength: { value: 2, message: "Minimo 2 caracteres" },
                  })}
                />
                {errors.lastName ? <div className="invalid-feedback">{errors.lastName.message}</div> : null}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold" htmlFor="username">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  className={`form-control ${errors.username ? "is-invalid" : ""}`}
                  {...register("username", {
                    required: "El username es obligatorio",
                    pattern: {
                      value: /^[a-zA-Z0-9._-]{3,20}$/,
                      message: "Usa 3-20 caracteres sin espacios",
                    },
                  })}
                />
                {errors.username ? <div className="invalid-feedback">{errors.username.message}</div> : null}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  {...register("email", {
                    required: "El email es obligatorio",
                    pattern: { value: EMAIL_REGEX, message: "Ingresa un email valido" },
                  })}
                />
                {errors.email ? <div className="invalid-feedback">{errors.email.message}</div> : null}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold" htmlFor="country">
                  Pais
                </label>
                <input
                  id="country"
                  type="text"
                  className={`form-control ${errors.country ? "is-invalid" : ""}`}
                  {...register("country", { required: "El pais es obligatorio" })}
                />
                {errors.country ? <div className="invalid-feedback">{errors.country.message}</div> : null}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold" htmlFor="city">
                  Ciudad
                </label>
                <input
                  id="city"
                  type="text"
                  className={`form-control ${errors.city ? "is-invalid" : ""}`}
                  {...register("city", { required: "La ciudad es obligatoria" })}
                />
                {errors.city ? <div className="invalid-feedback">{errors.city.message}</div> : null}
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold" htmlFor="address">
                  Direccion
                </label>
                <input
                  id="address"
                  type="text"
                  className={`form-control ${errors.address ? "is-invalid" : ""}`}
                  {...register("address", {
                    required: "La direccion es obligatoria",
                    minLength: { value: 6, message: "Debe tener al menos 6 caracteres" },
                  })}
                />
                {errors.address ? <div className="invalid-feedback">{errors.address.message}</div> : null}
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold" htmlFor="birthDate">
                  Fecha de nacimiento
                </label>
                <input
                  id="birthDate"
                  type="date"
                  className={`form-control ${errors.birthDate ? "is-invalid" : ""}`}
                  {...register("birthDate", {
                    required: "La fecha de nacimiento es obligatoria",
                    validate: (value) => {
                      const selectedDate = new Date(value);
                      const today = new Date();

                      if (selectedDate >= today) {
                        return "La fecha debe ser anterior a hoy";
                      }

                      return true;
                    },
                  })}
                />
                {errors.birthDate ? <div className="invalid-feedback">{errors.birthDate.message}</div> : null}
              </div>
            </div>

            <div className="d-flex justify-content-end mt-4">
              <button
                type="submit"
                className="btn fw-semibold"
                disabled={isSubmitting}
                style={{
                  backgroundColor: "var(--color-primary)",
                  color: "var(--color-primary-contrast)",
                  border: "1px solid var(--color-primary)",
                }}
              >
                {isSubmitting ? "Enviando invitacion..." : "Registrar y Enviar Invitacion"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
