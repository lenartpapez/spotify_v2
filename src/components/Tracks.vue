<template>
    <div class="flex flex-wrap">
        <div class="w-1/4 p-4" v-for="track in data.items" :key="track.id">
            <span class="text-sm mr-2">{{ track.name }} <i @click="$store.dispatch('playSong', { track: track })" class="fas fa-play-circle text-red-500"></i></span>
            <img class="mt-3 rounded shadow-md w-full" :src="track.album.images[1].url" />
        </div>
    </div>
</template>

<script>
    export default {
        props: [ 'data' ]
    }
</script>