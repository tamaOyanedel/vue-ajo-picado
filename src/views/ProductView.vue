<template>
  <div class="products-page container py-4">
    <h2 class="fw-bold mb-3 text-center text-ap-primary">Productos</h2>

    <!-- Buscador -->
    <form class="row g-2 justify-content-center mb-4" @submit.prevent="onSearch">
      <div class="col-md-4 col-sm-6">
        <input
          v-model="query"
          type="text"
          class="form-control"
          placeholder="Buscar producto por nombre..."
        />
      </div>
      <div class="col-auto">
        <button class="btn btn-ajoPicado-primary" type="submit">Buscar</button>
      </div>
      <div class="col-auto">
        <button class="btn btn-ajoPicado" type="button" @click="reset">
          Reset
        </button>
      </div>
    </form>

    <!-- Cargando -->
    <div v-if="loading" class="text-center my-4">
      <div class="spinner-border text-primary"></div>
      <p class="text-muted mt-2">Cargando productos...</p>
    </div>

    <!-- Lista de productos -->
    <div v-else class="row">
      <div v-if="visibleProducts.length === 0" class="text-center text-muted py-5">
        No se encontraron productos.
      </div>
      <div v-for="p in visibleProducts" :key="p.id" class="col-md-4 mb-4">
        <ProductCard :product="p" @add="addToCart" @view="showDetails" />
      </div>
    </div>

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
import { ref, onMounted, inject, computed } from 'vue'
import API from '@/services/APIService'
import ProductCard from '@/components/ProductCard.vue'
import ProductDetailModal from '@/components/UI/ProductDetailModal.vue'

const store = inject('store')

const products = ref([])
const query = ref('')
const loading = ref(false)
const detailProduct = ref(null)

const visibleProducts = computed(() => {
  if (!query.value) return products.value
  return products.value.filter(p =>
    p.name.toLowerCase().includes(query.value.toLowerCase())
  )
})

async function fetchProducts() {
  loading.value = true
  try {
    products.value = await API.Products.all()
  } catch (err) {
    console.error('Error al cargar productos', err)
  } finally {
    loading.value = false
  }
}

function onSearch() {
  // el filtrado ya es reactivo gracias al computed
}

function reset() {
  query.value = ''
}

function addToCart(product) {
  store.addToCart(product)
}

function showDetails(product) {
  detailProduct.value = product
}

onMounted(fetchProducts)
</script>
