<template>
    <div class="flex flex-col">
        <div class="p-6 bg-gray-600 text-white">
            <h3 class="text-4xl">Tracks</h3>
        </div>
        <div class="flex flex-wrap p-3">
            <div class="w-1/4 lg:w-1/5 p-3" v-for="track in data.items" :key="track.id">
                <span class="text-sm mr-2">{{ track.name }} <i @click="$store.dispatch('play', { track: track })" class="fas fa-play-circle text-red-500"></i></span>
                <div id="play-wrapper" class="relative">
                    <img class="mt-3 rounded shadow-md w-full" :src="track.album.images[0].url" />
                    <button id="play-btn" class="btn btn-play">
                        <i class="fas fa-play"></i>
                    </button>
                </div> 
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [ 'data' ]
    }
</script>