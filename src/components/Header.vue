<template>
  <div class="flex h-20 p-6 justify-between items-center bg-gray-800">
    <img class="h-12" src="../assets/img/vue-music.png" />
    <div class="flex">
      <button v-if="localStorage.access_token" @click="logout" class="btn text-white bg-red-500 hover:bg-red-700">
           Logout
      </button>
      <button v-else @click="authorize" class="btn text-white bg-red-500 hover:bg-red-700">
           Login
      </button>
    </div>
  </div>
</template>

<script>
  export default {

    data () {
      return {
        auth_uri: 'https://accounts.spotify.com/authorize',
        client_id: '638f3dcd9fef4cd9a6490e0e4740d1bb',
        scope: 'streaming user-read-playback-state user-read-private user-read-email user-modify-playback-state',
        redirect_uri: 'http://localhost:8081'
      }
    },

    methods: {

      login() {
        this.axios.get('http://localhost:8000/api/login')
        .then(response => {
          this.localStorage.access_token = response.data.access_token
        })
      },

      authorize () {
        window.location.replace(this.auth_uri + '?client_id=' + this.client_id +
      '&response_type=token&scope=' + this.scope + '&redirect_uri=' +
        this.redirect_uri + '&show_dialog=true')
      },

      logout () {
        this.localStorage = {}
        this.localStorage.auth = false
        this.$router.go()
      }
      
    }
  }
</script>

<style>

</style>
