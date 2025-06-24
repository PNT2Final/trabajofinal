<script setup>
import { ref, onMounted } from 'vue'
import { getTurnos } from '../services/turnoService'
import { inscribirUsuario } from '../services/inscripcionService'

const usuarioId = 6

const turnos = ref([])

onMounted(async () => {
  turnos.value = await getTurnos()
})

const inscribirse = async (turnoId) => {
  const ok = await inscribirUsuario(usuarioId, turnoId)
  if (ok) alert('✅ Inscripción exitosa')
  else alert('Error al inscribirse')
}
</script>

<template>
  <div class="container my-4">
    <h2 class="mb-4">Turnos Disponibles</h2>

    <div v-if="turnos.length === 0">
      <p>No hay turnos disponibles.</p>
    </div>

    <ul class="list-group">
      <li
        v-for="t in turnos"
        :key="t.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <div>
          <strong>{{ t.fecha }} - {{ t.hora }}</strong> con {{ t.profesor }}<br />
          Cupo máximo: {{ t.cupo_max }}
        </div>
        <button class="btn btn-primary" @click="inscribirse(t.id)">
          Inscribirme
        </button>
      </li>
    </ul>
  </div>
</template>