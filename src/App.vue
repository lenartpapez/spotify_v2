<template>
  <div id="app">
    <app-header></app-header>
    <div class="flex">
      <app-nav></app-nav>
      <div class="wrapper">
          <router-view></router-view>  
      </div>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>

  import Header from './components/Header'
  import Nav from './components/Nav'
  import Footer from './components/Footer'

  export default {

    components: {
      'app-header': Header,
      'app-nav': Nav,
      'app-footer': Footer
    },
    

    created() {

      if(this.localStorage.access_token) this.$store.dispatch('setUserAction')

      this.axios.interceptors.response.use(undefined, function (err) {
        return new Promise(function (resolve, reject) {
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            this.$store.commit('logout')
          }
          throw err;
        });
      })
    }

  }

</script>