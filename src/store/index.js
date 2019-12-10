import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    currentlyPlaying: null,
    playing: false,
    loading: false,
    latestSearchResults: null
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    clearUser(state) {
      state.user = null
    },
    setCurrentlyPlaying(state, item) {
      state.currentlyPlaying = item
    },
    logout(state) {
      localStorage.clear()
      router.go()
      state.user = null
    },
    togglePlaying(state) {
      state.playing = !state.playing
    },
    setSearchResults(state, results) {
      state.latestSearchResults = results
      state.loading = false
    },
    toggleLoading(state) {
      state.loading = !state.loading
    }
  },
  actions: {
    async setUserAction({ commit }) {
      await Axios.get('/me').then(response => commit('setUser', response.data))
    },
    async fetchResults({ commit }, params) {
      commit('toggleLoading')
      let response = await Axios.get('search?query=' + params.query + '&type=' + params.type + '&limit=10')
      commit('setSearchResults', response.data)
      if(params.route !== 'search-results') {
        router.push({ name: 'search-results'})
      }
    },
    async play({ commit, state }, params) {
      if(params.type === 'playlist') {
        let response = await Axios.get('/playlists/' + params.playlist.id + '/tracks')
        Axios.put('/me/player/play?device_id=' + localStorage._spharmony_device_id, {
          uris: response.data.items.map(item => item.track.uri)
        }).then(() => {
          let firstTrack = response.data.items[0].track
          commit('setCurrentlyPlaying', '[' + params.playlist.name + '] ' + firstTrack.artists[0].name + ' - ' + firstTrack.name)
        })
      } else {
        Axios.put('/me/player/play?device_id=' + localStorage._spharmony_device_id, {
          uris: [ params.track.uri ]
        })
        .then(() => {
          commit('setCurrentlyPlaying', params.track.artists[0].name + ' - ' + params.track.name)
        })
      }
      if (!state.playing) commit('togglePlaying')
    }
  },
  modules: {
  },
  getters: {
    userName: state => {
      return state.user.display_name
    },
    getCurrentlyPlaying: state => {
      return state.currentlyPlaying
    },
    playing: state => {
      return state.playing
    },
    artistsSearch: state => {
      return state.latestSearchResults.artists
    },
    albumsSearch: state => {
      return state.latestSearchResults.albums
    },
    playlistsSearch: state => {
      return state.latestSearchResults.playlists
    },
    tracksSearch: state => {
      return state.latestSearchResults.tracks
    },
    loading: state => {
      return state.loading
    },
    hasResults: state => {
      return state.latestSearchResults !== null
    }
  }
})
