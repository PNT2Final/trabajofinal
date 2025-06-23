<script setup>
import Navbar from './components/navBar.vue'
import Footer from './components/footer.vue'
</script>

<template>
  <div id="app">
    <Navbar />
    
    <main  id="main-app">
      <router-view />
    </main>

    <Footer />
  </div>
</template>

<style scoped>
#app {
  display: flex;
  flex-direction: column; 
  min-height: calc(100vh - 1rem); 
}

main {
  flex-grow: 1; 
  width: 100%;
  max-width: 1280px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
                     url('./assets/images/pilates4.png'); 
  background-size: cover; 
  background-position: center center; 
  background-repeat: no-repeat; 
  background-attachment: fixed;
  margin:0 auto;
}

</style>

