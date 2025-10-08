<template>
  <div
    class="modal fade show d-block"
    tabindex="-1"
    role="dialog"
    @click.self="close"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg" role="document">
      <div class="modal-content border-0 shadow-lg rounded-3">
        <div class="modal-header bg-light">
          <h3 class="modal-title fw-bold text-ap-primary">{{ product?.name || 'Producto' }}</h3>
          <button type="button" class="btn-close btn-close" @click="close"></button>
        </div>

        <div class="modal-body">
          <div class="row align-items-center">
            <div class="col-md-5 text-center">
              <img
                :src="product?.image"
                class="img-fluid rounded mb-3"
                alt="Imagen del producto"
                style="max-height: 250px; object-fit: cover;"
              />
            </div>

            <div class="col-md-7">
              <p class="mb-2">{{ product?.description || 'Sin descripción disponible' }}</p>
              <h4 class="fw-bold">{{ formattedPrice }}</h4>
              <p :class="{'text-ap-primary': product?.stock > 0, 'text-ap-terciary': product?.stock === 0}">
                Stock: {{ product?.stock > 0 ? product.stock : 'Agotado' }}
              </p>

              <!-- Calificación promedio -->
              <div class="mt-3">
                <strong>Calificación: </strong>
                <span v-for="n in 5" :key="n" class="text-warning">
                  <i :class="n <= averageRating ? 'bi bi-star-fill' : 'bi bi-star'"></i>
                </span>
                <small class="text-muted">( {{ averageRating.toFixed(1) }} / 5 )</small>
              </div>

              <!-- Controles de cantidad y agregar -->
              <div class="d-flex align-items-center mt-3">
                <input
                  v-model.number="quantity"
                  type="number"
                  class="form-control me-3"
                  min="1"
                  :max="product?.stock"
                  style="width: 100px;"
                />
                <button
                  class="btn btn-ajoPicado-primary"
                  :disabled="product?.stock === 0"
                  @click="addToCartAndClose"
                >
                  <i class="bi bi-cart-plus"></i> Agregar al carrito
                </button>
              </div>
            </div>
          </div>

          <hr />

          <!-- Sección de reseñas -->
          <div>
            <h6 class="fw-bold mb-2">Reseñas de usuarios</h6>
            <div v-if="reviews.length" class="list-group">
              <div
                v-for="(r, index) in reviews"
                :key="index"
                class="list-group-item border-0 border-bottom"
              >
                <div class="d-flex justify-content-between align-items-center">
                  <strong>{{ r.autor }}</strong>
                  <div class="text-warning small">
                    <i
                      v-for="n in 5"
                      :key="n"
                      :class="n <= r.estrellas ? 'bi bi-star-fill' : 'bi bi-star'"
                    ></i>
                  </div>
                </div>
                <p class="mb-1 text-muted">{{ r.comentario }}</p>
              </div>
            </div>
            <p v-else class="text-muted">Aún no hay reseñas.</p>
          </div>
        </div>

        <div class="modal-footer bg-light">
          <button type="button" class="btn btn-ajoPicado" @click="close">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, watch, computed } from 'vue'

const store = inject('store')
const props = defineProps({
  product: Object,
  show: Boolean
})
const emit = defineEmits(['close'])

const quantity = ref(1)

// Mock de reseñas (en un caso real, vendrían de la API)
const reviews = ref([
  { autor: 'María G.', estrellas: 5, comentario: 'Excelente calidad, muy recomendable.' },
  { autor: 'José P.', estrellas: 4, comentario: 'Buen producto, llegó a tiempo.' },
])

// Calcular promedio de calificación
const averageRating = computed(() => {
  if (!reviews.value.length) return 0
  const total = reviews.value.reduce((sum, r) => sum + r.estrellas, 0)
  return total / reviews.value.length
})

// Formatear precio
const formattedPrice = computed(() => {
  const price = props.product?.price
  return price
    ? price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })
    : '—'
})

// Cerrar modal
function close() {
  emit('close')
}

// Agregar producto al carrito
function addToCartAndClose() {
  if (props.product && quantity.value > 0) {
    store.addToCart(props.product, quantity.value)
    emit('close')
  }
}

// Reinicia cantidad al abrir
watch(() => props.show, (val) => {
  if (val) quantity.value = 1
})
</script>