<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getById, updateById, create } from '../services/turnoService.js'
import { useUserStore } from '../store/userStorage.js'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const turno = ref({
  id: null,
  fecha: '',
  hora: '',
  profesor: '',
  cupo_maximo: null,
  creado_por: userStore.user?.id || null
})

const esEdicion = ref(false)

onMounted(async () => {
  const id = route.params.id
  if (id) {
    esEdicion.value = true
    const data = await getById(id)
     turno.value.id = id
    turno.value.fecha = data.fecha
    turno.value.hora = data.hora
    turno.value.profesor = data.profesor
    turno.value.cupo_maximo = data.cupo_maximo ?? 1
    turno.value.creado_por = data.creado_por
    turno.value.creado_en = data.creado_en

    if (turno.value.hora?.length === 8) {
      turno.value.hora = turno.value.hora.slice(0, 5) // "HH:MM:SS" -> "HH:MM"
    }
  }
})

const guardar = async () => {
  try {
    const hoy = new Date().toISOString().split('T')[0] // YYYY-MM-DD

    if (turno.value.fecha < hoy) {
      alert('❌ La fecha del turno no puede ser anterior a hoy.')
      return
    }

    const horaFormateada = turno.value.hora.length === 5
      ? turno.value.hora + ':00'
      : turno.value.hora

    const turnoData = {
      fecha: turno.value.fecha,
      hora: horaFormateada,
      profesor: turno.value.profesor,
      cupo_maximo: turno.value.cupo_maximo
    }

    if (esEdicion.value) {
      await updateById(turno.value.id, turnoData)
      alert('✅ Turno actualizado correctamente')
    } else {
      await create({
        ...turnoData,
        creado_por: userStore.user.id
      })
      alert('✅ Turno creado correctamente')
    }

    router.push('/admin')
  } catch (e) {
    alert('❌ Error al guardar el turno')
    console.error(e)
  }
}

</script>

<template>
  <div class="container mt-4">
    <h3>{{ esEdicion ? 'Editar Turno' : 'Crear Turno' }}</h3>

    <form @submit.prevent="guardar()" class="mt-3">
      <div class="mb-3">
        <label class="form-label">Fecha</label>
        <input type="date" class="form-control" v-model="turno.fecha" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Hora</label>
        <input type="time" class="form-control" v-model="turno.hora" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Profesor</label>
        <input type="text" class="form-control" v-model="turno.profesor" required />
      </div>

      <div class="mb-3">
        <label class="form-label">Cupo máximo</label>
        <input type="number" class="form-control" v-model.number="turno.cupo_maximo" required min="1" />
      </div>

     

      <button type="submit" class="btn btn-primary">
        {{ esEdicion ? 'Actualizar' : 'Crear' }}
      </button>

    </form>
  </div>
</template>