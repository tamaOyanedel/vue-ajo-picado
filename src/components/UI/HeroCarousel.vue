<template>
  <div id="heroCarousel" class="carousel slide carousel-fade mb-4" data-bs-ride="carousel">
    <div class="carousel-inner overflow-hidden shadow">

      <!-- Slide 1 - Video -->
      <div class="carousel-item active">
        <video class="d-block w-100" autoplay muted playsinline>
          <source src="/media/hero-video.MOV" type="video/mp4" />
        </video>
        <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
          <h2 class="fw-bold text-light">Encuadernaciones hechas a mano</h2>
          <p>Creatividad, diseño y oficio en cada pieza.</p>
        </div>
      </div>

      <!-- Slide 2 -->
      <div class="carousel-item">
        <img src="/src/assets/images/carousel/slide2.jpeg" class="d-block w-100" alt="Encuadernación artesanal" />
        <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
          <h2 class="fw-bold text-light">Talleres de encuadernación</h2>
          <p>Aprende el arte de la encuadernación con nuestros cursos.</p>
        </div>
      </div>

      <!-- Slide 3 -->
      <div class="carousel-item">
        <img src="/src/assets/images/carousel/slide1.jpeg" class="d-block w-100" alt="Materiales de encuadernación" />
        <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
          <h2 class="fw-bold text-light">Materiales de calidad</h2>
          <p>Todo lo que necesitas para crear tus propios proyectos.</p>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
// No se necesita lógica reactiva
</script>

<style scoped>
video {
  object-fit: cover;
  height: 85vh;
}
.carousel-item img {
  object-fit: cover;
  height: 85vh;
}
</style>
