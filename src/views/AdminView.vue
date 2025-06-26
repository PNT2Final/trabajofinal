<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'
import { getUsuarios } from '../services/usuarioService'
import { getTurnos, eliminarTurno } from '../services/turnoService'
import { getInscripciones } from '../services/inscripcionService'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/userStorage'

const router = useRouter()
const userStore = useUserStore()

const tabActual = ref('usuarios')
const usuarios = ref([])
const turnos = ref([])
const inscripciones = ref([])

onBeforeMount(() => {
  const user = userStore.user

  if (!user) return router.replace('/login')
  if (user.rol !== 'administrador') return router.replace('/denegado')
})

onMounted(async () => {
  usuarios.value = await getUsuarios()
  turnos.value = await getTurnos()
  inscripciones.value = await getInscripciones()
})

const eliminar = async (id) => {
  if (confirm('¿Estás seguro de eliminar este turno?')) {
    try {
      await eliminarTurno(id)
      turnos.value = turnos.value.filter(t => t.id !== id)
      alert('🗑️ Turno eliminado correctamente')
    } catch (e) {
      alert('❌ Error al eliminar turno')
      console.error(e)
    }
  }
}

function editar(id) {
  router.push(`/${id}/editar`)
}

function nuevo() {
  router.push(`/nuevo`)
}
</script>

<template>
  <div class="container mt-4">
    <h2 class="mb-4">Panel de Administración</h2>

    <ul class="nav nav-tabs">
      <li class="nav-item">
        <button class="nav-link" :class="{ active: tabActual === 'usuarios' }" @click="tabActual = 'usuarios'">Usuarios</button>
      </li>
      <li class="nav-item">
        <button class="nav-link" :class="{ active: tabActual === 'turnos' }" @click="tabActual = 'turnos'">Turnos</button>
      </li>
      <li class="nav-item">
        <button class="nav-link" :class="{ active: tabActual === 'inscripciones' }" @click="tabActual = 'inscripciones'">Inscripciones</button>
      </li>
    </ul>

    <div class="mt-4">
      <!-- USUARIOS -->
      <div v-if="tabActual === 'usuarios'">
        <h4>Usuarios</h4>
        <table class="table table-striped table-bordered">
          <thead class="table-light">
            <tr><th>Nombre</th><th>Email</th></tr>
          </thead>
          <tbody>
            <tr v-for="u in usuarios" :key="u.id">
              <td>{{ u.nombre }}</td>
              <td>{{ u.email }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- TURNOS -->
      <div v-if="tabActual === 'turnos'">
        <h4>Turnos</h4>
        <table class="table table-striped table-bordered">
          <thead class="table-light">
            <tr><th>Fecha</th><th>Hora</th><th>Profesor</th><th>Cupo Máximo</th><th>Acciones</th></tr>
          </thead>
          <tbody>
            <tr v-for="t in turnos" :key="t.id">
              <td>{{ t.fecha }}</td>
              <td>{{ t.hora }}</td>
              <td>{{ t.profesor }}</td>
              <td>{{ t.cupo_maximo }}</td>
              <td>
                <button class="btn btn-sm btn-warning me-2" @click="editar(t.id)">Editar</button>
                <button class="btn btn-sm btn-danger" @click="eliminar(t.id)">Eliminar</button>
              </td>
            </tr>
          </tbody>
        </table>
        <button class="btn btn-success mt-3" @click="nuevo()">➕ Añadir nueva sesión</button>
      </div>

      <!-- INSCRIPCIONES -->
      <div v-if="tabActual === 'inscripciones'">
        <h4>Inscripciones</h4>
        <table class="table table-striped table-bordered">
          <thead class="table-light">
            <tr>
              <th>Usuario</th>
              <th>Email</th>
              <th>Fecha del Turno</th>
              <th>Hora</th>
              <th>Profesor</th>
              <th>Fecha de inscripción</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="i in inscripciones" :key="i.id">
              <td>{{ i.usuarios?.nombre || 'Desconocido' }}</td>
              <td>{{ i.usuarios?.email || 'No disponible' }}</td>
              <td>{{ i.turnos?.fecha || 'Sin datos' }}</td>
              <td>{{ i.turnos?.hora || '-' }}</td>
              <td>{{ i.turnos?.profesor || '-' }}</td>
              <td>{{ new Date(i.fecha_inscripcion).toLocaleString() }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>