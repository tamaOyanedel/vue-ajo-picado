<template>
  <!-- Carousel -->
  <HeroCarousel />

  <div class="container py-4">

    <!-- Bienvenida -->
    <section class="text-center">
      <h1 class="fw-bold text-ap-primary">Bienvenido a Ajo Picado</h1>
      <p class="text-muted pb-5">
        Encuentra las mejores <strong>encuadernaciones artesanales</strong> y participa
        en nuestros <strong>talleres creativos</strong>.
      </p>
      <hr>
    </section>

    <!-- Productos destacados -->
    <section class="featured my-5">
      <h3 class="my-5 text-center text-secondary">Destacados</h3>

      <div class="row">
        <div v-for="p in featured" :key="p.id" class="col-md-4 mb-4">
          <ProductCard :product="p" @add="addToCart" @view="showDetails" />
        </div>
      </div>
      <RouterLink to="/products" class="btn btn-ajoPicado-primary mt-3">
        Ver todos los productos
      </RouterLink>
    </section>

    <!-- Modal Detalle -->
    <ProductDetailModal
      v-if="detailProduct"
      :show="!!detailProduct"
      :product="detailProduct"
      @close="detailProduct = null"
    />
    
  </div>
</template>

<script setup>
import { ref, inject, onMounted } from "vue";
import API from "../services/APIService";
import HeroCarousel from "@/components/UI/HeroCarousel.vue";
import ProductCard from "@/components/ProductCard.vue";
import ProductDetailModal from "@/components/UI/ProductDetailModal.vue";

const store = inject('store')
const featured = ref([])
const detailProduct = ref(null)

onMounted(async () => {
  const products = await API.Products.all()
  featured.value = products.slice(0, 3) // los 3 primeros como destacados
})

function addToCart(product) {
  store.addToCart(product)
}

function showDetails(product) {
  detailProduct.value = product
}
</script>