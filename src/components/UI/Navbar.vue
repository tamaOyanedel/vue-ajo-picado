<template>
    <nav class="navbar navbar-expand-lg sticky-top bg-ap-morado">
        <div class="container-fluid">
            <div class="container d-flex">
                <!-- Marca -->
                <RouterLink class="navbar-brand fw-bold text-primary" to="/home">
                    <img src="/src/assets/images/logo/logo_blanco.png" alt="Logo Ajo Picado" class="logo-ajoPicado">
                </RouterLink>

                <!-- Botón hamburguesa -->
                <button class="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <!-- Menú principal -->
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav m-auto">
                        <li class="nav-item">
                        <RouterLink class="nav-link" to="/home" active-class="active">INICIO</RouterLink>
                        </li>
                        <li class="nav-item">
                        <RouterLink class="nav-link" to="/products" active-class="active">PRODUCTOS</RouterLink>
                        </li>
                    </ul>

                    <div class="d-flex align-items-center gap-1">
                        <!-- BTN CARRITO-->
                        <button
                            class="btn btn-ajoPicado position-relative me-3"
                            @click="$emit('toggle-cart')"
                        >
                            Carrito
                            <span
                            v-if="cartCount > 0"
                            class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark"
                            >
                            {{ cartCount }}
                            </span>
                        </button>

                        <!-- Si el usuario NO está autenticado -->
                        <RouterLink
                            v-if="!user"
                            to="/login"
                            class="btn btn-outline-secondary"
                        >
                            <i class="bi bi-person"></i> Iniciar sesión
                        </RouterLink>

                        <!-- Si el usuario SÍ está autenticado -->
                        <div v-else class="dropdown">
                            <button
                            class="btn btn-ajoPicado-secondary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            >
                            <i class="bi bi-person-circle"></i>Hola, {{ user.name }}
                            </button>
                            <ul class="dropdown-menu dropdown-menu-end">
                            <li>
                                <RouterLink class="dropdown-item" to="/profile">Perfil</RouterLink>
                            </li>
                            <li>
                                <button class="dropdown-item text-ap-terciary" @click="logout">
                                Cerrar sesión
                                </button>
                            </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { inject, computed } from "vue";
import { RouterLink } from "vue-router";

const store = inject("store");

// Usuario actual (reactivo)
const user = computed(() => store.state.user)

// Número de productos en el carrito
const cartCount = computed(() => store.state.cart.length)

function logout() {
    store.logout();
}
</script>

<style scoped>
.navbar {
  transition: all 0.3s ease-in-out;
}

.navbar-brand {
  font-size: 1.3rem;
}

.badge {
  font-size: 0.7rem;
  padding: 0.3em 0.4em;
}
</style>