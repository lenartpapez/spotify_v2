import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/css/tailwind.css'
import reactiveStorage from 'vue-reactive-storage'

Vue.use(VueAxios, axios)

axios.defaults.baseURL = 'https://api.spotify.com/v1'

Vue.use(reactiveStorage, {
  access_token: null,
  user: null,
  song: null
});


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
