import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    currentSong: null,
    playing: false
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    clearUser(state) {
      state.user = null
    },
    setSong(state, song) {
      state.currentSong = song
    },
    logout(state) {
      localStorage.clear()
      state.user = null
    },
    setPlaying(state, status) {
      state.playing = status
    }
  },
  actions: {
    async setUserAction({ commit }) {
      await Axios.get('/me').then(response => commit('setUser', response.data))
    }
  },
  modules: {
  },
  getters: {
    userName: state => {
      return state.user.display_name
    },
    currentSong: state => {
      return state.currentSong.artists[0].name + ': ' + state.currentSong.name
    },
    playing: state => {
      return state.playing
    }
  }
})
