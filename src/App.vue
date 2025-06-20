<script setup>
import Navbar from './components/navBar.vue'
import Footer from './components/footer.vue'
</script>

<template>
  <div id="app">
    <Navbar />
    
    <main class="container my-4">
      <router-view />
    </main>

    <Footer />
  </div>
</template>


