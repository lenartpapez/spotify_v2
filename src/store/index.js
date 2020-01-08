import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
import router from '../router'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchQuery: '',
    user: {},
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
    error: {
      status: false,
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
    setSearchQuery(state, query) {
      state.searchQuery = query
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
    setTracks(state, results) {
      state.latestSearchResults.tracks = results
      state.searching = false
    },
    setPlaylists(state, results) {
      state.latestSearchResults.playlists = results
      state.searching = false
    },
    setAlbums(state, results) {
      state.latestSearchResults.albums = results
      state.searching = false
    },
    setArtists(state, results) {
      state.latestSearchResults.artists = results
      state.searching = false
    },
    setError(state, error) {
      state.error = error
    },
    toggleSearching(state) {
      state.searching = !state.searching
    }
  },
  actions: {
    async setUserAction({ commit }) {
      await Axios.get('/me').then(response => commit('setUser', response.data))
    },
    async fetchAllResults({ commit, state, getters }, params) {
      state.searching = true
      await Axios.get('search?query=' + getters.searchQuery + '&type=' + params.type + '&limit=10')
      .then(response => {
        commit('setResults', response.data)
      })
    },
    async fetchPaginated({ commit, state, getters }, params) {
      state.searching = true
      await Axios.get('search?query=' + getters.searchQuery + '&type=' + params.type + '&limit=10&offset=' + params.offset)
      .then(response => {
        switch(params.type) {
          case 'track': 
            commit('setTracks', response.data.tracks)
            break
          case 'playlist': 
            commit('setPlaylists', response.data.playlists)
            break
          case 'album': 
            commit('setAlbums', response.data.albums)
            break
          case 'artist': 
            commit('setArtists', response.data.artists)
            break
        }
        
      })
    },
    async play({ commit, state }, params) {
      if(params.type === 'playlists' || params.type === 'albums') {
        Axios.put('/me/player/play?device_id=' + localStorage._spharmony_device_id, {
          context_uri: params.uri,
          offset: {
            position: params.offset
          }
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
    trackDuration: state => {
      return state.track.duration
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
    errorStatus: state => {
      return state.error.status
    },
    errorMessage: state => {
      return state.error.message
    },
    allowControls: state => {
      return state.track.allowControls
    },
    searchQuery: state => {
      return state.searchQuery
    },
    trackPages: state => {
      return { 
        page: state.latestSearchResults.tracks.offset, 
        limit: state.latestSearchResults.tracks.limit,
        total: state.latestSearchResults.tracks.total
      }
    },
    albumPages: state => {
      return { 
        page: state.latestSearchResults.albums.offset, 
        limit: state.latestSearchResults.albums.limit,
        total: state.latestSearchResults.albums.total
      }
    },
    artistPages: state => {
      return { 
        page: state.latestSearchResults.artists.offset, 
        limit: state.latestSearchResults.artists.limit,
        total: state.latestSearchResults.artists.total
      }
    },
    playlistPages: state => {
      return { 
        page: state.latestSearchResults.playlists.offset, 
        limit: state.latestSearchResults.playlists.limit,
        total: state.latestSearchResults.playlists.total
      }
    },
  }
})
