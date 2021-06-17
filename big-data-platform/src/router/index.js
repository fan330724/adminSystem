import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component: () => import('../views/first/index.vue')
  },
  {
    path: '/first',
    name: 'First',
    component: () => import('../views/first/index.vue')
  },
  {
    path: '/bPart',
    name: 'BPart',
    component: () => import('../views/B-part/index.vue')
  },
  {
    path: '/cPart',
    name: 'CPart',
    component: () => import('../views/C-part/index.vue')
  },
  {
    path: '/parkDetail',
    name: 'ParkDetail',
    component: () => import('../views/park-detail/index.vue')
  }
]
const router = new VueRouter({
  // mode: "history",
  routes
})

export default router