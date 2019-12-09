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

    mounted() {
      this.localStorage.song = null
      /* if(this.localStorage.access_token && this.localStorage.expires_at < +this.$moment()) {
        this.localStorage = {}
        this.localStorage.auth = false
      } */
    }

  }
</script>