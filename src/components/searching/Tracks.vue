<template>
    <div class="flex flex-col">
        <div class="p-6 bg-gray-600 flex text-white justify-between">
            <h3 class="text-4xl">Tracks <span class="text-sm">({{ pagingInfo('tracks').total }})</span></h3>
            <pagination :paging-info="pagingInfo('tracks')" type="track"></pagination>
        </div>
        <div class="flex flex-wrap p-3 items-end">
            <div class="w-1/4 lg:w-1/5 p-3 relative" v-for="track in data.items" :key="track.id">
                <span class="text-sm mr-2">{{ track.name }} </span>
                <vue-hover-mask class="mt-3 shadow-lg" :style="dropdown === track.id ? 'border-bottom-right-radius: 0 !important' : ''">
                    <img class="object-cover w-full" :src="track.album.images[0].url" />
                    <template #action>
                        <i @click="playTrack(track.uri)" class="fas p-3 text-sm mr-1 fa-play rounded-full bg-red-500"></i>
                        <i @click="dropdown = track.id" class="fas p-3 text-sm fa-plus rounded-full bg-white text-black"></i>
                    </template>
                </vue-hover-mask> 
                <div class="absolute border-2 border-black -mt-32 sm:-mt-8 md:-mt-12 lg:-mt-24 w-full xl:w-2/3 right-0 choices z-10 flex flex-col shadow-lg overflow-hidden rounded-lg bg-white" v-if="dropdown === track.id">
                    <button @click="addToPlaylist(playlist.id, track.id)" class="text-sm px-6 py-2 hover:bg-red-500 hover:text-white" v-for="playlist in userPlaylists.items" :key="playlist.id">
                        {{ playlist.name }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        props: [ 'data' ],
        data() {
            return {
                dropdown: null
            }
        },
    
        methods: {
            playTrack(uri) {
                this.$store.dispatch('play', { type: 'tracks', uri: uri })
            },
            addToPlaylist(trackId, playlistId) {
                this.dropdown = null
            }
        },
        computed: {
            ...mapGetters(['pagingInfo', 'userPlaylists'])
        }
    }

</script>

<style lang="scss">
</style>