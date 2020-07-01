<template>
  <div id="app">
    <app-header></app-header>
    <div class="flex">
      <app-nav></app-nav>
      <div class="wrapper">
          <transition
            name="fade"
            mode="out-in">
            <router-view/>
          </transition>
      </div>
    </div>
    <app-footer></app-footer>
    <alert></alert>
  </div>
</template>

<script>

  import Header from './components/layout/Header'
  import Nav from './components/layout/Nav'
  import Footer from './components/layout/Footer'
  import Alert from './components/common/Alert'
  import { mapGetters } from 'vuex'

  export default {

    components: {
      'app-header': Header,
      'app-nav': Nav,
      'app-footer': Footer,
      'alert': Alert
    },

    created() {
      this.setInterceptor()
      let query = this.$route.query
      let start = false
      if(query.access_token && query.refresh_token) {
        localStorage.access_token = query.access_token
        localStorage.refresh_token = query.refresh_token
        start = true
      }
      if(query.access_token && !query.refresh_token) {
        localStorage.access_token = query.access_token
        start = true
      }
      if(!query.access_token && localStorage.access_token) {
        start = true
      }
      if(start) { 
        this.startTheApp()
        if(query.access_token) this.$router.push('/')
      }
    },

    methods: {
      initializePlayer() {
        const player = new Spotify.Player({
          name: 'VueMusic Player',
          getOAuthToken: async cb => {
            if(localStorage.refresh_token) await this.refreshToken()
            cb(localStorage.access_token)
            if(this.track.uri) {
              this.$store.dispatch('play', { type: this.track.type, uri: this.track.uri, offset: 0 })
            }
          },
          volume: '0.5'
        });

        player.addListener('player_state_changed', ({ duration, position, track_window: { current_track, previous_tracks }, context }) => {
          if(current_track.uri !== this.$store.getters.track.uri) {
            this.$store.commit('setTrack', { track: current_track, duration: duration, type: context.uri ? context.uri.split(':')[1] + 's' : 'tracks', uri: context.uri ? context.uri : current_track.uri })
          }
        });

        player.connect();
        window.player = player
      },

      startTheApp() {
        this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.access_token
        this.$store.dispatch('setUserAction')
        this.$store.dispatch('fetchUserPlaylists')
        window.onSpotifyWebPlaybackSDKReady = () => {
          this.initializePlayer()
        };
      },

      setInterceptor() {
        this.axios.interceptors.response.use((response) => {
          if(this.searching) this.$store.commit('toggleSearching')
          return response;
        }, (error) => {
          if(error.response.status === 401 && !localStorage.refresh_token) {
              this.$store.commit('logout')
          } else {
            this.$store.commit('setResults', {})
            this.$store.commit('setAlertInfo', { display: true, status: 'error', message: error.response.data.error.message })
          }
          return Promise.reject(error);
        });
      },

      refreshToken() {
        this.axios.post('http://spotify-backend.test/api/auth/refresh', {
          refresh_token: localStorage.refresh_token
        }).then(response => {
            localStorage.access_token = response.data.access_token
            this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token
        })
      }

    },

    computed: {
      ...mapGetters(['searching', 'track'])
    },

  }

</script>

<style>

  .fade-enter-active,
  .fade-leave-active {
    transition-duration: 0.2s;
    transition-property: opacity;
    transition-timing-function: ease;
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }
  
</style>