import { createRouter, createWebHistory } from 'vue-router'

import login from '../views/login.vue'
import landing     from '../views/admin.vue'
import Navbar from '../components/Navbar.vue'



const routes = [
  { path: '/',          redirect: '/admin' },
  { path: '/admin',     component: landing },
  { path: '/navbar',     component: Navbar },
  { path: '/login',     component: login },

]

const router = createRouter({
  history: createWebHistory(),
  routes
})



export default router
