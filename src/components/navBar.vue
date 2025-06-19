<script setup>
import { ref } from 'vue'

// Temporal simulamos un usuario con rol
// Después se reemplaza por: `import { useUserStore } from '../stores/userStore'`
const user = ref({
  nombre: 'Guada',
  rol: 'usuario' // cambiar a 'administrador' para testear
})
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">PilApp</router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <!-- Solo para usuarios comunes -->
          <li class="nav-item" v-if="user.rol === 'usuario'">
            <router-link class="nav-link" to="/turnos">Turnos</router-link>
          </li>

          <!-- Solo para administradores -->
          <li class="nav-item" v-if="user.rol === 'administrador'">
            <router-link class="nav-link" to="/admin">Admin</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>


