import { defineStore } from 'pinia'
import { supabase } from '../supabase'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null
  }),
  actions: {
    async login(email, password) {
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('email', email)
        .eq('contraseña', password)
        .single()

      if (error || !data) {
        throw new Error('Credenciales incorrectas')
      }

      this.user = data
      localStorage.setItem('user', JSON.stringify(data))
    },

    logout() {
      this.user = null
      localStorage.removeItem('user')
    },

    cargarUsuarioDesdeLocalStorage() {
      const usuarioGuardado = localStorage.getItem('user')
      if (usuarioGuardado) {
        this.user = JSON.parse(usuarioGuardado)
      }
    }
  },
})
