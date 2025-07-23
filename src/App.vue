<template>
  <div class="app-wrapper">
    <Navbar v-if="mostrarLayout" />
    <main class="main-content">
      <router-view />
    </main>
    <Footer v-if="mostrarLayout" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

const route = useRoute()

const mostrarLayout = computed(() => {
  return !['/login'].includes(route.path)
})
</script>

<style scoped>
.app-wrapper {
  min-height: 150vh;
  display: flex;
  flex-direction: column;
}
.main-content {
  flex: 1 0 auto;
  min-height: 400px;
  padding-bottom: 2rem;
}
</style>
