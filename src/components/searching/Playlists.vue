<template>
    <div class="flex flex-col">
        <div class="p-6 bg-gray-600 flex text-white justify-between">
            <h3 class="text-4xl">Playlists <span class="text-sm">({{ $store.getters.playlistPages.total }})</span></h3>
            <pagination :paging-info="$store.getters.playlistPages" type="playlist"></pagination>
        </div>
        <div class="flex flex-wrap p-3">
            <div class="w-1/5 p-3" v-for="playlist in data.items" :key="playlist.id">
                <span class="text-sm mr-2">{{ playlist.name }}</span>
                <vue-hover-mask class="mt-3 shadow-lg">
                    <img class="rounded object-cover w-full" :src="playlist.images[0].url" />
                    <template #action>
                        <i class="fas p-3 mr-2 text-sm fa-play rounded-full bg-red-500" @click="playPlaylist(playlist.uri)"></i>
                        <i class="fas p-3 fa-list text-sm rounded-full bg-white text-black" @click="goToPlaylist(playlist.id)"></i>
                    </template>
                </vue-hover-mask> 
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [ 'data' ],
        methods: {
            playPlaylist(uri) {
                this.$store.dispatch('play', { type: 'playlists', uri: uri, offset: 0 })
            },
            goToPlaylist(id) {
                this.$router.push({ name: 'playlist', params: { id: id } })
            }
        }
    }
</script>