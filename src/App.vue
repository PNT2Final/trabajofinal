<script setup>
import Navbar from './components/navBar.vue'
import Footer from './components/footer.vue'
</script>

<template>
  <Navbar />
  <main class="container my-4">
    <router-view />
  </main>
  <Footer />
</template>

