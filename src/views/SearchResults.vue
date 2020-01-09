<template>
    <div>
        <div class="search-and-type">
          <input class="bg-transparent outline-none w-full mr-3 shadow-none" v-model="query" :placeholder="placeholder" />
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
            <div :class="{'opacity-10': searching }" v-if="!error.status">
              <tracks v-if="hasTracks" :data="searchResults.tracks" />
              <playlists v-if="hasPlaylists" :data="searchResults.playlists" />
              <artists v-if="hasArtists" :data="searchResults.artists" />
              <albums v-if="hasAlbums" :data="searchResults.albums" />
            </div>
            <div v-else class="bg-red-100 border-b-2 border-red-500 text-red-900 px-4 py-3" role="alert">
              <div class="flex">
                <div class="py-1"><svg class="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                <div>
                  <p class="font-bold">Trouble getting results</p>
                  <p class="text-sm">{{ error.message }}</p>
                </div>
              </div>
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
            query: '',
            awaitingSearch: false,
            results: null,
            types: ['track', 'playlist', 'artist', 'album'],
            selectedTypes: [],
        }
    },

    created() {
      this.$store.commit('setError', { status: false, message: '' })
      this.selectedTypes = this.types
    },

    watch: {
        query() {
          this.search()
        },
        selectedTypes() {
          if(this.query !== '') this.search()
        }
      },

      filters: {
        capitalize(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }
      },

      methods: {
        search(val) {
          if (!this.awaitingSearch) {
            setTimeout(() => {
              if(val !== '') {
                this.$store.commit('setSearchQuery', this.query)
                this.$store.dispatch('fetchAllResults', { query: this.searchQuery, type: this.selectedTypes.join(',') })
                this.awaitingSearch = false
              }
            }, 1500)
          }
          this.awaitingSearch = true
        }
      },

      computed: {

        ...mapGetters([
          'searchQuery',
          'hasTracks',
          'hasAlbums',
          'hasPlaylists',
          'hasArtists',
          'searching',
          'searchResults',
          'error'
        ]),

        placeholder() {
          return this.searchQuery !== '' ? this.searchQuery : 'Type to search...'
        },

      }
    
}
</script>