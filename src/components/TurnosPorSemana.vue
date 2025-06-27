<template>
  <div class="p-3 bg-white rounded shadow-sm">
    <h5 class="mb-3" style="font-weight:600;">
      📅 Turnos por semana
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

function agruparTurnosPorSemana(turnos) {
  const semanas = {}
  turnos.forEach(turno => {
    const fecha = new Date(turno.fecha)
    const year = fecha.getFullYear()
    const week = getWeekNumber(fecha)
    const key = `${year}-S${week}`
    semanas[key] = (semanas[key] || 0) + 1
  })
  return semanas
}

function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  const dayNum = d.getUTCDay() || 7
  d.setUTCDate(d.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1))
  return Math.ceil((((d - yearStart) / 86400000) + 1)/7)
}

onMounted(async () => {
  const turnos = await getTurnos()
  const agrupados = agruparTurnosPorSemana(turnos)
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
          text: 'Turnos por semana',
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
          title: { display: true, text: 'Semana', font: { size: 16 } },
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