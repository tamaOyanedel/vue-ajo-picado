<template>
  <!-- Modal / Popup del carrito -->
  <div
    class="modal fade show d-block"
    tabindex="-1"
    aria-labelledby="cartModalLabel"
    aria-modal="true"
    role="dialog"
    @click.self="$emit('close')"
  >
    <div class="modal-dialog modal-lg modal-dialog-centered">
      <div class="modal-content shadow-lg border-0 rounded-3">
        <div class="modal-header bg-light">
          <h5 class="modal-title fw-bold" id="cartModalLabel">Carrito</h5>
          <button
            type="button"
            class="btn-close"
            aria-label="Cerrar"
            @click="$emit('close')"
          ></button>
        </div>

        <div class="modal-body" v-if="cart.length > 0">
          <table class="table align-middle">
            <thead>
              <tr>
                <th>Producto</th>
                <th class="text-center">Cantidad</th>
                <th class="text-end">Precio</th>
                <th class="text-end">Subtotal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in cart" :key="item.product.id">
                <td>
                  <strong>{{ item.product.name }}</strong><br />
                  <small class="text-muted">{{ item.product.description }}</small>
                </td>
                <td class="text-center" style="width: 120px;">
                  <input
                    type="number"
                    min="1"
                    :max="item.product.stock"
                    v-model.number="item.quantity"
                    @change="updateQuantity(item)"
                    class="form-control form-control-sm text-center"
                  />
                </td>
                <td class="text-end">{{ formatPrice(item.product.price) }}</td>
                <td class="text-end">{{ formatPrice(item.product.price * item.quantity) }}</td>
                <td class="text-end">
                  <button
                    class="btn btn-sm btn-ajoPicado"
                    @click="removeItem(item.product.id)"
                  >
                    <i class="bi bi-trash"></i> Quitar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <div class="d-flex justify-content-between align-items-center mt-3">
            <button class="btn btn-ajoPicado" @click="clearCart">
              Vaciar carrito
            </button>
            <h5 class="fw-bold mb-0">
              Total: {{ formatPrice(total) }}
            </h5>
          </div>
        </div>

        <div class="modal-body text-center" v-else>
          <p class="text-muted mb-0">Tu carrito está vacío</p>
        </div>

        <div class="modal-footer bg-light">
          <button class="btn btn-ajoPicado" @click="$emit('close')">Cerrar</button>
          <button
            class="btn btn-ajoPicado-primary"
            :disabled="cart.length === 0"
            @click="checkout"
          >
            Pagar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, computed } from 'vue'

const store = inject('store')

// Lista reactiva del carrito
const cart = computed(() => store.state.cart)

// Total del carrito
const total = computed(() => store.getCartTotal())

// Actualiza cantidad
function updateQuantity(item) {
  if (item.quantity < 1) item.quantity = 1
  store.updateQuantity(item.product.id, item.quantity)
}

// Eliminar producto
function removeItem(id) {
  store.removeFromCart(id)
}

// Vaciar carrito
function clearCart() {
  if (confirm('¿Deseas vaciar el carrito?')) {
    store.clearCart()
  }
}

// Simulación de pago
function checkout() {
  alert('Gracias por tu compra')
  store.clearCart()
}

// Formatear precios
function formatPrice(value) {
  return new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  }).format(value)
}
</script>