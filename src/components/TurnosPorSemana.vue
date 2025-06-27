<template>
  <div class="p-3 bg-white rounded shadow-sm">
    <h5 class="mb-3" style="font-weight:600;">
      📅 Turnos por mes
    </h5>
    <canvas ref="chartCanvas" height="180"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Chart } from 'chart.js'
import { getTurnos } from '../services/turnoService'
import ChartDataLabels from 'chartjs-plugin-datalabels'
Chart.register(ChartDataLabels)

const chartCanvas = ref(null)

// Agrupa los turnos por mes (ej: 2025-06)
function agruparTurnosPorMes(turnos) {
  const meses = {}
  turnos.forEach(turno => {
    const fecha = new Date(turno.fecha)
    const year = fecha.getFullYear()
    const month = String(fecha.getMonth() + 1).padStart(2, '0') // Mes en formato 01, 02, ...
    const key = `${year}-${month}`
    meses[key] = (meses[key] || 0) + 1
  })
  return meses
}

onMounted(async () => {
  const turnos = await getTurnos()
  const agrupados = agruparTurnosPorMes(turnos)
  const labels = Object.keys(agrupados)
  const data = Object.values(agrupados)

  new Chart(chartCanvas.value, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label: 'Cantidad de turnos',
        data,
        backgroundColor: 'rgba(40, 167, 69, 0.5)',
        borderColor: '#28a745',
        borderWidth: 1.5,
        borderRadius: 8,
        barPercentage: 0.4,
        categoryPercentage: 0.5,
      }]
    },
    options: {
      indexAxis: 'y',
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Turnos por mes',
          font: { size: 20 }
        },
        tooltip: {
          backgroundColor: '#222',
          titleColor: '#fff',
          bodyColor: '#fff',
          borderColor: '#28a745',
          borderWidth: 1,
          callbacks: {
            label: ctx => ` ${ctx.parsed.x} turnos`
          }
        },
        datalabels: {
          anchor: 'end',
          align: 'right',
          color: '#222',
          font: { weight: 'bold', size: 16 }
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          grid: { color: '#e5e5e5' },
          title: { display: true, text: 'Cantidad de turnos', font: { size: 16 } },
          ticks: {
            color: '#222',
            font: { size: 14 },
            stepSize: 1,
            callback: function(value) {
              return Number.isInteger(value) ? value : null
            }
          }
        },
        y: {
          grid: { display: false },
          title: { display: true, text: 'Mes', font: { size: 16 } },
          ticks: { color: '#222', font: { size: 14 } }
        }
      },
      animation: {
        duration: 1200,
        easing: 'easeOutCubic'
      }
    },
    plugins: [ChartDataLabels]
  })
})
</script>

<style scoped>
.bg-white {
  background: #fff;
}
</style>