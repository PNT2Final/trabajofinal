import { createRouter, createWebHistory } from 'vue-router'
import AdminView from './views/AdminView.vue'
import TurnosView from './views/TurnosView.vue'

const routes = [
  { path: '/', redirect: '/admin' },
  { path: '/admin', component: AdminView },
  { path: '/turnos', component: TurnosView }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

