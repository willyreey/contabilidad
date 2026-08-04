import { Head } from "@inertiajs/react";
import AppLayout from "../Layouts/AppLayout";

export default function Dashboard() {
  return (
    <AppLayout>
      <Head title="Dashboard" />

      <section>
        <h2 className="h4 fw-bold mb-2">Dashboard</h2>
        <p className="mb-0" style={{ color: "var(--color-text-muted)" }}>
          Bienvenido al panel principal del sistema contable.
        </p>
      </section>
    </AppLayout>
  );
}
