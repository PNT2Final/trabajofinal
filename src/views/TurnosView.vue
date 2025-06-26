<script setup>
import { ref, onMounted } from 'vue'
import { useUserStore } from '../store/userStorage'
import { getTurnos } from '../services/turnoService'
import { inscribirUsuario } from '../services/inscripcionService'
import { computed } from 'vue'


const userStore = useUserStore()

const turnos = ref([])
const cargando = ref(true)
const inscribiendoId = ref(null)

onMounted(async () => {
  try {
    turnos.value = await getTurnos()
  } catch (e) {
    console.error('Error al cargar turnos', e)
  } finally {
    cargando.value = false
  }
})

const inscribirse = async (turnoId) => {
  const userId = userStore.user?.id
  if (!userId) {
    alert('⚠️ Debés iniciar sesión para inscribirte.')
    return
  }

  inscribiendoId.value = turnoId  

  try {
    const ok = await inscribirUsuario(userId, turnoId)
    if (ok) {
      alert('✅ Inscripción exitosa')
    } else {
      alert('❌ Error al inscribirse, usuario ya inscripto.')
    }
  } catch (e) {
    alert('❌ Error inesperado')
    console.error(e)
  } finally {
    inscribiendoId.value = null
  }

}

const turnosFuturos = computed(() => {
  const hoy = new Date().toISOString().split('T')[0] // formato YYYY-MM-DD
  return turnos.value.filter(t => t.fecha >= hoy)
})
</script>

<template>
  <div class="container my-5">
    <h2 class="mb-4 text-center">📅 Turnos Disponibles</h2>

    <div v-if="cargando" class="text-center">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
    </div>

    <div v-else-if="turnos.length === 0" class="alert alert-info text-center">
      No hay turnos disponibles por el momento.
    </div>

    <div class="d-flex flex-column gap-3" v-else>
      <div
        class="card flex-row align-items-center justify-content-between px-4 py-3 shadow-sm"
        v-for="t in turnosFuturos"
        :key="t.id"
      >
        <div class="d-flex align-items-center flex-grow-1">
          <div class="me-4 text-center" style="min-width: 140px;">
            <h5 class="mb-1">{{ t.fecha }}</h5>
            <small class="text-muted">{{ t.hora }}</small>
          </div>

          <div class="me-4">
            <strong>Profesor:</strong> {{ t.profesor }}
          </div>

          <div>
            <strong>Cupo máx.:</strong> {{ t.cupo_maximo }}
          </div>
        </div>

        <button
          class="btn btn-outline-primary"
          :disabled="inscribiendoId === t.id"
          @click="inscribirse(t.id)"
        >
          {{ inscribiendoId === t.id ? 'Inscribiendo...' : 'Inscribirme' }}
        </button>
      </div>
    </div>
  </div>
</template>

