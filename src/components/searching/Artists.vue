<template>
    <div class="flex flex-col">
        <div class="p-6 bg-gray-600 flex text-white justify-between">
            <h3 class="text-lg md:text-4xl">Artists <span class="text-sm">({{ pagingInfo('artists').total }})</span></h3>
            <pagination :paging-info="pagingInfo('artists')" type="artist"></pagination>
        </div>
        <div class="flex flex-wrap p-3 items-end">
            <div class="w-1/2 sm:w-1/3 lg:w-1/4 xl:w-1/5 p-3" v-for="artist in data.items" :key="artist.id">
                <span class="text-sm mr-2">{{ artist.name }}</span>
                <vue-hover-mask @click="playArtist(artist.uri)" class="mt-3 shadow-lg">
                    <img class="rounded object-cover w-full" :src="artist.images[0] ? artist.images[0].url : '/img/no-cover.png'" />
                    <template #action>
                        <i class="fas p-6 fa-play rounded-full bg-red-500"></i>
                    </template>
                </vue-hover-mask> 
            </div>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
        props: [ 'data' ],
        methods: {
            playArtist(uri) {
                this.$store.dispatch('play', { type: 'artists', uri: uri, offset: 0 })
            }
        },
        computed: {
            ...mapGetters(['pagingInfo'])
        }
    }
</script>