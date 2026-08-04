# Contexto del Proyecto: Sistema de Contabilidad (Enfoque Frontend)

Estamos iniciando un proyecto en React desde cero. El enfoque principal en esta fase es la estructura de carpetas, la maquetación visual basada en AdminLTE y la fluidez de las interfaces.

## Stack Tecnológico & Arquitectura
- **Frontend:** React (Componentes funcionales y Hooks).
- **Enrutamiento:** `react-router-dom` para la navegación (Login, Dashboard, Perfil, Usuarios).
- **Manejo de Estado:** `Context API` nativo de React para autenticación y configuración global.
- **Formularios:** `React Hook Form` para la captura y validación de datos.
- **Estilos & UI:** Bootstrap 5 (recreando el layout de AdminLTE de forma modular). La aplicación debe utilizar Variables CSS globales para permitir una plantilla configurable con colores dinámicos (Ej: colores corporativos contables como Azul Marino, Grises y un Verde de acento).

## Funcionalidades Clave del Módulo Inicial

1. **Pantalla de Autenticación (Login):**
   - Primera pantalla expuesta al usuario.
   - Campos: `username` o `email` (permitir ambos) y contraseña.

2. **Panel de Administración de Usuarios (Rol Admin):**
   - Vista para registrar nuevos usuarios con los campos: Nombre, Apellido, Username, Email, País, Ciudad, Dirección y Fecha de nacimiento.
   - Flujo UI: Simular visualmente el envío de una invitación por correo para que el nuevo usuario defina su contraseña.

3. **Gestión de Perfil de Usuario:**
   - Sección para que cada usuario edite sus datos, suba foto de perfil, agregue descripción y actualice su contraseña.

## Directrices para las Respuestas de Copilot
- Generar componentes altamente modulares (ej: `<Sidebar />`, `<Header />`, `<Layout />`, `<Card />`).
- Implementar formularios utilizando estrictamente los métodos y componentes de `React Hook Form`.
- Estructurar el CSS o estilos usando variables nativas (`:root`) para facilitar el cambio de temas y colores globales de la interfaz.
- Priorizar la maquetación semántica y limpia antes de escribir lógica compleja de conexión a endpoints backend.