<template>
    <div class="flex flex-col">
        <div class="p-6 bg-gray-600 text-white">
            <h3 class="text-4xl">Artists</h3>
        </div>
        <div class="flex flex-wrap p-3">
            <div class="w-1/4 p-3" v-for="artist in data.items" :key="artist.id">
                <span class="text-sm mr-2">{{ artist.name }} <i @click="$store.dispatch('play', { type: 'artists', toPlay: artist })" class="fas fa-play-circle text-red-500"></i></span>
                <img class="mt-3 rounded shadow-md w-full" :src="artist.images.length ? artist.images[0].url : '/img/no-cover.png'" />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [ 'data' ]
    }
</script>