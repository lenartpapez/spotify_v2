<template>
  <div class="flex h-20 p-6 justify-between items-center bg-gray-800">
    <div style="height: 3.5rem">
      <img class="h-full" src="/img/vue-music.png" />
    </div>
    <div class="flex">
      <div v-if="localStorage.access_token">
        <span class="text-white font-semibold mr-3" v-if="$store.state.user"> {{ $store.getters.userName }} </span>
        <button @click="logout" class="btn text-white bg-red-500 hover:bg-red-700">
           Logout
        </button>
      </div>
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

      authorize () {
        window.location.replace(this.auth_uri + '?client_id=' + this.client_id +
      '&response_type=token&scope=' + this.scope + '&redirect_uri=' +
        this.redirect_uri + '&show_dialog=true')
      },

      logout () {
        this.$store.commit('logout')
        this.$router.go()
      }
      
    }

  }
</script>

<style>

</style>
