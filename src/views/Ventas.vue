<template>
  <Navbar />

  <div class="container mt-4">
    <h3 class="mb-4">Sistema de Ventas</h3>

    <div class="row">
      <!-- Panel de Búsqueda -->
      <div class="col-md-4 mb-4">
        <div class="card">
          <div class="card-header bg-primary text-white">
            <h5 class="mb-0">Nueva Venta</h5>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label class="form-label">Cliente *</label>
              <select v-model="cliente_id" class="form-select" required>
                <option value="">Seleccione un cliente</option>
                <option v-for="cliente in clientes" :key="cliente.id" :value="cliente.id">
                  {{ cliente.nombre }}
                </option>
              </select>
            </div>

            <div class="mb-3" v-if="tienePaqueteEnVenta">
              <label class="form-label">Aplicar Promoción (opcional)</label>
              <select v-model="promocion_aplicada" class="form-select">
                <option value="">Sin promoción</option>
                <option
                  v-for="promocion in promocionesDisponibles"
                  :key="promocion.id"
                  :value="promocion"
                >
                  {{ promocion.nombre }} - Descuento: ${{
                    promocion.descuento.toFixed(2)
                  }}
                </option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label">Forma de Pago*</label>
              <select v-model="forma_pago" class="form-select" required>
                <option value="efectivo">Efectivo</option>
                <option value="tarjeta">Tarjeta</option>
                <option value="transferencia">Transferencia</option>
              </select>
            </div>

            <div class="mb-3">
              <label class="form-label">Notas</label>
              <textarea v-model="notas" class="form-control" rows="2"></textarea>
            </div>
          </div>
        </div>

        <!-- Lista de Items en la Venta -->
        <div class="card mt-3">
          <div class="card-header bg-secondary text-white">
            <h5 class="mb-0">Items en Venta</h5>
          </div>
          <div class="card-body">
            <ul class="list-group">
              <li
                v-for="(item, index) in items_venta"
                :key="index"
                class="list-group-item d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{{ item.nombre }}</strong
                  ><br />
                  <small class="text-muted">{{ item.tipo | capitalize }}</small
                  ><br />
                  {{ item.cantidad }} x ${{ item.precio_unitario.toFixed(2) }}
                </div>
                <button @click="eliminarItem(index)" class="btn btn-sm btn-danger">
                  <i class="material-icons">delete</i>
                </button>
              </li>
            </ul>
            <div v-if="items_venta.length === 0" class="text-center text-muted mt-3">
              No hay items agregados
            </div>
            <div class="mt-3">
              <h5>Total: ${{ total_venta.toFixed(2) }}</h5>
              <small v-if="promocion_aplicada" class="text-success">
                Descuento aplicado: ${{ promocion_aplicada.descuento.toFixed(2) }}
              </small>
            </div>
            <button
              @click="procesarVenta"
              :disabled="items_venta.length === 0 || procesando || !cliente_id"
              class="btn btn-success w-100 mt-2"
            >
              <span v-if="procesando" class="spinner-border spinner-border-sm"></span>
              {{ procesando ? "Procesando..." : "Finalizar Venta" }}
            </button>
          </div>
        </div>
      </div>

      <!-- Panel de Productos/Servicios -->
      <div class="col-md-8">
        <div class="card">
          <div class="card-header bg-primary text-white">
            <h5 class="mb-0">Productos y Servicios</h5>
          </div>
          <div class="card-body">
            <ul class="nav nav-tabs" id="myTab" role="tablist">
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  data-bs-toggle="tab"
                  data-bs-target="#productos"
                  type="button"
                >
                  Productos
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#servicios"
                  type="button"
                >
                  Servicios
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  data-bs-toggle="tab"
                  data-bs-target="#paquetes"
                  type="button"
                >
                  Paquetes
                </button>
              </li>
            </ul>

            <div class="tab-content p-3 border border-top-0 rounded-bottom">
              <!-- Productos -->
              <div class="tab-pane fade show active" id="productos" role="tabpanel">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Descripción</th>
                      <th>Precio</th>
                      <th>Stock</th>
                      <th>Cantidad</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="producto in productos" :key="producto.id">
                      <td>{{ producto.nombre }}</td>
                      <td>{{ producto.descripcion }}</td>
                      <td>${{ producto.precio.toFixed(2) }}</td>
                      <td>{{ producto.stock }}</td>
                      <td>
                        <input
                          type="number"
                          v-model.number="producto.cantidad_seleccionada"
                          min="1"
                          :max="producto.stock"
                          class="form-control"
                          style="width: 80px"
                        />
                      </td>
                      <td>
                        <button
                          @click="agregarProducto(producto)"
                          :disabled="
                            !producto.cantidad_seleccionada ||
                            producto.cantidad_seleccionada <= 0 ||
                            producto.stock <= 0
                          "
                          class="btn btn-sm btn-primary"
                        >
                          Agregar
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Servicios -->
              <div class="tab-pane fade" id="servicios" role="tabpanel">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Descripción</th>
                      <th>Precio</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="servicio in servicios" :key="servicio.id">
                      <td>{{ servicio.nombre }}</td>
                      <td>{{ servicio.descripcion }}</td>
                      <td>${{ servicio.precio.toFixed(2) }}</td>
                      <td>
                        <button
                          @click="agregarServicio(servicio)"
                          class="btn btn-sm btn-primary"
                        >
                          Agregar
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Paquetes -->
              <div class="tab-pane fade" id="paquetes" role="tabpanel">
                <div class="row">
                  <div
                    v-for="paquete in paquetes"
                    :key="paquete.id"
                    class="col-md-6 mb-3"
                  >
                    <div class="card h-100">
                      <div class="card-body">
                        <h5 class="card-title">{{ paquete.nombre }}</h5>
                        <p class="card-text text-muted">{{ paquete.descripcion }}</p>
                        <p class="fw-bold">
                          ${{ paquete.costo.toFixed(2) }} -
                          {{ paquete.duracion_dias }} días
                        </p>
                        <button
                          @click="agregarPaquete(paquete)"
                          class="btn btn-sm btn-primary w-100"
                          :disabled="!cliente_id"
                        >
                          {{ cliente_id ? "Agregar" : "Selecciona un cliente" }}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Swal from "sweetalert2";

export default {
  name: "Ventas",
  components: { Navbar },
  filters: {
    capitalize(value) {
      if (!value) return "";
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  data() {
    return {
      cliente_id: "",
      clientes: [
        { id: 1, nombre: "Juan Pérez" },
        { id: 2, nombre: "María García" },
        { id: 3, nombre: "Carlos López" },
        { id: 4, nombre: "Ana Martínez" },
      ],
      usuario: {
        id: 1,
        nombre: "Admin Demo",
      },
      forma_pago: "efectivo",
      notas: "",
      items_venta: [],
      productos: [
        {
          id: 1,
          nombre: "Agua 1.5L",
          descripcion: "Botella de agua de 1.5 litros",
          precio: 25.0,
          stock: 10,
          cantidad_seleccionada: 1,
        },
        {
          id: 2,
          nombre: "Proteina en Polvo",
          descripcion: "Proteína en polvo de chocolate",
          precio: 500.0,
          stock: 30,
          cantidad_seleccionada: 1,
        },
        {
          id: 3,
          nombre: "Barra de Energía",
          descripcion: "Barra de energía con sabor a chocolate",
          precio: 30.0,
          stock: 15,
          cantidad_seleccionada: 1,
        },
      ],
      servicios: [
        {
          id: 101,
          nombre: "Sesion de fisioterapia",
          descripcion: "Sesión de fisioterapia para recuperación muscular",
          precio: 200.0,
        },
        {
          id: 102,
          nombre: "Sesion de entrenamiento personal",
          descripcion: "Entrenamiento personalizado para alcanzar tus objetivos",
          precio: 100.0,
        },
      ],
      paquetes: [
        {
          id: 201,
          nombre: "Paquete Mensual",
          descripcion: "Acceso al gimnasio por 30 días",
          costo: 500.0,
          duracion_dias: 30,
        },
        {
          id: 202,
          nombre: "Paquete Semanal",
          descripcion: "Acceso al gimnasio por 7 días",
          costo: 150.0,
          duracion_dias: 7,
        },
      ],
      promociones: [
        {
          id: 301,
          nombre: "Verano Fit",
          descripcion: "Promoción especial de verano",
          descuento: 30.0,
          aplica_a_paquetes: true,
        },
        {
          id: 302,
          nombre: "Mes del padre",
          descripcion: "Descuento para los padres",
          descuento: 50.0,
          aplica_a_paquetes: true,
        },
      ],
      promocion_aplicada: null,
      tienePaqueteEnVenta: false,
      procesando: false,
    };
  },
  computed: {
    promocionesDisponibles() {
      return this.promociones.filter((p) => p.aplica_a_paquetes);
    },
    total_venta() {
      let total = this.items_venta.reduce((total, item) => {
        return total + item.precio_unitario * item.cantidad;
      }, 0);

      if (this.tienePaqueteEnVenta && this.promocion_aplicada) {
        total -= this.promocion_aplicada.descuento;
      }

      return total > 0 ? total : 0;
    },
  },
  mounted() {
    // Simulamos la obtención del usuario logueado
    this.usuario = {
      id: 1,
      nombre: "Usuario Demo",
    };
  },
  methods: {
    agregarProducto(producto) {
      if (producto.cantidad_seleccionada > producto.stock) {
        this.mostrarError(`No hay suficiente stock. Disponible: ${producto.stock}`);
        return;
      }

      this.items_venta.push({
        id: producto.id,
        nombre: producto.nombre,
        tipo: "producto",
        precio_unitario: producto.precio,
        cantidad: producto.cantidad_seleccionada || 1,
        descripcion: producto.descripcion,
      });

      producto.cantidad_seleccionada = 1;
    },

    agregarServicio(servicio) {
      this.items_venta.push({
        id: servicio.id,
        nombre: servicio.nombre,
        tipo: "servicio",
        precio_unitario: servicio.precio,
        cantidad: 1,
        descripcion: servicio.descripcion,
      });
    },

    agregarPaquete(paquete) {
      if (!this.cliente_id) {
        this.mostrarAdvertencia("Debes seleccionar un cliente para agregar paquetes");
        return;
      }

      this.items_venta.push({
        id: paquete.id,
        nombre: paquete.nombre,
        tipo: "paquete",
        precio_unitario: paquete.costo,
        cantidad: 1,
        descripcion: `Paquete de ${paquete.duracion_dias} días: ${paquete.descripcion}`,
      });

      this.tienePaqueteEnVenta = true;
    },

    eliminarItem(index) {
      const item = this.items_venta[index];
      if (item.tipo === "paquete") {
        this.tienePaqueteEnVenta = false;
        this.promocion_aplicada = null;
      }
      this.items_venta.splice(index, 1);
    },

    async procesarVenta() {
      try {
        this.procesando = true;

        // Simulamos un retraso de red
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (this.items_venta.length === 0) {
          this.mostrarError("Agrega al menos un producto/servicio");
          return;
        }

        if (!this.cliente_id) {
          this.mostrarError("Debes seleccionar un cliente");
          return;
        }

        // Simulamos una respuesta exitosa del servidor
        const referencia = "VNT-" + Math.floor(Math.random() * 10000);

        await Swal.fire({
          title: "¡Venta exitosa! (Modo Demo)",
          html: `
            <p>Referencia: <strong>${referencia}</strong></p>
            <p>Total: <strong>$${this.total_venta.toFixed(2)}</strong></p>
            ${
              this.promocion_aplicada
                ? `<p>Descuento aplicado: $${this.promocion_aplicada.descuento.toFixed(
                    2
                  )}</p>`
                : ""
            }
            <p class="text-muted mt-2">Guardado en la base de datos</p>
          `,
          icon: "success",
          confirmButtonText: "Aceptar",
        });

        this.resetearVenta();
      } catch (error) {
        this.mostrarError("Error en modo demo: " + error.message);
      } finally {
        this.procesando = false;
      }
    },

    resetearVenta() {
      this.items_venta = [];
      this.cliente_id = "";
      this.notas = "";
      this.promocion_aplicada = null;
      this.tienePaqueteEnVenta = false;
    },

    mostrarError(mensaje) {
      Swal.fire({
        title: "Error",
        text: mensaje,
        icon: "error",
        confirmButtonText: "Entendido",
      });
    },

    mostrarAdvertencia(mensaje) {
      Swal.fire({
        title: "Advertencia",
        text: mensaje,
        icon: "warning",
        confirmButtonText: "Entendido",
      });
    },
  },
};
</script>

<style scoped>
:root {
  /* Paleta de colores personalizada */
  --negro-profundo: #02040f;
  --claro-suave: #e5dada;
  --ambar-intenso: #1a1d2b;
  --gris-azul: #333;
  --blanco: #ffffff;
  --negro: #000000;
  --color-exito: #28a745;
  --color-peligro: #dc3545;
  --color-primario: #007bff;
  --color-secundario: #6c757d;
}

/* Contenedor principal */
.container {
  background-color: var(--claro-suave);
  padding: 20px;
  border-radius: 8px;
}

/* Títulos */
h3 {
  color: var(--negro-profundo);
  margin-bottom: 1rem;
}

/* Tarjetas */
.card {
  background-color: var(--blanco);
  border: 1px solid var(--gris-azul);
  border-radius: 8px;
  margin-bottom: 1rem;
}

.card-header {
  background-color: var(--ambar-intenso);
  color: var(--claro-suave);
  padding: 10px 15px;
  border-bottom: 1px solid var(--gris-azul);
}

.card-body {
  padding: 15px;
}

/* Formularios */
.form-label {
  color: var(--negro-profundo);
  margin-bottom: 5px;
  display: block;
}

.form-control,
.form-select,
textarea {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid var(--gris-azul);
  border-radius: 4px;
  background-color: var(--blanco);
  color: var(--negro-profundo);
}

.form-control:focus,
.form-select:focus {
  border-color: var(--ambar-intenso);
  outline: none;
}

/* Lista de items */
.list-group {
  list-style: none;
  padding: 0;
}

.list-group-item {
  padding: 10px 15px;
  border-bottom: 1px solid var(--gris-azul);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Tablas */
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th {
  background-color: var(--ambar-intenso);
  color: var(--claro-suave);
  padding: 10px;
  text-align: left;
}

.table td {
  padding: 10px;
  border-bottom: 1px solid var(--gris-azul);
}

/* Pestañas */
.nav-tabs {
  display: flex;
  border-bottom: 1px solid var(--gris-azul);
  list-style: none;
  padding: 0;
}

.nav-tabs .nav-link {
  padding: 10px 15px;
  border: 1px solid transparent;
  border-bottom: none;
  cursor: pointer;
}

.nav-tabs .nav-link.active {
  background-color: var(--blanco);
  border-color: var(--gris-azul);
  border-bottom-color: var(--blanco);
  color: var(--negro-profundo);
}

.tab-content {
  padding: 15px;
  border: 1px solid var(--gris-azul);
  border-top: none;
}

/* Botones */
.btn {
  display: inline-block;
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  text-align: center;
}

.btn-primary {
  background-color: var(--ambar-intenso);
  color: var(--claro-suave);
}

.btn-success {
  background-color: var(--color-exito);
  color: var(--blanco);
}

.btn-danger {
  background-color: var(--color-peligro);
  color: var(--blanco);
}

.btn-sm {
  padding: 5px 10px;
  font-size: 0.875rem;
}

/* Estado de carga */
.spinner-border {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  vertical-align: middle;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spinner-border 0.75s linear infinite;
}

@keyframes spinner-border {
  to {
    transform: rotate(360deg);
  }
}

/* Textos */
.text-muted {
  color: var(--gris-azul);
}

.text-success {
  color: var(--color-exito);
}

/* Utilidades */
.mt-2 {
  margin-top: 0.5rem;
}
.mt-3 {
  margin-top: 1rem;
}
.mt-4 {
  margin-top: 1.5rem;
}
.mb-3 {
  margin-bottom: 1rem;
}
.mb-4 {
  margin-bottom: 1.5rem;
}
.w-100 {
  width: 100%;
}
.d-flex {
  display: flex;
}
.justify-content-between {
  justify-content: space-between;
}
.align-items-center {
  align-items: center;
}

/* Responsive */
@media (max-width: 768px) {
  .row {
    flex-direction: column;
  }

  .col-md-4,
  .col-md-8 {
    width: 100%;
  }
}
</style>
