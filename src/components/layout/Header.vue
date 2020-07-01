<template>
  <div class="flex h-16 p-6 justify-between items-center bg-gray-800">
    <div style="height: 2.5rem">
      <router-link :to="{ name: 'front' }">
        <img class="h-full" src="/img/vue-music.png" />
      </router-link>
    </div>
    <div class="flex">
      <div v-if="user">
        <span class="text-white font-semibold mr-3"> {{ user.display_name }} </span>
        <button @click="logout" class="btn text-white bg-red-500 hover:bg-red-700">
            Logout
        </button>
      </div>
      <a href="http://spotify-backend.test/auth" v-else class="btn text-white bg-red-500 hover:bg-red-700">
        Login
      </a>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {

    methods: {

      logout () {
        this.$store.commit('logout')
        this.$router.go()
      }
      
    },

    computed: {
      ...mapGetters(['user'])
    }

  }
</script>

<style>

</style>
