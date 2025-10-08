<script setup>
import { ref } from 'vue'
import Navbar from './components/UI/Navbar.vue';
import CartDetail from './components/UI/CartDetail.vue';
import Footer from './components/UI/Footer.vue';

const showCart = ref(false)

function toggleCart() {
  showCart.value = !showCart.value
}
</script>

<template>
  <div class="min-vh-100 d-flex flex-column">
    <!-- Navbar con botón del carrito -->
    <Navbar @toggle-cart="toggleCart" />

    <!-- Vista principal -->
    <main class="container-fluid p-0">
      <RouterView />
    </main>

    <!-- Footer -->
    <Footer />

    <!-- Modal del carrito -->
    <CartDetail v-if="showCart" @close="toggleCart" />
  </div>
</template>

<style>
body {
  background-color: #f8f9fa;
}
</style>