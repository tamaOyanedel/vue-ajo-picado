<template>
  <div class="container my-5" style="max-width: 400px;">
    <h2 class="text-center mb-4 text-ap-primary fw-bold">Iniciar sesión</h2>

    <!-- Alerta de error -->
    <div v-if="errorMessage" class="alert alert-danger" role="alert">
      {{ errorMessage }}
    </div>

    <!-- Formulario de login -->
    <form @submit.prevent="handleLogin" novalidate>
      <div class="mb-3">
        <label for="email" class="form-label">Correo electrónico</label>
        <input
          type="email"
          v-model="email"
          class="form-control"
          id="email"
          placeholder="usuario1@mitienda.com"
          required
        />
      </div>

      <div class="mb-3">
        <label for="password" class="form-label">Contraseña</label>
        <input
          type="password"
          v-model="password"
          class="form-control"
          id="password"
          placeholder="password"
          required
        />
      </div>

      <button type="submit" class="btn btn-ajoPicado-primary w-100" :disabled="loading">
        <span v-if="loading">
          <span class="spinner-border spinner-border-sm me-2"></span>
          Iniciando sesión...
        </span>
        <span v-else>Iniciar sesión</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
import Auth from "../services/AuthService";

const store = inject("store");
const router = useRouter();

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const loading = ref(false);

async function handleLogin() {
  errorMessage.value = "";
  loading.value = true;

  try {
    const creds = { email: email.value, password: password.value };
    const user = await Auth.login(creds);
    store.login(user);

    // Redirige al home
    router.push("/home");
  } catch (err) {
    errorMessage.value = "Credenciales inválidas. Intenta nuevamente.";
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.container {
  background: #fff;
  padding: 2rem;
  border-radius: 0.75rem;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}
</style>
