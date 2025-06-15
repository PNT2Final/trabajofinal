<!-- src/views/Dashboard.vue -->
<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'

const usuarios = ref([])
const turnos = ref([])
const inscripciones = ref([])

const getUsuarios = async () => {
  const { data, error } = await supabase.from('usuarios').select('*')
  if (error) {
    alert('Error al traer usuarios')
    console.error(error)
    return
  }
  usuarios.value = data
}

const getTurnos = async () => {
  const { data, error } = await supabase.from('turnos').select('*')
  if (error) {
    alert('Error al traer turnos')
    console.error(error)
    return
  }
  turnos.value = data
}

const getInscripciones = async () => {
  const { data, error } = await supabase.from('inscripciones').select('*')
  if (error) {
    alert('Error al traer inscripciones')
    console.error(error)
    return
  }
  inscripciones.value = data
}
</script>

<template>
  <div class="card">
    <h2 class="mb-4">Panel Supabase</h2>
    <div class="space-x-2 mb-4">
      <button @click="getUsuarios">Ver Usuarios</button>
      <button @click="getTurnos">Ver Turnos</button>
      <button @click="getInscripciones">Ver Inscripciones</button>
    </div>

    <div v-if="usuarios.length">
      <h3>Usuarios</h3>
      <ul>
        <li v-for="u in usuarios" :key="u.id">{{ u.nombre }} ({{ u.email }})</li>
      </ul>
    </div>

    <div v-if="turnos.length">
      <h3>Turnos</h3>
      <ul>
        <li v-for="t in turnos" :key="t.id">
          {{ t.fecha }} - {{ t.hora }} con {{ t.profesor }} (Cupo: {{ t.cupo_max }})
        </li>
      </ul>
    </div>

    <div v-if="inscripciones.length">
      <h3>Inscripciones</h3>
      <ul>
        <li v-for="i in inscripciones" :key="i.id">
          Usuario: {{ i.usuario_id }} - Turno: {{ i.turno_id }} ({{ i.fecha_inscripcion }})
        </li>
      </ul>
    </div>
  </div>
</template>