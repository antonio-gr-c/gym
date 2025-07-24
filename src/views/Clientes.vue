<template>
  <div class="container mt-4">
    <h3 class="mb-4 d-flex justify-content-between align-items-center">
      {{ tituloLista }}
    </h3>

    <div class="row mb-4">
      <div class="col-md-4">
        <div class="btn-group" role="group">
          <button class="btn" :class="filtroActivo === 'activos' ? 'btn-primary' : 'btn-outline-primary'" @click="cambiarFiltro('activos')">Activos</button>
          <button class="btn" :class="filtroActivo === 'inactivos' ? 'btn-secondary' : 'btn-outline-secondary'" @click="cambiarFiltro('inactivos')">Inactivos</button>
          <button class="btn" :class="filtroActivo === 'todos' ? 'btn-info' : 'btn-outline-info'" @click="cambiarFiltro('todos')">Todos</button>
        </div>
      </div>
      <div class="col-md-8">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Buscar cliente..." v-model="terminoBusqueda" @input="filtrarClientes">
          <button class="btn btn-outline-secondary" @click="terminoBusqueda = ''; filtrarClientes()">
            <i class="material-icons">clear</i>
          </button>
        </div>
      </div>
    </div>

    <table class="table table-hover align-middle">
      <thead class="table-dark">
        <tr>
          <th>Nombre</th>
          <th>Teléfono</th>
          <th>Paquete</th>
          <th>Entrenador</th>
          <th>Días Restantes</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="cliente in clientesOrdenados" :key="cliente.id" :class="cliente.dias_restantes === 0 ? 'text-muted text-decoration-line-through' : ''">
          <td>{{ cliente.nombre }}</td>
          <td>{{ cliente.telefono }}</td>
          <td>{{ cliente.paquete }}</td>
          <td>{{ cliente.entrenador }}</td>
          <td>
            <span :style="{
              color: cliente.dias_restantes === 0 ? 'gray' : cliente.dias_restantes <= 5 ? 'red' : 'inherit'
            }">
              {{ cliente.dias_restantes }}
            </span>
          </td>
          <td>
            <span class="badge" :class="cliente.activo ? 'bg-success' : 'bg-danger'">
              {{ cliente.activo ? 'Activo' : 'Inactivo' }}
            </span>
          </td>
          <td>
            <button class="btn btn-sm btn-outline-primary me-2" title="Ver"><i class="material-icons">visibility</i></button>
            <button class="btn btn-sm btn-outline-warning me-2" title="Editar"><i class="material-icons">edit</i></button>
            <button class="btn btn-sm btn-outline-danger" title="Eliminar"><i class="material-icons">delete</i></button>
          </td>
        </tr>
        <tr v-if="clientesOrdenados.length === 0">
          <td colspan="7" class="text-center text-muted">No hay clientes encontrados.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const terminoBusqueda = ref('')
const filtroActivo = ref('activos')

const clientes = ref([
  { id: 1, nombre: 'Ana Torres', telefono: '5551234567', paquete: 'Mensualidad Gym', entrenador: 'Marcos', dias_restantes: 3, activo: true },
  { id: 2, nombre: 'Carlos Ruiz', telefono: '5558889999', paquete: 'Funcional + Gym', entrenador: 'Lucía', dias_restantes: 0, activo: false },
  { id: 3, nombre: 'Lucía Gómez', telefono: '5552223333', paquete: 'Fisio + Gym + PT', entrenador: 'Daniel', dias_restantes: 7, activo: true },
  { id: 4, nombre: 'Roberto Díaz', telefono: '5554445555', paquete: 'Visita', entrenador: 'N/A', dias_restantes: 1, activo: true },
  { id: 5, nombre: 'Elena Rojas', telefono: '5551112222', paquete: 'PT + Gym', entrenador: 'Laura', dias_restantes: 0, activo: false }
])

const clientesOrdenados = computed(() => {
  let filtrados = [...clientes.value]
  if (filtroActivo.value === 'activos') filtrados = filtrados.filter(c => c.activo)
  else if (filtroActivo.value === 'inactivos') filtrados = filtrados.filter(c => !c.activo)
  
  if (terminoBusqueda.value.trim()) {
    const termino = terminoBusqueda.value.toLowerCase()
    filtrados = filtrados.filter(c =>
      c.nombre.toLowerCase().includes(termino) ||
      c.telefono.includes(termino) ||
      c.paquete.toLowerCase().includes(termino)
    )
  }
  return [
    ...filtrados.filter(c => c.dias_restantes > 0),
    ...filtrados.filter(c => c.dias_restantes === 0)
  ]
})

const cambiarFiltro = tipo => filtroActivo.value = tipo
const filtrarClientes = () => {} // manejado por computed

const tituloLista = computed(() => {
  switch(filtroActivo.value) {
    case 'activos': return 'Clientes Activos'
    case 'inactivos': return 'Clientes Inactivos'
    case 'todos': return 'Todos los Clientes'
    default: return 'Clientes'
  }
})
</script>

<style scoped>
.text-decoration-line-through {
  text-decoration: line-through;
}
.material-icons {
  vertical-align: middle;
  font-size: 1.2em;
}
</style>
