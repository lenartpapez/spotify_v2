import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'front',
    label: 'Home',
    icon: 'fa fa-home',
    component: require('@/views/Front.vue').default
  },
  {
    path: '/search',
    name: 'search-results',
    label: 'Search',
    icon: 'fa fa-search',
    component: require('@/views/SearchResults.vue').default
  },
  /* {
    path: '/umek',
    name: 'umek',
    label: 'Umek',
    meta: {
      auth: true
    },
    component: require('@/views/Umek.vue').default
  }, */
  {
    path: '*',
    component: require('@/components/HandleAuth.vue').default
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.auth)) {
    if (localStorage.access_token) {
      next()
      return
    }
    next('/') 
  } else {
    next() 
  }
})

export default router
