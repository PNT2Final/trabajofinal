import { createRouter, createWebHistory } from 'vue-router'
import AdminView from './views/AdminView.vue'
import TurnosView from './views/TurnosView.vue'
import LoginView from './views/LoginView.vue'
import { useUserStore } from './store/userStorage'
import AccesoDenegado from './views/AccesoDenegado.vue'
import NoSeEncontroElSitioView from './views/NoSeEncontroElSitioView.vue'
import FormPost from './components/FormPost.vue'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: LoginView },
  { path: '/admin', component: AdminView },
  { path: '/turnos', component: TurnosView },
  { path: '/denegado', component: AccesoDenegado },
  { path: '/:id/editar', component: FormPost },
  { path: '/nuevo', component: FormPost },
  //truquito ruta comodin que captura cualquier utl que no coincida con las anteriores
  { path: '/:pathMatch(.*)*', component: NoSeEncontroElSitioView }

  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 🛡️ Guardia con validación por rol
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  // Cargar el usuario desde localStorage al iniciar la navegación, nos aseguramos qye si se refresca la página, el userStore vuelve a tener el usuario antes de que se valide la ruta.
  userStore.cargarUsuarioDesdeLocalStorage()

  const user = userStore.user

  const rutasProtegidas = ['/admin', '/turnos', '/denegado']
  const requiereAuth = rutasProtegidas.includes(to.path)

  if (requiereAuth && !user) {
    return next('/login')
  }
  if (to.path === '/admin' && user?.rol !== 'administrador') {
    return next('/denegado')
  }
  if (to.path === '/admin' && user?.rol !== 'administrador') {
    return next('/turnos')
  }

  next()
})

export { router }
