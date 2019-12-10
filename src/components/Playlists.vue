<template>
    <div class="flex flex-wrap">
        <div class="w-1/4 p-4" v-for="playlist in data.items" :key="playlist.id">
            <span class="text-sm mr-2">{{ playlist.name }} <i @click="$store.dispatch('play', { type: 'playlist', playlist: playlist })" class="fas fa-play-circle text-red-500"></i></span>
            <img class="mt-3 rounded shadow-md w-full" :src="playlist.images[0].url" />
        </div>
    </div>
</template>

<script>
    export default {
        props: [ 'data' ]
    }
</script>