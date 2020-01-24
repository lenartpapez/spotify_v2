<template>
    <div class="flex flex-col">
        <div v-if="!user" class="p-6 bg-gray-600 flex text-white justify-between">
            <h3 class="text-4xl">Playlists <span class="text-sm">({{ pagingInfo('playlists').total }})</span></h3>
            <pagination v-if="!user" :paging-info="pagingInfo('playlists')" type="playlist"></pagination>
        </div>
        <div class="flex flex-wrap" :class="!user ? 'p-3' : ''">
            <div class="w-1/2 sm:w-1/3 lg:w-1/4 xl:w-1/5" :class="!user ? 'p-3' : 'pr-3 mb-3'" v-for="playlist in data.items" :key="playlist.id">
                <span class="text-sm mr-2">{{ playlist.name }}</span>
                <vue-hover-mask class="mt-3 shadow-lg">
                    <img class="rounded object-cover w-full" :src="playlist.images[0] ? playlist.images[0].url : '/img/no-cover.png'" />
                    <template #action>
                        <i v-if="playlist.tracks.total" class="fas p-3 mr-1 text-sm fa-play rounded-full bg-red-500" @click="playPlaylist(playlist.uri)"></i>
                        <i v-if="playlist.tracks.total" class="fas p-3 mr-1 fa-list text-sm rounded-full bg-white text-black" @click="goToPlaylist(playlist.id)"></i>
                        <i v-if="user" class="fa fa-edit p-3 text-sm rounded-full bg-yellow-500 text-black" @click="$emit('edit', playlist.id)"></i>
                    </template>
                </vue-hover-mask> 
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        props: { data: {}, user: { default: false } },
        methods: {
            playPlaylist(uri) {
                this.$store.dispatch('play', { type: 'playlists', uri: uri, offset: 0 })
            },
            goToPlaylist(id) {
                this.$router.push({ name: 'playlist', params: { id: id } })
            }
        },
        computed: {
            ...mapGetters(['pagingInfo', 'userId'])
        }
    }
</script>