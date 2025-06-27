<script setup>
import Navbar from './components/navBar.vue'
import Footer from './components/footer.vue'
import {useRoute} from 'vue-router'

const route = useRoute()
</script>

<template>
  <div id="app">
    <Navbar />
    
    <main  id="main-app" :class="{ 'login-background': route.path === '/login' }">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* El cuerpo completo ocupa al menos el alto de la ventana */
}

main {
  flex: 1; /* Esto le da al main todo el espacio disponible, empujando el footer al fondo */
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0;
}

#main-app.login-background {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url('./assets/images/pilates4.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  width: 100%;
  height: 100%;
}

footer {
  background-color: #111;
  color: white;
  text-align: center;
  padding: 1rem 0;
  flex-shrink: 0; /* impide que el footer se encoja */
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

</style>

