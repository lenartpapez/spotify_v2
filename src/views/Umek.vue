<template>
    <div class="component flex flex-wrap">
        <div class="w-1/4 p-4" v-for="track in tracks" :key="track.id">
            <span class="text-sm mr-2">{{ track.name }} <i @click="play(track)" class="fas fa-play-circle text-red-500"></i></span>
            <img class="mt-3 rounded shadow-md w-full" :src="track.album.images[1].url" />
        </div>
    </div>
</template>

<script>
    export default {

      data () {
        return {
          tracks: []
        }
      },

      created () {
        this.getTracks()
      },

      methods: {
        async getTracks () {
          await this.axios.get('https://api.spotify.com/v1/artists/5Hini2nQyoglzpdKe41cZt/top-tracks?country=US')
            .then(response => { this.tracks = response.data.tracks })
        },
        play(song) {
          this.axios.put('/me/player/play?device_id=' + localStorage._spharmony_device_id, {
              uris: [ song.uri ],
            })
          .then(() => {
              this.$store.commit('setSong', song)
              this.$store.commit('setPlaying', true)
          })
        }
      }
    }
</script>