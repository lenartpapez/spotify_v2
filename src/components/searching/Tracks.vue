<template>
    <div class="flex flex-col">
        <div class="p-6 bg-gray-600 flex text-white justify-between items-center">
            <h3 class="text-lg md:text-4xl">Tracks <span class="text-sm">({{ pagingInfo('tracks').total }})</span></h3>
            <div class="flex items-center">
                <div class="mr-10" v-if="selected.length">
                    <button @click="openModal" class="btn h-8 text-white bg-red-500 hover:bg-red-700">
                        <i class="fa fa-list mr-2"></i>
                        {{ selected.length }}
                    </button>
                </div>
                <div v-if="selected.length" class="border-r-2 h-12 border-gray-500 mr-10"></div>
                <pagination :paging-info="pagingInfo('tracks')" type="track"></pagination>
            </div>
        </div>
        <div class="flex flex-wrap p-3 items-end">
            <div class="w-1/2 sm:w-1/3 lg:w-1/4 xl:w-1/5 p-3 relative" v-for="(track, index) in data.items" :key="index">
                <span class="text-sm mr-2">
                    {{ track.name }}
                </span>
                <vue-hover-mask class="mt-3 shadow-lg">
                    <img class="object-cover w-full opacity-75" :src="track.album.images[0].url" />
                    <template #action>
                        <i @click="playTrack(track.uri)" class="fas p-3 text-sm mr-1 fa-play rounded-full bg-red-500"></i>
                        <i v-if="selected.map(t => t.id).includes(track.id)" @click="removeFromSelection(index)" class="fas p-3 text-sm fa-minus rounded-full bg-white text-red-500"></i>
                        <i v-else @click="addToSelection(track.id)" class="fas p-3 text-sm fa-plus rounded-full bg-green-500 text-white"></i>
                    </template>
                    <i v-if="selected.map(t => t.id).includes(track.id)" class="absolute checkmark p-3 top-0 right-0 bg-green-500"></i>
                </vue-hover-mask> 
                
            </div>
        </div>
        <modal width="w-1/2" @close="closeModal" @submit="addToPlaylist" :validated="playlist" :class="showModal ? 'block' : 'hidden'">
            <template #header>
                Playlist - items to add
            </template>
            <template #body>
                <div class="flex flex-col xl:flex-row items-start content-start">
                    <treeselect class="w-full xl:w-1/4 mr-3 mb-3 self-start sticky" :options="options" placeholder="Select a playlist" v-model="playlist"/>
                    <div class="w-full xl:w-3/4 overflow-scroll" style="max-height: 500px">
                        <div class="flex bg-gray-200 rounded px-3 mb-1 items-center justify-between" v-for="(item, index) in selected" :key="index">
                            <div class="flex items-center">
                                <span class="mr-4 font-bold">{{ index + 1 }}.</span>
                                <div class="flex flex-col py-2">
                                    <span class="text-sm">{{ item.name }}</span>
                                    <div>
                                        <span v-for="(artist, index) in item.artists" :key="index" class="text-gray-600 text-sm mr-1">
                                            {{ artist.name }} {{ index !== item.artists.length - 1 ? '&bull;' : '' }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <button @click="removeFromSelection(index)" class="text-red-500"><i class="fa fa-times"></i></button>
                        </div>
                    </div>
                </div>
            </template>
            <template #footer>
                <button :disabled="!selected.length" class="btn clear mr-2 text-white bg-red-500 hover:bg-red-700" @click="selected = []; playlist = null">
                    Clear all
                </button>
            </template>
        </modal>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    import Modal from '../common/Modal'
    export default {
        props: [ 'data' ],
        data() {
            return {
                dropdown: null,
                showModal: false,
                selected: [],
                playlist: null
            }
        },

        components: {
            'modal': Modal
        },
    
        methods: {
            openModal() {
                this.showModal = true
            },
            closeModal() {
                this.showModal = false
            },
            playTrack(uri) {
                this.$store.dispatch('play', { type: 'tracks', uri: uri })
            },
            addToSelection(trackId) {
                let item = this.data.items.find(t => t.id === trackId)
                this.selected.push(item)
            },
            removeFromSelection(index) {
                this.selected.splice(index, 1)
            },
            addToPlaylist() {
                let data = this.selected.map(s => s.uri)
                this.axios.post('playlists/' + this.playlist + '/tracks', data).then(response => {
                    this.$store.commit('setAlertInfo', 
                        { display: true, status: 'success', 
                          message: this.selected.length + ' tracks added to playlist.'
                        })
                    this.closeModal()
                })
            }
        },
        computed: {
            ...mapGetters(['pagingInfo', 'userPlaylists']),
            options() {
                return this.userPlaylists.map(i => {
                    return { id: i.id, label: i.name }
                })
            }
        }
    }

</script>

<style lang="scss">

    .checkmark {
        margin-top: -1.5rem;
        margin-right: -4rem;
        height: 4rem;
        width: 15rem;
        transform: rotate(45deg);
        border: 1px solid white;
    }

    .clear:disabled {
        opacity: .4;
        cursor: not-allowed;
    }
    
</style>