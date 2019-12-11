<template>
    <div>
        <input class="bg-gray-800 p-3 text-white absolute w-full rounded-t" style="width: calc(100vw - 18rem)" v-model="search" placeholder="Search..."/>
        <div class="pt-12" v-if="$store.getters.hasResults">
            <tracks :data="$store.getters.tracksSearch" />
            <artists :data="$store.getters.artistsSearch" />
            <albums :data="$store.getters.albumsSearch" />
            <playlists :data="$store.getters.playlistsSearch" />
        </div>
    </div>
</template>

<script>

import Artists from '../components/Artists'
import Albums from '../components/Albums'
import Tracks from '../components/Tracks'
import Playlists from '../components/Playlists'

export default {

    components: {
        Artists,
        Tracks,
        Albums,
        Playlists
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
              this.$store.dispatch('fetchResults', { query: this.search, type: this.types, route: this.$route.name })
              this.awaitingSearch = false
            }, 1500)
          }
          this.awaitingSearch = true
        }
      }
    
}
</script>