<template>
  <div id="app">
    <app-header></app-header>
    <div class="flex">
      <app-nav></app-nav>
      <div class="wrapper">
          <transition
            name="fade"
            mode="out-in">
            <router-view/>
          </transition>
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
      this.axios.interceptors.response.use((response) => {
        return response;
      }, (error) => {
        if(error.response.status === 401) {
          this.$store.commit('logout')
        }
        return Promise.reject(error);
      });
      if(this.localStorage.access_token) this.$store.dispatch('setUserAction')
    }

  }

</script>

<style>

  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.2s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
  
</style>