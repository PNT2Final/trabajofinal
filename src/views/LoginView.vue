//Pedir email y contraseña al usuario.
//Llamar al método login() del userStore.
//Redireccionar al usuario si el login fue exitoso.
//Mostrar error si falla.

<template>
  <div class="login-container">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <button type="submit">Ingresar</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/userStorage'
const email = ref('')
const password = ref('')
const error = ref(null)

const router = useRouter()
const userStore = useUserStore()
// redireccionamos al usuario si ya está logueado a las vistas correspondientes.

const handleLogin = async () => {
  error.value = null
  try {
    await userStore.login(email.value, password.value)

    // 🔁 Redirige según el rol
    if (userStore.user.rol === 'administrador') {
      router.push('/admin')
    } else {
      router.push('/turnos')
    }

  } catch (err) {
    error.value = err.message
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 2rem;
  text-align: center;
  color: #ffffff;
}

input {
  display: block;
  margin: 1rem auto;
  padding: 0.5rem;
  width: 80%;
}

button {
  padding: 0.5rem 1rem;
}

.error {
  color: red;
  margin-top: 1rem;
}
</style>
