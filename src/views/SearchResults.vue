<template>
    <div>      
        <input class="bg-gray-800 p-3 text-white absolute w-full rounded-t" style="width: calc(100vw - 18rem)" v-model="search" placeholder="Type to search..."/>
        <div class="pt-12">
            <div class="loader" v-if="$store.getters.searching">
              <double-bounce></double-bounce>
            </div>
            <div :class="{'opacity-10': $store.getters.searching }">
              <tracks v-if="$store.getters.hasTracks" :data="$store.getters.tracksSearch" />
              <artists v-if="$store.getters.hasArtists" :data="$store.getters.artistsSearch" />
              <albums v-if="$store.getters.hasAlbums" :data="$store.getters.albumsSearch" />
              <playlists v-if="$store.getters.hasPlaylists" :data="$store.getters.playlistsSearch" />
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
              if(val !== '') {
                this.$store.dispatch('fetchResults', { query: this.search, type: this.types, route: this.$route.name })
                this.awaitingSearch = false
              }
            }, 1500)
          }
          this.awaitingSearch = true
        }
      }
    
}
</script>