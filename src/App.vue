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
      if(this.localStorage.access_token) {
        this.$store.dispatch('setUserAction')
        this.$store.dispatch('fetchUserPlaylists')
      }
      window.onSpotifyWebPlaybackSDKReady = () => {
        this.initializePlayer()
      };
    },

    methods: {
      initializePlayer() {
        const player = new Spotify.Player({
          name: 'VueMusic Player',
          getOAuthToken: cb => { cb(localStorage.access_token.slice(1, -1)); },
          volume: '0.5'
        });

        player.addListener('player_state_changed', ({ duration, position, track_window: { current_track, next_tracks } }) => { 
          this.$store.commit('setTrack', { track: current_track, duration: duration, allow_controls: true })
        });

        player.connect();
        window.player = player
      },

      setInterceptor() {
        this.axios.interceptors.response.use((response) => {
          if(this.searching) this.$store.commit('toggleSearching')
          return response;
        }, (error) => {
          if(error.response.status === 401) {
            this.$store.commit('logout')
          } else {
            this.$store.commit('setResults', {})
            this.$store.commit('setAlertInfo', { display: true, status: 'error', message: error.response.data.error.message })
          }
          return Promise.reject(error);
        });
      }
    },

    computed: {
      ...mapGetters(['searching'])
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