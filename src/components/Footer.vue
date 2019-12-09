<template>
    <div class="footer">
        <span v-if="localStorage.song">Currently playing: {{  localStorage.song }}</span>
    </div>
</template>


<script>
    export default {
    
    }
</script>