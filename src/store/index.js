// src/store/index.js
import { reactive, watch } from 'vue'

/**
 * Estado global de la aplicación Ajo Picado
 * Usamos `reactive` para mantener reactividad sin depender de Vuex.
 */
const state = reactive({
  user: null,          // Objeto { name, email }
  cart: []             // Array de { product, quantity }
})

/**
 * Carga el estado inicial desde localStorage (si existe)
 */
const loadFromLocalStorage = () => {
  try {
    const saved = localStorage.getItem('ajo_state')
    if (saved) {
      const parsed = JSON.parse(saved)
      if (parsed.user) state.user = parsed.user
      if (parsed.cart) state.cart = parsed.cart
    }
  } catch (e) {
    console.warn('⚠️ No se pudo cargar el estado guardado:', e)
  }
}

/**
 * Guarda el estado actual en localStorage
 */
const saveToLocalStorage = () => {
  try {
    localStorage.setItem('ajo_state', JSON.stringify({
      user: state.user,
      cart: state.cart
    }))
  } catch (e) {
    console.warn('⚠️ No se pudo guardar el estado:', e)
  }
}

// 🔁 Observa cambios en el estado y los guarda automáticamente
watch(state, saveToLocalStorage, { deep: true })

// 🧠 Inicializa el estado desde localStorage al cargar
loadFromLocalStorage()

/**
 * Métodos globales del store
 */
const store = {
  state,

  // 👤 LOGIN / LOGOUT
  login(user) {
    state.user = user
  },

  logout() {
    state.user = null
    state.cart = []
  },

  // 🛒 CARRITO DE COMPRA
  addToCart(product, quantity = 1) {
    if (!product || !product.id) return

    const existing = state.cart.find(item => item.product.id === product.id)
    if (existing) {
      existing.quantity += quantity
    } else {
      state.cart.push({ product, quantity })
    }
  },

  removeFromCart(productId) {
    state.cart = state.cart.filter(item => item.product.id !== productId)
  },

  updateQuantity(productId, quantity) {
    const item = state.cart.find(i => i.product.id === productId)
    if (item) {
      item.quantity = quantity
      if (item.quantity <= 0) {
        this.removeFromCart(productId)
      }
    }
  },

  clearCart() {
    state.cart = []
  },

  // 💰 Total del carrito
  getCartTotal() {
    return state.cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  },

  // 🔐 Verificar autenticación
  isAuthenticated() {
    return !!state.user
  }
}

export default store
