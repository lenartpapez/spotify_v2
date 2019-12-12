import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    track: {
      artist: '',
      name: '',
      duration: 0,
      image: ''
    },
    playing: false,
    searching: false,
    latestSearchResults: {
      tracks: { items: [] },
      albums: { items: [] },
      artists: { items: [] },
      playlists: { items: [] }
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setTrack(state, params) {
      state.track.artist = params.track.artists[0].name
      state.track.name = params.track.name
      state.track.duration = params.duration
    },
    logout(state) {
      localStorage.clear()
      state.user = {}
      router.go()
    },
    togglePlaying(state) {
      state.playing = !state.playing
    },
    setSearchResults(state, results) {
      state.latestSearchResults = results
      state.searching = false
    }
  },
  actions: {
    async setUserAction({ commit }) {
      await Axios.get('/me').then(response => commit('setUser', response.data))
    },
    async fetchResults({ commit, state }, params) {
      state.searching = true
      let response = await Axios.get('search?query=' + params.query + '&type=' + params.type + '&limit=10')
      commit('setSearchResults', response.data)
    },
    async play({ commit, state }, params) {
      if(params.type === 'playlists' || params.type === 'albums') {
        let response = await Axios.get(params.type + '/' + params.toPlay.id + '/tracks')
        Axios.put('/me/player/play?device_id=' + localStorage._spharmony_device_id, {
          uris: response.data.items.map(item => item.track.uri)
        })
      } else if(params.type === 'artists') {
        let response = await Axios.get(params.type + '/' + params.toPlay.id + '/top-tracks?country=' + state.user.country)
        Axios.put('/me/player/play?device_id=' + localStorage._spharmony_device_id, {
          uris: response.data.tracks.map(track => track.uri)
        })
      } else {
        Axios.put('/me/player/play?device_id=' + localStorage._spharmony_device_id, {
          uris: [ params.track.uri ]
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
    trackName: state => {
      return state.track.name
    },
    trackArtist: state => {
      return state.track.artist
    },
    trackImage: state => {
      return state.track.image
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
    searching: state => {
      return state.searching
    },
    hasTracks: state => {
      return state.latestSearchResults.tracks.items.length > 0
    },
    hasAlbums: state => {
      return state.latestSearchResults.albums.items.length > 0
    },
    hasArtists: state => {
      return state.latestSearchResults.artists.items.length > 0
    },
    hasPlaylists: state => {
      return state.latestSearchResults.playlists.items.length > 0
    }
  }
})
