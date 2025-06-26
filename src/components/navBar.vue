<script setup>
// Traemos al usuario real desde el store y su rol.
import { useUserStore } from '../store/userStorage'
import { useRouter, useRoute } from 'vue-router'

const userStore = useUserStore()
const user = userStore.user
const router = useRouter()
const route = useRoute()

const logout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <nav class="navbar navbar-expand-lg">
    <div class="container-fluid align-items-center contenidoNav">
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
          <li class="nav-item" v-if="user?.rol === 'usuario'">
            <router-link class="nav-link" to="/turnos">Turnos</router-link>
          </li>

          <!-- Solo para administradores -->
          <li class="nav-item" v-if="user?.rol === 'administrador'">
            <router-link class="nav-link" to="/admin">Admin</router-link>
          </li>

          <!-- Botón de logout (no se muestra en /login) -->
          <li class="nav-item" v-if="route.path !== '/login'">
            <button @click="logout" class="btn btn-outline-dark ms-2">Cerrar sesión</button>
          </li>

        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav .nav-link {
  color: var(--primary-purple);
}


nav{
  background-color: var(--gris-claro);
  min-height: 60px;
  display: flex;
  align-items: center;
}


</style>
