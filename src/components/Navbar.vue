<template>
  <nav class="navbar navbar-expand-lg fondo-navbar shadow-sm">
    <div class="container-fluid">
      <router-link to="/" class="navbar-brand d-flex align-items-center">
        <img :src="logo" alt="Logo" class="logo-navbar-grande" />
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li v-for="item in menu" :key="item.nombre" class="nav-item">
            <router-link :to="item.ruta" class="nav-link nav-animada">
              <i class="material-icons me-1">{{ item.icono }}</i>{{ item.nombre }}
            </router-link>
          </li>
        </ul>

        <router-link to="/login" class="btn-login-icon ms-lg-3">
          <i class="material-icons">login</i>
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import logo from '../assets/images/logo.png'

const menu = ref([
  { nombre: 'Administración',     ruta: '/admin',       icono: 'admin_panel_settings' },
  { nombre: 'Ventas',             ruta: '/ventas',      icono: 'point_of_sale'         },
  { nombre: 'Compras',            ruta: '/compras',     icono: 'shopping_cart'         },
  { nombre: 'Almacén',            ruta: '/almacen',     icono: 'inventory_2'           },
  { nombre: 'Contabilidad',       ruta: '/contabilidad',icono: 'request_quote'         },
  { nombre: 'Recursos Humanos',   ruta: '/rrhh',        icono: 'groups'                }
])

onMounted(() => {
  const navbar = document.querySelector('.fondo-navbar')
  const handleScroll = () => {
    if (window.scrollY > 10) navbar.classList.add('shrink')
    else                    navbar.classList.remove('shrink')
  }
  window.addEventListener('scroll', handleScroll)
  onUnmounted(() => window.removeEventListener('scroll', handleScroll))
})
</script>

<style scoped>
.fondo-navbar {
  background-color: #02040f; /* NUEVO COLOR VERDE */
  padding: 1.2rem 2rem;
  position: sticky;
  top: 0;
  z-index: 1050;
  transition: padding 0.25s, box-shadow 0.25s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.fondo-navbar.shrink {
  padding: 0.5rem 1rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.13);
}

.logo-navbar-grande {
  width: 70px;
  height: 70px;
  object-fit: contain;
  transition: width 0.25s, height 0.25s;
}
.fondo-navbar.shrink .logo-navbar-grande {
  width: 48px;
  height: 48px;
}

.navbar-nav .nav-item {
  margin-right: 1.5rem;
}

.nav-link {
  color: #ffffff !important;
  font-weight: 500;
  display: flex;
  align-items: center;
  transition: color 0.3s;
}

.nav-link.router-link-active,
.nav-link:hover {
  color: #333 !important;
}

/* Botón de login solo ícono */
.btn-login-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  color: #ffffff;
  padding: 0.25rem;
  font-size: 1.5rem;
  transition: color 0.3s;
}

.btn-login-icon:hover {
  color: #333;
}
</style>
