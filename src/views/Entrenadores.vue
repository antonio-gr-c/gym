
<template>
  <div class="contenido-principal">
    <div class="container mt-4">
      <!-- Encabezado -->
      <div class="encabezado-dashboard d-flex flex-wrap justify-content-between align-items-center p-3 mb-4">
        <div class="saludo">
          <h4 class="m-0">Entrenadores</h4>
        </div>
        <div class="reloj text-end">
          <p class="m-0">{{ fechaFormateada }}</p>
          <p class="m-0">{{ horaFormateada }}</p>
        </div>
      </div>

      <!-- Filtros y botón agregar entrenador -->
      <div class="card tarjeta-kpi p-4 mb-4">
        <h5 class="mb-3 d-flex align-items-center">
          <i class="material-icons me-2">group</i>
          {{ tituloLista }}
        </h5>
        <div class="row align-items-center">
          <div class="col-md-4 mb-2">
            <div class="btn-group" role="group">
              <button class="btn" :class="filtroActivo === 'activos' ? 'btn-primary' : 'btn-outline-primary'" @click="cambiarFiltro('activos')">Activos</button>
              <button class="btn" :class="filtroActivo === 'inactivos' ? 'btn-secondary' : 'btn-outline-secondary'" @click="cambiarFiltro('inactivos')">Inactivos</button>
              <button class="btn" :class="filtroActivo === 'todos' ? 'btn-info' : 'btn-outline-info'" @click="cambiarFiltro('todos')">Todos</button>
            </div>
          </div>
          <div class="col-md-8 mb-2 d-flex align-items-center justify-content-end">
            <div class="input-group me-2">
              <input type="text" class="form-control" placeholder="Buscar entrenador..." v-model="terminoBusqueda" @input="filtrarEntrenadores" />
              <button class="btn btn-outline-secondary" @click="terminoBusqueda = ''; filtrarEntrenadores()">
                <i class="material-icons">clear</i>
              </button>
            </div>
            <button class="btn btn-success" @click="abrirModalEntrenador">
              <i class="material-icons me-1">person_add</i>
            </button>
          </div>
        </div>
      </div>

      <!-- Modal para agregar entrenador -->
      <div class="modal fade" id="modalAgregarEntrenador" tabindex="-1" aria-labelledby="modalAgregarEntrenadorLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalAgregarEntrenadorLabel">Agregar nuevo entrenador</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Cerrar"></button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-md-4 mb-3">
                  <input v-model="nuevoEntrenador.nombre" type="text" class="form-control" placeholder="Nombre(s)" />
                </div>
                <div class="col-md-4 mb-3">
                  <input v-model="nuevoEntrenador.apellidoPaterno" type="text" class="form-control" placeholder="Apellido paterno" />
                </div>
                <div class="col-md-4 mb-3">
                  <input v-model="nuevoEntrenador.apellidoMaterno" type="text" class="form-control" placeholder="Apellido materno" />
                </div>
                <div class="col-md-6 mb-3">
                  <input v-model="nuevoEntrenador.edad" type="number" class="form-control" placeholder="Edad" min="0" />
                </div>
                <div class="col-md-6 mb-3">
                  <input v-model="nuevoEntrenador.correo" type="email" class="form-control" placeholder="Correo electrónico" />
                </div>
                <div class="col-md-12 mb-3">
                  <input v-model="nuevoEntrenador.telefono" type="tel" class="form-control" placeholder="Teléfono" />
                </div>
                <div class="col-md-12 mb-3">
                  <input v-model="nuevoEntrenador.especialidad" type="text" class="form-control" placeholder="Especialidad" />
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
              <button type="button" class="btn btn-success" @click="agregarEntrenadorModal">Agregar Entrenador</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabla -->
      <div class="card tarjeta-tabla p-4">
        <h5 class="mb-3 d-flex align-items-center">
          <i class="material-icons me-2">table_view</i>
          Listado de entrenadores
        </h5>
        <div class="tabla-scroll">
          <table class="table table-hover tabla-clientes mb-0">
            <thead>
              <tr>
                <th>Nombre completo</th>
                <th>Edad</th>
                <th>Correo</th>
                <th>Teléfono</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="entrenador in entrenadoresFiltrados" :key="entrenador.id">
                <td class="td-nombre">{{ entrenador.nombre }} {{ entrenador.apellidoPaterno }} {{ entrenador.apellidoMaterno }}</td>
                <td class="td-edad">{{ entrenador.edad }}</td>
                <td class="td-correo">{{ entrenador.correo }}</td>
                <td class="td-telefono">{{ entrenador.telefono }}</td>
                <td class="td-acciones">
                  <div class="acciones-btns d-flex gap-1 justify-content-center">
                    <button class="btn btn-sm btn-outline-primary" title="Ver" @click="verDetalle(entrenador)">
                      <i class="material-icons">visibility</i>
                    </button>
                    <button class="btn btn-sm btn-outline-warning" title="Editar" @click="editarEntrenador(entrenador)">
                      <i class="material-icons">edit</i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger" title="Eliminar" @click="eliminarEntrenador(entrenador.id)">
                      <i class="material-icons">delete</i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="entrenadoresFiltrados.length === 0">
                <td colspan="5" class="text-center text-muted">No hay entrenadores registrados.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Detalle master-detail -->
      <div v-if="entrenadorDetalle" class="card tarjeta-tabla p-4 mb-4">
        <div class="d-flex justify-content-between align-items-center mb-2">
          <h5 class="mb-0">Detalle de entrenador</h5>
          <button class="btn btn-sm btn-outline-secondary" @click="cancelarEdicionDetalle" title="Cerrar"><i class="material-icons">close</i></button>
        </div>
        <form v-if="editandoDetalle" @submit.prevent="guardarEdicionDetalle">
          <div class="row">
            <div class="col-md-4 mb-2">
              <label class="form-label"><b>Nombre(s):</b></label>
              <input v-model="entrenadorDetalle.nombre" type="text" class="form-control" />
            </div>
            <div class="col-md-4 mb-2">
              <label class="form-label"><b>Apellido paterno:</b></label>
              <input v-model="entrenadorDetalle.apellidoPaterno" type="text" class="form-control" />
            </div>
            <div class="col-md-4 mb-2">
              <label class="form-label"><b>Apellido materno:</b></label>
              <input v-model="entrenadorDetalle.apellidoMaterno" type="text" class="form-control" />
            </div>
            <div class="col-md-4 mb-2">
              <label class="form-label"><b>Edad:</b></label>
              <input v-model="entrenadorDetalle.edad" type="number" class="form-control" min="0" />
            </div>
            <div class="col-md-4 mb-2">
              <label class="form-label"><b>Correo:</b></label>
              <input v-model="entrenadorDetalle.correo" type="email" class="form-control" />
            </div>
            <div class="col-md-4 mb-2">
              <label class="form-label"><b>Teléfono:</b></label>
              <input v-model="entrenadorDetalle.telefono" type="tel" class="form-control" />
            </div>
            <div class="col-md-4 mb-2">
              <label class="form-label"><b>Especialidad:</b></label>
              <input v-model="entrenadorDetalle.especialidad" type="text" class="form-control" />
            </div>
            <div class="col-md-4 mb-2">
              <label class="form-label"><b>Número de alumnos:</b></label>
              <input v-model="entrenadorDetalle.numAlumnos" type="number" class="form-control" min="0" />
            </div>
            <div class="col-md-4 mb-2">
              <label class="form-label"><b>Áreas:</b></label>
              <input v-model="entrenadorDetalle.areas" type="text" class="form-control" placeholder="Ej: Pesas, Cardio" />
            </div>
          </div>
          <div class="text-end mt-3">
            <button type="submit" class="btn btn-success me-2">Guardar cambios</button>
            <button type="button" class="btn btn-secondary" @click="editandoDetalle = false">Cancelar</button>
          </div>
        </form>
        <div v-else class="row">
          <div class="col-md-4 mb-2"><b>Nombre(s):</b> {{ entrenadorDetalle.nombre }}</div>
          <div class="col-md-4 mb-2"><b>Apellido paterno:</b> {{ entrenadorDetalle.apellidoPaterno }}</div>
          <div class="col-md-4 mb-2"><b>Apellido materno:</b> {{ entrenadorDetalle.apellidoMaterno }}</div>
          <div class="col-md-4 mb-2"><b>Edad:</b> {{ entrenadorDetalle.edad }}</div>
          <div class="col-md-4 mb-2"><b>Correo:</b> {{ entrenadorDetalle.correo }}</div>
          <div class="col-md-4 mb-2"><b>Teléfono:</b> {{ entrenadorDetalle.telefono }}</div>
          <div class="col-md-4 mb-2"><b>Especialidad:</b> {{ entrenadorDetalle.especialidad || 'No especificado' }}</div>
          <div class="col-md-4 mb-2"><b>Número de alumnos:</b> {{ entrenadorDetalle.numAlumnos !== undefined ? entrenadorDetalle.numAlumnos : 'N/A' }}</div>
          <div class="col-md-4 mb-2"><b>Áreas:</b> {{ entrenadorDetalle.areas || 'No especificado' }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2'
import { ref, computed, onMounted, onUnmounted } from 'vue'

const entrenadorDetalle = ref(null)
const editandoDetalle = ref(false)

function verDetalle(entrenador) {
  entrenadorDetalle.value = { ...entrenador }
  editandoDetalle.value = false
}

function editarEntrenador(entrenador) {
  entrenadorDetalle.value = { ...entrenador }
  editandoDetalle.value = true
}

async function guardarEdicionDetalle() {
  if (!entrenadorDetalle.value.nombre || !entrenadorDetalle.value.apellidoPaterno || !entrenadorDetalle.value.apellidoMaterno || !entrenadorDetalle.value.edad || !entrenadorDetalle.value.correo || !entrenadorDetalle.value.telefono) {
    await Swal.fire({ icon: 'warning', title: 'Campos incompletos', text: 'Por favor completa todos los campos.' })
    return
  }
  const idx = entrenadores.value.findIndex(e => e.id === entrenadorDetalle.value.id)
  if (idx !== -1) {
    entrenadores.value[idx] = { ...entrenadorDetalle.value }
    await Swal.fire({ icon: 'success', title: 'Entrenador actualizado', showConfirmButton: false, timer: 1200 })
  }
  editandoDetalle.value = false
  entrenadorDetalle.value = null
}

function cancelarEdicionDetalle() {
  entrenadorDetalle.value = null
}

function abrirModalEntrenador() {
  const modal = document.getElementById('modalAgregarEntrenador')
  if (modal) {
    new window.bootstrap.Modal(modal).show()
  }
}

const nuevoEntrenador = ref({
  nombre: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  edad: '',
  correo: '',
  telefono: '',
  especialidad: ''
})

const entrenadores = ref([
  { id: 1, nombre: 'Marcos', apellidoPaterno: 'López', apellidoMaterno: '', edad: 35, correo: 'marcos@gym.com', telefono: '5551112222', especialidad: 'Pesas', numAlumnos: 12, areas: 'Pesas, Cardio', activo: true },
  { id: 2, nombre: 'Lucía', apellidoPaterno: 'Pérez', apellidoMaterno: '', edad: 29, correo: 'lucia@gym.com', telefono: '5553334444', especialidad: 'Cardio', numAlumnos: 8, areas: 'Cardio, Funcional', activo: false }
])

const filtroActivo = ref('activos')
const terminoBusqueda = ref('')

const entrenadoresFiltrados = computed(() => {
  let filtrados = [...entrenadores.value]
  if (filtroActivo.value === 'activos') filtrados = filtrados.filter(e => e.activo)
  else if (filtroActivo.value === 'inactivos') filtrados = filtrados.filter(e => !e.activo)

  if (terminoBusqueda.value.trim()) {
    const termino = terminoBusqueda.value.toLowerCase()
    filtrados = filtrados.filter(e =>
      (e.nombre && e.nombre.toLowerCase().includes(termino)) ||
      (e.apellidoPaterno && e.apellidoPaterno.toLowerCase().includes(termino)) ||
      (e.apellidoMaterno && e.apellidoMaterno.toLowerCase().includes(termino)) ||
      (e.telefono && e.telefono.includes(termino)) ||
      (e.correo && e.correo.toLowerCase().includes(termino))
    )
  }
  return filtrados
})

const cambiarFiltro = tipo => filtroActivo.value = tipo
const filtrarEntrenadores = () => {}

function agregarEntrenadorModal() {
  if (!nuevoEntrenador.value.nombre || !nuevoEntrenador.value.apellidoPaterno || !nuevoEntrenador.value.apellidoMaterno || !nuevoEntrenador.value.edad || !nuevoEntrenador.value.correo || !nuevoEntrenador.value.telefono) {
    Swal.fire({ icon: 'warning', title: 'Campos incompletos', text: 'Por favor completa todos los campos.' })
    return
  }
  entrenadores.value.push({
    id: entrenadores.value.length ? Math.max(...entrenadores.value.map(e => e.id)) + 1 : 1,
    nombre: nuevoEntrenador.value.nombre,
    apellidoPaterno: nuevoEntrenador.value.apellidoPaterno,
    apellidoMaterno: nuevoEntrenador.value.apellidoMaterno,
    edad: nuevoEntrenador.value.edad,
    correo: nuevoEntrenador.value.correo,
    telefono: nuevoEntrenador.value.telefono,
    especialidad: nuevoEntrenador.value.especialidad,
    numAlumnos: 0,
    areas: '',
    activo: true
  })
  Swal.fire({ icon: 'success', title: 'Entrenador agregado', showConfirmButton: false, timer: 1200 })
  nuevoEntrenador.value = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    edad: '',
    correo: '',
    telefono: '',
    especialidad: ''
  }
  // Cerrar modal
  const modal = document.getElementById('modalAgregarEntrenador')
  if (modal) {
    window.bootstrap.Modal.getInstance(modal).hide()
  }
}

function eliminarEntrenador(id) {
  Swal.fire({
    title: '¿Seguro que deseas eliminar este entrenador?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    reverseButtons: true
  }).then(result => {
    if (result.isConfirmed) {
      entrenadores.value = entrenadores.value.filter(e => e.id !== id)
      if (entrenadorDetalle.value && entrenadorDetalle.value.id === id) {
        entrenadorDetalle.value = null
        editandoDetalle.value = false
      }
      Swal.fire({ icon: 'success', title: 'Entrenador eliminado', showConfirmButton: false, timer: 1200 })
    }
  })
}

const tituloLista = computed(() => {
  switch(filtroActivo.value) {
    case 'activos': return 'Entrenadores Activos'
    case 'inactivos': return 'Entrenadores Inactivos'
    case 'todos': return 'Todos los Entrenadores'
    default: return 'Entrenadores'
  }
})

const fechaFormateada = ref('')
const horaFormateada = ref('')
let intervalo = null

function actualizarFechaHora() {
  const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
  const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre']
  const ahora = new Date()
  fechaFormateada.value = `${dias[ahora.getDay()]}, ${ahora.getDate()} de ${meses[ahora.getMonth()]} de ${ahora.getFullYear()}`
  horaFormateada.value = ahora.toLocaleTimeString('es-MX', { hour12: false })
}

onMounted(() => {
  actualizarFechaHora()
  intervalo = setInterval(actualizarFechaHora, 1000)
})

onUnmounted(() => {
  if (intervalo) clearInterval(intervalo)
})
</script>

<style scoped>
@import '../assets/colors.css';

.contenido-principal {
  background-color: #fff;
  min-height: 100vh;
}

.encabezado-dashboard {
  background-color: var(--ambar-intenso);
  border-radius: 8px;
  font-family: 'Nunito Sans', sans-serif;
}

.saludo h4 {
  color: var(--blanco);
  font-weight: 700;
}

.reloj {
  color: var(--claro-suave);
}

.tarjeta-kpi {
  background-color: var(--claro-suave);
  border-left: 5px solid var(--ambar-intenso);
  border-radius: 8px;
  color: var(--negro-profundo);
  transition: transform 0.2s ease;
}

.tarjeta-kpi:hover {
  transform: scale(1.02);
}

.tarjeta-tabla {
  background-color: var(--ambar-intenso);
  color: var(--blanco);
  border-radius: 10px;
}

.tabla-scroll {
  background-color: var(--blanco);
  border-radius: 6px;
  padding: 0.5rem;
  overflow-x: auto;
  color: var(--negro);
}

.material-icons {
  vertical-align: middle;
  font-size: 1.2em;
}
.tabla-clientes th, .tabla-clientes td {
  padding: 0.35rem 0.3rem !important;
  vertical-align: middle !important;
  white-space: nowrap;
}
.tabla-clientes {
  font-size: 1rem;
  border-radius: 8px;
}
.td-nombre, .td-edad, .td-correo, .td-telefono {
  vertical-align: middle;
  white-space: nowrap;
}
.td-acciones {
  width: 1%;
  vertical-align: middle;
}
.acciones-btns button {
  min-width: 32px;
  padding: 0.3rem 0.5rem;
}
.acciones-btns {
  gap: 0.3rem !important;
}
</style>
