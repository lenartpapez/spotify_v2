import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "front",
    label: "Home",
    icon: "fa fa-home",
    component: require("@/views/Front.vue").default
  },
  {
    path: "/search",
    name: "search-results",
    label: "Search",
    icon: "fa fa-search",
    meta: {
      auth: true
    },
    component: require("@/views/SearchResults.vue").default
  },
  {
    path: "/my-playlists", 
    name: "my-playlists",
    label: "My Playlists",
    icon: "fa fa-headphones",
    meta: {
      auth: true
    },
    component: require("@/views/UserPlaylists.vue").default
  },
  {
    path: "/playlists/:id",
    name: "playlist",
    meta: {
      auth: true
    },
    component: require("@/views/Playlist.vue").default
  },
  {
    path: "*",
    component: require("@/components/HandleAuth.vue").default
  }
];

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
