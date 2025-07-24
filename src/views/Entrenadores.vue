<template>
  <div class="contenido-principal">
    <div class="container-fluid mt-4">
      <!-- Título -->
      <div class="encabezado-dashboard d-flex justify-content-between align-items-center mb-4 p-3">
        <h4 class="m-0">Gestión de Entrenadores</h4>
      </div>

      <!-- Formulario fijo -->
      <div class="card tarjeta-kpi p-4 mb-4">
        <div class="row">
          <div class="col-md-6 mb-3">
            <input v-model="nuevo.nombre" type="text" class="form-control" placeholder="Nombre completo" />
          </div>
          <div class="col-md-6 mb-3">
            <input v-model="nuevo.especialidad" type="text" class="form-control" placeholder="Especialidad" />
          </div>
          <div class="col-md-6 mb-3">
            <input v-model="nuevo.telefono" type="tel" class="form-control" placeholder="Teléfono" />
          </div>
          <div class="col-md-6 mb-3">
            <input v-model="nuevo.correo" type="email" class="form-control" placeholder="Correo electrónico" />
          </div>
          <div class="col-12 text-end">
            <button class="btn btn-success" @click="agregarEntrenador">Agregar Entrenador</button>
          </div>
        </div>
      </div>

      <!-- Lista de entrenadores activos -->
      <div class="card tarjeta-tabla p-4">
        <h5 class="mb-3">
          <i class="material-icons me-2">groups</i>
          Entrenadores activos
        </h5>
        <table class="table table-striped align-middle">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Especialidad</th>
              <th>Teléfono</th>
              <th>Correo</th>
              <th class="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(entrenador, index) in entrenadores" :key="index">
              <td>{{ entrenador.nombre }}</td>
              <td>{{ entrenador.especialidad }}</td>
              <td>{{ entrenador.telefono }}</td>
              <td>{{ entrenador.correo }}</td>
              <td class="text-center">
                <button class="btn btn-sm btn-danger" @click="darDeBaja(index)">
                  <i class="material-icons">person_off</i>
                </button>
              </td>
            </tr>
            <tr v-if="entrenadores.length === 0">
              <td colspan="5" class="text-center">No hay entrenadores activos</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const entrenadores = ref([
  {
    nombre: 'Laura Gómez',
    especialidad: 'Yoga y Pilates',
    telefono: '555-123-4567',
    correo: 'laura@gym.com'
  },
  {
    nombre: 'Carlos Méndez',
    especialidad: 'Pesas y fuerza',
    telefono: '555-987-6543',
    correo: 'carlos@gym.com'
  }
])

const nuevo = ref({
  nombre: '',
  especialidad: '',
  telefono: '',
  correo: ''
})

const agregarEntrenador = () => {
  if (nuevo.value.nombre && nuevo.value.especialidad) {
    entrenadores.value.push({ ...nuevo.value })
    nuevo.value = { nombre: '', especialidad: '', telefono: '', correo: '' }
  }
}

const darDeBaja = (index) => {
  entrenadores.value.splice(index, 1)
}
</script>

<style scoped>
@import '../assets/colors.css';

.contenido-principal {
  padding: 1.5rem;
  background-color: #fff;
  min-height: 100vh;
}

.encabezado-dashboard {
  background-color: var(--negro-profundo, #181c2f);
  border-radius: 12px;
  color: white;
}

.tarjeta-kpi {
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.tarjeta-tabla {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
}

.table th,
.table td {
  vertical-align: middle;
  white-space: nowrap;
}

input.form-control {
  font-size: 0.95rem;
  border-radius: 6px;
}
</style>
