<template>
  <div class="p-5">
    <button class="btn text-white bg-red-500 hover:bg-red-700 mb-2" @click="openModal">Create new</button>
    <div v-if="userPlaylists.items.length === 0">
      <span class="text-gray-600 text-sm block">No playlists.</span>
    </div>
    <div v-else>
      <playlists class="mb-10" @edit="openModal($event)" :data="nonEmptyPlaylists" :user="true" />
      <span class="text-2xl">Empty playlists</span>
      <playlists class="mt-2" @edit="openModal($event)" :data="emptyPlaylists" :user="true" />
    </div>

    <!-- Create/edit modal -->
    <modal width="w-1/4" @close="closeModal" @submit="submitData" :validated="playlist.name && playlist.description" :class="showModal ? 'block' : 'hidden'">
      <template #header>
        {{ editMode ? 'Edit - ' + playlist.name : 'Create playlist' }}
      </template>
      <template #body>
        <input class="bg-gray-200 px-3 py-2 w-full rounded shadow-none outline-none mb-2" v-model="playlist.name" placeholder="Name" type="text" />
        <input class="bg-gray-200 px-3 py-2 w-full rounded shadow-none outline-none mb-2" v-model="playlist.description" placeholder="Description" type="text" />
        <div class="flex items-center mb-2">  
          <input class="mr-2" v-model="playlist.public" type="checkbox" />
          <span>Public</span>
        </div>
        <div class="flex items-center">  
          <input class="mr-2" v-model="playlist.collaborative" type="checkbox" />
          <span>Collaborative</span>
        </div>
      </template>
    </modal>

  </div>
</template>

<script>

  import Modal from '../components/common/Modal'
  import Playlists from '../components/searching/Playlists'
  import { mapGetters } from 'vuex'
  export default {

    components: {
      "modal": Modal,
      "playlists": Playlists
    },

    data() {
      return {
        playlist: {
          name: null,
          public: true,
          collaborative: false,
          description: null
        },
        showModal: false,
        editMode: false
      }
    },

    created() {
      this.$store.dispatch('fetchUserPlaylists')
    },

    methods: {
      openModal(id) {
        if(typeof id === 'string') {
          this.editMode = true
          this.playlist = this.userPlaylists.items.find(p => p.id === id)
        }
        this.showModal = true
      },
      closeModal() {
        this.showModal = false
        this.editMode = false
        this.resetPlaylist()
      },
      async submitData() {
        let data = { 
            name: this.playlist.name,
            description: this.playlist.description,
            public: this.playlist.public,
            collaborative: this.playlist.collaborative
        }
        if(this.editMode) {
          await this.axios.put('playlists/' + this.playlist.id, data).then(response => {
            this.$store.commit('setAlertInfo', { display: true, status: 'success', message: 'Playlist edited' })
          })
        } else {
          await this.axios.post('users/' + this.userId + '/playlists', data).then(response => {
            this.$store.commit('setAlertInfo', { display: true, status: 'success', message: 'Playlist created' })
          })
        }
        this.$store.dispatch('fetchUserPlaylists')
        this.closeModal()
      },
      resetPlaylist() {
        this.playlist = { name: null, description: null, public: true, collaborative: false }
      }
    },

    computed: {
      ...mapGetters(['userPlaylists', 'userId']),
      nonEmptyPlaylists() {
        return { items: this.userPlaylists.items.filter(i => i.tracks.total > 0) }
      },
      emptyPlaylists() {
        return { items: this.userPlaylists.items.filter(i => i.tracks.total === 0) }
      }
    }
    
  }
</script>