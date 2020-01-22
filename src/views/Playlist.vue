<template>
  <div class="p-5 flex">
    <button @click="$router.go(-1)" class="absolute z-50 h-12 w-12 rounded-full text-white bg-gray-500">
      <i class="fas fa-chevron-left" style="margin-left: -.2rem; margin-top: .2rem; font-size: 1.4rem"></i>
    </button>
    <div class="flex w-1/3 self-start sticky mr-5 p-10 flex-col items-center text-center" v-if="playlist" style="top: 1.25rem">
      <img class="rounded-full mb-4 shadow-lg" :src="playlist.images[0] ? playlist.images[0].url : '/img/no-cover.png'" alt="">
      <span class="font-bold text-xl">{{ playlist.name }}</span>
      <span class="text-sm text text-gray-700 mb-4">{{ playlist.owner.display_name }}</span>
      <button class="bg-red-500 px-6 py-3 rounded-r-full rounded-l-full text-white mb-4" @click="playPlaylist(playlist)">Play</button>
      <span class="text-sm text text-gray-700 mb-4">{{ playlist.description }}</span>
      <span class="text-sm font-bold text text-gray-700">{{ tracks.items.length }} songs</span>
    </div>
    <div class="flex flex-col p-10 w-2/3">
      <div class="flex flex bg-gray-200 mb-1 items-center" v-for="(item, index) in tracks.items" :key="index">
        <button class="rounded-full px-4" @click="playTrack(index)">
          <i class="fas fa-play text-red-500 text-xs"></i>
        </button>
        <div class="flex flex-col py-2">
          <span class="text-sm">{{ item.track.name }}</span>
          <div>
            <span v-for="(artist, index) in item.track.artists" :key="index" class="text-gray-600 text-sm mr-1">{{ artist.name }} {{ index !== item.track.artists.length - 1 ? '&bull;' : '' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        playlist: null,
        tracks: {
          items: []
        }
      }
    },

    async created() {
      let response = await this.axios.get('playlists/' + this.$route.params.id)
      this.playlist = response.data
      response = await this.axios.get('/playlists/' + this.$route.params.id + '/tracks')
      this.tracks = response.data
    },

    methods: {
      playPlaylist() {
        this.$store.dispatch('play', { type: 'playlists', uri: this.playlist.uri, offset: 0 })
      },
      playTrack(index) {
        this.$store.dispatch('play', { type: 'playlists', uri: this.playlist.uri, offset: index })
      }
    }
  }
</script>