<template>
  <footer class="bg-dark text-white text-center py-4 mt-5">
    <div class="container" id="footer-container">
      <p class="mb-1">© 2025 Todos los derechos reservados.</p>
      <small>
        <a href="#" class="text-white text-decoration-none me-3">Términos</a>
        <a href="#" class="text-white text-decoration-none me-3">Privacidad</a>
        <a href="#" class="text-white text-decoration-none">Contacto</a>
      </small>
    </div>
  </footer>
</template>

<style scoped>
#footer-container {
  display: flex; 
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
}

#footer-container p {
  margin-bottom: 0; 
}

#footer-container small {
  display: flex; 
  gap: 1rem; 
}
</style>