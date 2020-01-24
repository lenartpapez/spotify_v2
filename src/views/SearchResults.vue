<template>
    <div>
        <div class="search-and-type">
          <input class="bg-transparent outline-none w-full mr-3 shadow-none" v-model="query" placeholder="Type to search..." />
          <div class="types flex">
            <label v-for="type in types" :key="type" class="flex items-center text-white">
              <input class="mr-1" type="checkbox" :value="type" v-model="selectedTypes">
              <span class="text-xs mt-1 mr-3">
                {{ type | capitalize }}s
              </span>
            </label>
          </div>
        </div>
        <div class="pt-12">
            <div class="loader" v-if="searching">
              <double-bounce></double-bounce>
            </div>
            <div :class="{'opacity-10': searching }">
              <tracks v-if="hasTracks" :data="searchResults.tracks" />
              <playlists v-if="hasPlaylists" :data="searchResults.playlists" />
              <artists v-if="hasArtists" :data="searchResults.artists" />
              <albums v-if="hasAlbums" :data="searchResults.albums" />
            </div>
        </div>
    </div>
</template>

<script>

import Artists from '../components/searching/Artists'
import Albums from '../components/searching/Albums'
import Tracks from '../components/searching/Tracks'
import Playlists from '../components/searching/Playlists'
import { DoubleBounce } from 'vue-loading-spinner'
import { mapGetters } from 'vuex'

export default {

    components: {
        Artists,
        Tracks,
        Albums,
        Playlists,
        DoubleBounce
    },

    data() {
        return {
            query: this.$route.query.q ? this.$route.query.q : undefined,
            awaitingSearch: false,
            results: null,
            types: ['track', 'playlist', 'artist', 'album'],
            selectedTypes: [],
        }
    },

    created() {
      this.selectedTypes = this.types
    },

    watch: {
        query(val) {
          this.$router.push({ query: { q: val }})
          if(val) {
            this.search()
          }
        },
        '$route.query.q': {
          immediate: true,
          handler(val) {
            this.query = val
          }
        },
        selectedTypes() {
          if(this.query !== undefined) this.search()
        }
      },

      filters: {
        capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
      },

      methods: {
        search() {
          if (!this.awaitingSearch) {
            setTimeout(() => {
                this.$store.dispatch('fetchAllResults', { query: this.query, type: this.selectedTypes.join(',') })
                this.awaitingSearch = false
            }, 1500)
          }
          this.awaitingSearch = true
        }
      },

      computed: {

        ...mapGetters([
          'hasTracks',
          'hasAlbums',
          'hasPlaylists',
          'hasArtists',
          'searching',
          'searchResults',
          'alertInfo'
        ])

      }
    
}
</script>