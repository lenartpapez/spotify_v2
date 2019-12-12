<template>
    <div class="footer">
        <div v-if="$store.getters.trackName !== ''" class="flex p-4 items-center">
            <div class="w-64 flex">
                <img class="h-12 mr-3 rounded" :src="$store.getters.trackImage" alt="" />
                <div>
                    <span class="block text-xs">{{ $store.getters.trackArtist }}</span>
                    <span class="block text-sm">{{ $store.getters.trackName }}</span>
                </div>
            </div>
            <div v-if="$store.getters.trackName !== ''" class="flex-grow flex justify-center">
                <button class="p-2 w-10 rounded-full border border-white hover:bg-white hover:text-black" @click="previousTrack">
                    <i class="fas fa-backward" style="margin-right: 0.1rem"></i>
                </button>
                <button @click="togglePlay" class="bg-red-500 p-2 w-10 mx-4 rounded-full hover:bg-red-700">
                    <i v-if="$store.getters.playing" class="fas fa-pause"></i>
                    <i v-else class="fas fa-play"></i>
                </button>
                <button class="p-2 w-10 rounded-full border border-white hover:text-black hover:bg-white" @click="nextTrack">
                    <i class="fas fa-forward" style="margin-left: 0.2rem"></i>
                </button>
            </div>
            <div class="w-64 text-right flex justify-end">
                <i class="fa fa-volume-up mr-2" />
                <vue-slider :tooltip="'none'" 
                    :dot-style="{ borderColor: 'white'}"
                    :rail-style="{ backgroundColor: 'gray' }"
                    :process-style="{ backgroundColor: '#f56565' }"
                    :lazy="true" style="width: 70%" dot-size="12" v-model="volume">
                </vue-slider>
            </div>
        </div>
    </div>
</template>


<script>
    export default {

        data() {
            return {
                volume: 50
            }
        },

        watch: {
            volume(value) {
                window.player.setVolume(value / 100).then()
            }
        },

        methods: {
            togglePlay() {
                window.player.togglePlay().then(() => this.$store.commit('togglePlaying'))
            },
            nextTrack() {
                window.player.nextTrack().then(() => {})
            },
            previousTrack() {
                window.player.previousTrack().then(() => {})
            }
        }
    
    }
</script>