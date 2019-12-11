<template>
    <div class="flex flex-col">
        <div class="p-6 bg-gray-600 text-white">
            <h3 class="text-4xl">Playlists</h3>
        </div>
        <div class="flex flex-wrap p-3">
            <div class="w-1/4 p-3" v-for="playlist in data.items" :key="playlist.id">
                <span class="text-sm mr-2">{{ playlist.name }} <i @click="$store.dispatch('play', { type: 'playlists', toPlay: playlist })" class="fas fa-play-circle text-red-500"></i></span>
                <img class="mt-3 rounded shadow-md w-full" :src="playlist.images[0].url" />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [ 'data' ]
    }
</script>