# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).

# 🛡️ Feature: Autenticación con Pinia y Control de Acceso por Rol

Este módulo implementa la lógica de login, autenticación, persistencia de sesión y control de acceso por rol utilizando **Vue 3**, **Pinia**, y **Supabase** como backend.

---

## 📌 Tecnologías utilizadas

- **Vue 3**
- **Pinia** (gestión de estado)
- **pinia-plugin-persistedstate** (persistencia en localStorage)
- **Vue Router** (ruteo y protección de vistas)
- **Supabase** (backend y autenticación por tabla `usuarios`)

---

## ✅ Funcionalidades implementadas

- Login de usuario con validación de credenciales en Supabase.
- Guardado del usuario autenticado (y su rol) en el store de Pinia.
- Persistencia de sesión con `localStorage`.
- Redirección dinámica post-login:
  - Usuarios con rol `administrador` → `/admin`
  - Usuarios con rol `usuario` → `/turnos`
- Rutas protegidas por autenticación:
  - `/admin` y `/turnos` requieren usuario logueado.
- Control de acceso por rol:
  - Solo usuarios con rol `administrador` pueden acceder a `/admin`.
  - El resto será redirigido a `/denegado`.
- Vista de **"Acceso Denegado"** (`/denegado`) para usuarios sin permisos.
- Ruta **catch-all** (`/:pathMatch(.*)*`) que redirige a la vista `NoSeEncontroElSitioView.vue` para URLs inexistentes.
- Navbar dinámica según el rol del usuario:
  - Muestra los accesos permitidos según su perfil.
  - Oculta el botón de "Cerrar sesión" en la vista de login.

---

## 🧪 Cómo probar esta feature

1. Iniciar sesión en `/login` con credenciales válidas desde la tabla `usuarios` de Supabase.
2. Verificar redirección automática según el rol.
3. Acceder manualmente a rutas protegidas (ej: `/admin`) con distintos usuarios.
4. Intentar ingresar a rutas inexistentes (ej: `/cualquiercosa`) y ver la pantalla personalizada.
5. Observar la navbar: cambia dinámicamente según el tipo de usuario.

---

## 📁 Estructura relevante

src/
├── views/
│ ├── LoginView.vue
│ ├── AdminView.vue
│ ├── TurnosView.vue
│ ├── AccesoDenegado.vue
│ └── NoSeEncontroElSitioView.vue
├── store/
│ └── userStorage.js
├── router.js
└── components/
└── navBar.vue
