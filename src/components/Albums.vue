<template>
    <div class="flex flex-col">
        <div class="p-6 bg-gray-600 text-white">
            <h3 class="text-4xl">Albums</h3>
        </div>
        <div class="flex flex-wrap p-3">
            <div class="w-1/4 p-3" v-for="album in data.items" :key="album.id">
                <span class="text-sm mr-2">{{ album.name }} <i @click="$store.dispatch('play', { type: 'albums', toPlay: playlist })" class="fas fa-play-circle text-red-500"></i></span>
                <img class="mt-3 rounded shadow-md w-full" :src="album.images[0].url" />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        props: [ 'data' ]
    }
</script>