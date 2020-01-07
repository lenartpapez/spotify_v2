<template>
    <div class="flex flex-col">
        <div class="p-6 bg-gray-600 text-white">
            <h3 class="text-4xl">Playlists</h3>
        </div>
        <div class="flex flex-wrap p-3">
            <div class="w-1/5 p-3" v-for="playlist in data.items" :key="playlist.id">
                <span class="text-sm mr-2">{{ playlist.name }}</span>
                <vue-hover-mask @click="playPlaylist(playlist)" class="mt-3 shadow-lg">
                    <img class="rounded object-cover w-full" :src="playlist.images[0].url" />
                    <template #action>
                        <i class="fas p-6 fa-play rounded-full bg-red-500"></i>
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
            playPlaylist(playlist) {
                this.$store.dispatch('play', { type: 'playlists', toPlay: playlist })
            }
        }
    }
</script>