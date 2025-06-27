<script setup>
import { ref, onMounted } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'
import { getInscripciones } from '../services/inscripcionService'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const dataPorProfesor = ref({
  labels: [],
  datasets: [
    {
      label: 'Cantidad de Inscripciones por Profesor',
      backgroundColor: '#8884d8',
      data: [],
    },
  ],
})

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      beginAtZero: true,
      ticks: { stepSize: 1 },
    },
  },
}

onMounted(async () => {
  const inscripciones = await getInscripciones()

  const agrupadas = inscripciones.reduce((acc, insc) => {
    const profesor = insc.turnos?.profesor || 'Sin profesor'
    acc[profesor] = (acc[profesor] || 0) + 1
    return acc
  }, {})

  dataPorProfesor.value.labels = Object.keys(agrupadas)
  dataPorProfesor.value.datasets[0].data = Object.values(agrupadas)
})
</script>

<template>
  <div class="grafico-container" style="height: 300px;">
    <h5 class="mb-3 text-center">📊 Inscripciones por Profesor</h5>
    <Bar v-if="dataPorProfesor.labels.length" :data="dataPorProfesor" :options="options" />
    <p v-else class="text-center">Cargando datos...</p>
  </div>
</template>

<style scoped>
.grafico-container {
  background-color: #f8f9fa;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}
</style>