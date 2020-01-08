<template>
    <div class="flex flex-col">
        <div class="p-6 bg-gray-600 flex text-white justify-between">
            <h3 class="text-4xl">Artists <span class="text-sm">({{ $store.getters.artistPages.total }})</span></h3>
            <pagination :paging-info="$store.getters.artistPages" type="artist"></pagination>
        </div>
        <div class="flex flex-wrap p-3 items-end">
            <div class="w-1/5 p-3" v-for="artist in data.items" :key="artist.id">
                <span class="text-sm mr-2">{{ artist.name }}</span>
                <vue-hover-mask @click="playArtist(artist)" class="mt-3 shadow-lg">
                    <img class="rounded object-cover w-full" :src="artist.images.length ? artist.images[0].url : '/img/no-cover.png'" />
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
            playArtist(artist) {
                this.$store.dispatch('play', { type: 'artists', toPlay: artist })
            }
        }
    }
</script>