<template>
    <div class="flex flex-col">
        <div class="p-6 bg-gray-600 flex text-white justify-between">
            <h3 class="text-4xl">Tracks <span class="text-sm">({{ trackPages.total }})</span></h3>
            <pagination :paging-info="trackPages" type="track"></pagination>
        </div>
        <div class="flex flex-wrap p-3 items-end">
            <div class="w-1/4 lg:w-1/5 p-3" v-for="track in data.items" :key="track.id">
                <span class="text-sm mr-2">{{ track.name }} </span>
                <vue-hover-mask @click="playTrack(track)" class="mt-3 shadow-lg">
                    <img class="rounded object-cover w-full" :src="track.album.images[0].url" />
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
            playTrack(track) {
                this.$store.dispatch('play', { track: track })
            }
        },
        computed: {
            ...mapGetters(['trackPages'])
        }
    }
</script>