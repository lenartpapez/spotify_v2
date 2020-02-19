import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    userPlaylists: {
      items: []
    },
    track: {
      artist: '',
      name: '',
      duration: 0,
      position: 0,
      image: '',
      allowControls: false
    },
    playing: false,
    searching: false,
    latestSearchResults: {
      albums: { items: [] },
      artists: { items: [] },
      playlists: { items: [] },
      tracks: { items: [] }
    },
    alertInfo: {
      display: false,
      status: '',
      message: ''
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
      state.track.image = params.track.album.images[0].url
      state.track.allowControls = params.allow_controls
    },
    logout(state) {
      localStorage.clear()
      state.user = {}
      router.go()
    },
    togglePlaying(state) {
      state.playing = !state.playing
    },
    setResults(state, results) {
      state.latestSearchResults = results
      state.searching = false
    },
    setPaginatedResults(state, params) {
      state.latestSearchResults[params.type] = params.results
      state.searching = false
    },
    setUserPlaylists(state, results) {
      state.userPlaylists = results
    },
    setAlertInfo(state, alertInfo) {
      state.alertInfo = alertInfo
    },
    toggleSearching(state) {
      state.searching = !state.searching
    }
  },
  actions: {
    async setUserAction({ commit }) {
      await Axios.get('/me').then(response => commit('setUser', response.data))
    },
    async fetchUserPlaylists({ commit }) {
      await Axios.get('/me/playlists').then(response => commit('setUserPlaylists', response.data))
    },
    async fetchAllResults({ commit }, params) {
      await Axios.get('search?query=' + params.query + '&type=' + params.type + '&limit=10')
      .then(response => {
        commit('setResults', response.data)
      })
    },
    async fetchPaginated({ commit, getters }, params) {
      commit('toggleSearching')
      let type = params.type + 's'
      let request = getters.searchResults[type].next
      if(params.previous) request = getters.searchResults[type].previous
      if(params.first) request = 'search?query=' + params.query + '&type=' + params.type + '&offset=0&limit=10'
      if(params.last) request = 'search?query=' + params.query + '&type=' + params.type + '&offset=' + params.offset + '&limit=10'
      let response = await Axios.get(request)
      commit('setPaginatedResults', { type: type, results: response.data[type] })
    },
    async play({ commit, state }, params) {
      if(params.type !== 'tracks') {
        let data = { context_uri: params.uri, offset: { position: params.offset } }
        if(params.type === 'artists') data = { context_uri: params.uri }
        Axios.put('/me/player/play?device_id=' + localStorage._spharmony_device_id, data)
      } else {
        Axios.put('/me/player/play?device_id=' + localStorage._spharmony_device_id, {
          uris: [ params.uri ]
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
    userId: state => {
      return state.user.id
    },
    track: state => {
      return state.track
    },
    playing: state => {
      return state.playing
    },
    searchResults: state => {
      return state.latestSearchResults
    },
    searching: state => {
      return state.searching
    },
    hasTracks: state => {
      return state.latestSearchResults.tracks && state.latestSearchResults.tracks.items.length > 0
    },
    hasAlbums: state => {
      return state.latestSearchResults.albums && state.latestSearchResults.albums.items.length > 0
    },
    hasArtists: state => {
      return state.latestSearchResults.artists && state.latestSearchResults.artists.items.length > 0
    },
    hasPlaylists: state => {
      return state.latestSearchResults.playlists && state.latestSearchResults.playlists.items.length > 0
    },
    alertInfo: state => {
      return state.alertInfo
    },
    allowControls: state => {
      return state.track.allowControls
    },
    pagingInfo: state => type => {
      return { 
        offset: state.latestSearchResults[type].offset,
        page: state.latestSearchResults[type].offset / state.latestSearchResults[type].limit + 1, 
        limit: state.latestSearchResults[type].limit,
        total: state.latestSearchResults[type].total
      }
    },
    userPlaylists: state => {
      return state.userPlaylists
    }
  }
})
