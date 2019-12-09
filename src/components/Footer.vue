<template>
    <div class="footer">
        <div v-if="$store.state.currentSong" class="flex justify-center items-center">
            <button @click="togglePlay" class="bg-red-500 mr-4 flex justify-center items-center p-2 rounded-sm hover:bg-red-700">
                <i v-if="$store.getters.playing" class="fas fa-pause"></i>
                <i v-else class="fas fa-play"></i>
            </button>
            <span>{{ $store.getters.currentSong }}</span>
        </div>
    </div>
</template>


<script>
    export default {

        data() {
            return {
            }
        },

        methods: {
            togglePlay() {
                window.player.togglePlay().then(() => this.$store.commit('setPlaying', !this.$store.getters.playing))
            }
        }
    
    }
</script>