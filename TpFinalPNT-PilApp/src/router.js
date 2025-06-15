// src/router.js
import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from './components/Dashboard.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: Dashboard }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})