import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/css/tailwind.css'
import reactiveStorage from 'vue-reactive-storage'
import VueSlider from "vue-slider-component"
import "vue-slider-component/theme/antd.css"
import VueHoverMask from 'vue-hover-mask'

Vue.use(VueAxios, axios)

axios.defaults.baseURL = 'https://api.spotify.com/v1'

const token = localStorage.access_token
if(token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token.slice(1, -1)
}

Vue.use(reactiveStorage, {
  access_token: null
});

Vue.use(require('vue-moment'));

Vue.component("VueSlider", VueSlider);

Vue.component(VueHoverMask.name, VueHoverMask)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
