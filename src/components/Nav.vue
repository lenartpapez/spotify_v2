<template>
    <div class="sidenav">
        <input class="bg-gray-800 p-3 mb-3 rounded" v-model="search" placeholder="Search..."/>
        <button class="btn btn-nav mb-3" v-for="route in routes" :key="route.path" v-show="route.label">
            <router-link :to="{ name: route.name }" class="btn btn-nav">{{ route.label }}</router-link>
        </button>
    </div>
</template>

<script>
    import router from '../router'

    export default {

      data () {
        return {
          routes: router.options.routes,
          search: '',
          awaitingSearch: false,
          results: null,
          types: 'album,artist,playlist,track'
        }
      },

      watch: {
        search(val) {
          if (!this.awaitingSearch) {
            setTimeout(() => {
              this.$store.dispatch('fetchResults', { query: this.search, type: this.types, route: this.$route.name })
              this.awaitingSearch = false
            }, 1500)
          }
          this.awaitingSearch = true
        }
      }

    }
</script>