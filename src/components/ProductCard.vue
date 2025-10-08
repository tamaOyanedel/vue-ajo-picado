<template>
  <div class="card h-100 shadow-sm">
    <img :src="product.image" class="card-img-top" :alt="product.name">
    <div class="card-body">
      <h5 class="card-title">{{ product.name }}</h5>
      <p class="card-text small text-muted">{{ product.description }}</p>
      <h4 class="fw-bold">{{ product.price.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' }) }}</h4>


    </div>
    <div class="card-footer d-flex justify-content-between">
      <p v-if="product.stock > 0" class="text-ap-primary mb-2">Stock: {{ product.stock }}</p>
      <p v-else class="text-ap-terciary mb-2">Sin stock</p>
      <div class="d-flex gap-3">
      <button class="btn btn-ajoPicado btn-sm" @click="$emit('view', product)">Ver</button>

      <button
        v-if="product.stock > 0"
        class="btn btn-ajoPicado-primary btn-sm"
        @click="$emit('add', product)"
      >
        Agregar
      </button>
      </div>
    </div>

  </div>
</template>

<script setup>
defineProps({
  product: {
    type: Object,
    required: true
  }
})

defineEmits(['view', 'add'])
</script>
