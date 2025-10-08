<template>
  <footer class="bg-ap-light text-light mt-auto py-4">
    <div class="container text-center">
      <div class="mb-3">
        <RouterLink to="/home" class="text-decoration-none text-light fw-bold fs-5">
          <img src="/src/assets/images/logo/logo_color2.png" alt="Logo Ajo Picado" class="logo-ajoPicado">
        </RouterLink>
      </div>

      <div class="d-flex justify-content-center gap-3 mb-3">
        <RouterLink class="text-ap-primary text-decoration-none small" to="/products">Productos</RouterLink>
        <a
          href="https://www.instagram.com/ajo.picado/"
          target="_blank"
          rel="noopener noreferrer"
          class="text-ap-primary small text-decoration-none"
        >
          <i class="bi bi-instagram"></i> Instagram
        </a>
      </div>

      <p class="small text-ap-white mb-0">
        © {{ new Date().getFullYear() }} Ajo Picado — Encuadernaciones y Talleres.
      </p>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
footer {
  border-top: 2px solid rgba(255, 255, 255, 0.1);
  letter-spacing: 0.3px;
}
</style>
