<template>
  <div>
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
          <strong>{{ t.fecha }} - {{ t.hora }}</strong> con {{ t.profesor }}
          <br />
          Cupo máximo: {{ t.cupo_max }}
        </div>
        <button class="btn btn-primary" @click="inscribirse(t.id)">Inscribirme</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'

// cuando haya login será userStore.user.id
const usuarioId = 3

const turnos = ref([])

onMounted(async () => {
  const { data, error } = await supabase.from('turnos').select('*')
  if (error) {
    alert('Error al cargar turnos')
    console.error(error)
    return
  }
  turnos.value = data
})

const inscribirse = async (turnoId) => {
  const { error } = await supabase.from('inscripciones').insert([
    {
      usuario_id: usuarioId,
      turno_id: turnoId,
      fecha_inscripcion: new Date().toISOString()
    }
  ])

  if (error) {
    alert('Error al inscribirse')
    console.error(error)
  } else {
    alert('✅ Inscripción exitosa')
  }
}
</script>
