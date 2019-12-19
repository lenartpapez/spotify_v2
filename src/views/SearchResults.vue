<template>
    <div>
        <div class="flex justify-between bg-gray-800 p-3 text-white absolute w-full rounded-t z-50" style="width: calc(100vw - 18rem)">
          <input class="bg-transparent outline-none w-full mr-3 shadow-none" v-model="query" placeholder="Type to search..."/>
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
            <div class="loader" v-if="$store.getters.searching">
              <double-bounce></double-bounce>
            </div>
            <div :class="{'opacity-10': $store.getters.searching }" v-if="!$store.getters.errorStatus">
              <tracks v-if="$store.getters.hasTracks" :data="$store.getters.tracksSearch" />
              <playlists v-if="$store.getters.hasPlaylists" :data="$store.getters.playlistsSearch" />
              <artists v-if="$store.getters.hasArtists" :data="$store.getters.artistsSearch" />
              <albums v-if="$store.getters.hasAlbums" :data="$store.getters.albumsSearch" />
            </div>
            <div v-else class="bg-red-100 border-b-2 border-red-500 text-red-900 px-4 py-3" role="alert">
              <div class="flex">
                <div class="py-1"><svg class="fill-current h-6 w-6 text-red-500 mr-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z"/></svg></div>
                <div>
                  <p class="font-bold">Trouble getting results</p>
                  <p class="text-sm">{{ $store.getters.errorMessage }}</p>
                </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script>

import Artists from '../components/Artists'
import Albums from '../components/Albums'
import Tracks from '../components/Tracks'
import Playlists from '../components/Playlists'
import { DoubleBounce } from 'vue-loading-spinner'

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
            selectedTypes: []
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
                this.$store.dispatch('fetchResults', { query: this.query, type: this.selectedTypes.join(','), route: this.$route.name })
                this.awaitingSearch = false
              }
            }, 1500)
          }
          this.awaitingSearch = true
        }
      }
    
}
</script>