<template>


  <div class="container mt-4">
    <!-- Encabezado -->
    <div class="encabezado-dashboard d-flex flex-wrap justify-content-between align-items-center p-3 mb-4">
      <div class="saludo">
        <h4 class="m-0">
          Hola, Admin <span class="rol">(Administrador)</span>
        </h4>
      </div>
      <div class="reloj text-end">
        <p class="m-0">Lunes, 16 de julio de 2025</p>
        <p class="m-0">10:45:00</p>
      </div>
    </div>

    <!-- Gráficas en dos columnas -->
    <div class="row mb-4">
      <div class="col-md-6 mb-3">
        <div class="card grafica-blanca h-100">
          <div class="card-body p-2 d-flex flex-column align-items-center justify-content-center">
            <h6 class="card-title d-flex align-items-center mb-2" style="color:#4e6b2e;font-weight:bold;">
              <i class="material-icons me-2" style="font-size:1.2rem;">bar_chart</i>
              Ventas por categoría
            </h6>
            <canvas ref="barrasRef" height="140" style="max-width:100%;"></canvas>
          </div>
        </div>
      </div>
      <div class="col-md-6 mb-3">
        <div class="card grafica-blanca h-100">
          <div class="card-body p-2 d-flex flex-column align-items-center justify-content-center">
            <h6 class="card-title d-flex align-items-center mb-2" style="color:#4e6b2e;font-weight:bold;">
              <i class="material-icons me-2" style="font-size:1.2rem;">pie_chart</i>
              Distribución de productos
            </h6>
            <canvas ref="pastelRef" height="180" width="180" style="max-width:100%;"></canvas>
          </div>
        </div>
      </div>
    </div>
    <!-- Fin de gráficas en dos columnas -->


    <!-- Tarjetas KPI -->
    <div class="row mb-4 align-items-stretch">
      <div class="col-md-3 col-lg-2 mb-3" v-for="(kpi, index) in kpisFormateados" :key="index">
        <div class="card tarjeta-kpi h-100">
          <div class="card-body d-flex align-items-center">
            <i class="material-icons kpi-icon me-3">{{ kpi.icono }}</i>
            <div>
              <h5 class="card-title m-0">{{ kpi.valor }}</h5>
              <p class="card-text small">{{ kpi.titulo }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Fin de tarjetas KPI -->

    <!-- Accesos rápidos -->
    <div class="row mb-4">
      <div class="col-md-3 mb-3" v-for="(acceso, idx) in accesos" :key="idx">
        <a :href="acceso.ruta" class="btn-acceso-grande d-flex flex-column align-items-center justify-content-center">
          <i class="material-icons mb-2">{{ acceso.icono }}</i>
          {{ acceso.label }}
        </a>
      </div>
    </div>
    <!-- Fin accesos rápidos -->

    <!-- Tablas de contexto gym -->
    <div class="row">
      <div class="col-md-6 mb-4">
        <div class="card h-100 tarjeta-tabla">
          <div class="card-body">
            <h5 class="card-title d-flex align-items-center">
              <i class="material-icons me-2">event_busy</i>
              Membresías próximas a vencer
            </h5>
            <div class="tabla-scroll">
              <table class="table table-sm align-middle mb-0">
                <thead>
                  <tr>
                    <th>Cliente</th>
                    <th>Tipo</th>
                    <th>Vence</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Juan Pérez</td>
                    <td>Mensual</td>
                    <td>25/07/2025</td>
                  </tr>
                  <tr>
                    <td>María López</td>
                    <td>Anual</td>
                    <td>28/07/2025</td>
                  </tr>
                  <tr>
                    <td>Carlos Ruiz</td>
                    <td>Mensual</td>
                    <td>30/07/2025</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 mb-4">
        <div class="card h-100 tarjeta-tabla">
          <div class="card-body">
            <h5 class="card-title d-flex align-items-center">
              <i class="material-icons me-2">person_add</i>
              Últimos clientes registrados
            </h5>
            <div class="tabla-scroll">
              <table class="table table-sm align-middle mb-0">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Fecha alta</th>
                    <th>Tipo Membresía</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Laura Gómez</td>
                    <td>20/07/2025</td>
                    <td>Mensual</td>
                  </tr>
                  <tr>
                    <td>Pedro Sánchez</td>
                    <td>19/07/2025</td>
                    <td>Trimestral</td>
                  </tr>
                  <tr>
                    <td>Andrea Torres</td>
                    <td>18/07/2025</td>
                    <td>Anual</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Fin tablas contexto gym -->

    <!-- Productos más vendidos y stock bajo -->
    <div class="row">
      <div class="col-md-6 mb-4">
        <div class="card h-100 tarjeta-tabla">
          <div class="card-body">
            <h5 class="card-title d-flex align-items-center">
              <i class="material-icons me-2">trending_up</i>
              Productos y servicios más vendidos
            </h5>
            <div class="tabla-scroll">
              <table class="table table-sm align-middle mb-0">
                <thead>
                  <tr>
                    <th>Tipo</th>
                    <th>Nombre</th>
                    <th>Cantidad vendida</th>
                    <th>Ingreso total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Producto</td>
                    <td>Termómetro digital</td>
                    <td>120</td>
                    <td>$2,400.00</td>
                  </tr>
                  <tr>
                    <td>Servicio</td>
                    <td>Consulta médica</td>
                    <td>85</td>
                    <td>$8,500.00</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Productos con stock bajo -->
      <div class="col-md-6 mb-4">
        <div class="card h-100 tarjeta-tabla">
          <div class="card-body">
            <h5 class="card-title d-flex align-items-center">
              <i class="material-icons me-2 text-warning">warning</i>
              Productos con stock bajo
            </h5>
            <div class="tabla-scroll">
              <table class="table table-sm align-middle mb-0">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Stock</th>
                    <th>Mínimo</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Paracetamol 500mg</td>
                    <td>8</td>
                    <td>20</td>
                  </tr>
                  <tr>
                    <td>Jeringas 5ml</td>
                    <td>12</td>
                    <td>25</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Fin de tablas -->
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import Chart from 'chart.js/auto'

export default {
  components: {  },
  setup() {
    const barrasRef = ref(null)
    const pastelRef = ref(null)

    onMounted(() => {
      // Gráfica de barras: Ventas por categoría
      new Chart(barrasRef.value, {
        type: 'bar',
        data: {
          labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
          datasets: [{
            label: 'Visitas por día',
            data: [80, 95, 110, 105, 120, 130, 90],
            backgroundColor: [
              '#e59500', '#ffb347', '#ffd580', '#ff9100', '#e59500', '#ffb347', '#ffd580'
            ],
            borderColor: [
              '#b36b00', '#e59500', '#ff9100', '#b36b00', '#b36b00', '#e59500', '#ff9100'
            ],
            borderWidth: 2,
            borderRadius: 8,
            barThickness: 18,
            pointBackgroundColor: '#e59500',
            pointBorderColor: '#fff',
            pointRadius: 5,
            pointHoverRadius: 7
          }]
        },
        options: {
          plugins: {
            legend: { display: false }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { color: '#e59500', font: { size: 10 } },
              grid: { color: '#ffe5b4' }
            },
            x: {
              ticks: { color: '#e59500', font: { size: 10 } },
              grid: { color: '#ffe5b4' }
            }
          }
        }
      })
      // Gráfica de pastel: Distribución de productos
      new Chart(pastelRef.value, {
        type: 'pie',
        data: {
          labels: ['Área Kids Funcional', 'Funcional Adultos', 'Área de Pesas', 'Área de Fisioterapia'],
          datasets: [{
            data: [40, 55, 80, 25],
            backgroundColor: [
              '#e59500', '#ffb347', '#ffd580', '#ff9100'
            ],
            borderColor: [
              '#b36b00', '#e59500', '#ff9100', '#b36b00'
            ],
            borderWidth: 2,
            pointBackgroundColor: '#e59500',
            pointBorderColor: '#fff',
            pointRadius: 6,
            pointHoverRadius: 8
          }]
        },
        options: {
          plugins: {
            legend: {
              labels: { color: '#e59500', font: { weight: 'bold', size: 10 } }
            }
          }
        }
      })
    })

    return { barrasRef, pastelRef }
  },
  data() {
    return {
      kpisFormateados: [
        { titulo: 'Ventas del día', valor: '$1,250.00', icono: 'attach_money' },
        { titulo: 'Ventas del mes', valor: '$32,000.00', icono: 'calendar_today' },
        { titulo: 'Clientes registrados', valor: '182', icono: 'people' },
        { titulo: 'Membresías activas', valor: '95', icono: 'card_membership' },
        { titulo: 'Asistencias hoy', valor: '54', icono: 'how_to_reg' },
        { titulo: 'Membresías por vencer', valor: '7', icono: 'event_busy' },
        
      ],
      accesos: [
        { label: 'Registrar asistencia', icono: 'how_to_reg', ruta: '#' },
        { label: 'Nueva membresía', icono: 'card_membership', ruta: '#' },
        { label: 'Agendar clase grupal', icono: 'event', ruta: '#' },
        { label: 'Nueva venta', icono: 'point_of_sale', ruta: '#' }
      ]
    }
  }
}
</script>

<style scoped>
@import '../assets/colors.css';
.encabezado-dashboard {
  background-color: var(--ambar-intenso);
  border-radius: 8px;
  font-family: 'Nunito Sans', sans-serif;
}

.saludo h4 {
  color: var(--blanco);
  font-weight: 700;
}

.saludo .rol {
  font-size: 0.9rem;
  font-weight: normal;
  color: var(--claro-suave);
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

.kpi-icon {
  font-size: 2.5rem;
  color: var(--ambar-intenso);
}

.tarjeta-tabla {
  background-color: var(--ambar-intenso);
  color: var(--blanco);
  border-radius: 10px;
}

.tarjeta-tabla .card-title i {
  font-size: 1.3rem;
  color: var(--blanco);
}

.tabla-scroll {
  background-color: var(--blanco);
  border-radius: 6px;
  padding: 0.5rem;
  overflow-x: auto;
  color: var(--negro);
}


.btn-acceso-grande {
  background-color: var(--ambar-intenso);
  color: var(--negro-profundo);
  border-radius: 16px;
  padding: 2rem 1rem;
  margin-bottom: 1rem;
  font-weight: 600;
  font-size: 1rem;
  transition: background-color 0.3s ease, transform 0.2s ease;
  min-height: 130px;
  display: block;
  text-decoration: none;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
}

.btn-acceso-grande:hover {
  background-color: var(--claro-suave);
  color: var(--negro-profundo);
  transform: scale(1.02);
}

.btn-acceso-grande i {
  font-size: 2rem;
}

.grafica-blanca {
  background: var(--blanco);
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.07);
  color: var(--negro-profundo);
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.grafica-blanca canvas {
  max-width: 100%;
  display: block;
  margin: 0 auto;
}
</style>
