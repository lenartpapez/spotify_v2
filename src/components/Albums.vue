<template>
    <div>
        <span v-for="artist in data.items" :key="artist.id">{{ artist.name }}</span>
    </div>
</template>

<script>
    export default {
        props: [ 'data' ]
    }
</script>