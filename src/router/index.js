import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'front',
    label: 'Home',
    component: require('@/views/Front.vue').default
  },
  {
    path: '/umek',
    name: 'umek',
    label: 'Umek',
    component: require('@/views/Umek.vue').default
  },
  {
    path: '*',
    component: require('@/components/HandleAuth.vue').default
  }
]

const router = new VueRouter({
  routes
})

export default router
