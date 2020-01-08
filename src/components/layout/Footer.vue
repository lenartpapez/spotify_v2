<template>
    <div class="footer">
        <div v-if="$store.getters.trackName !== ''" class="flex p-4 items-center">
            <div class="w-1/3 flex">
                <img class="h-12 mr-3 rounded" :src="$store.getters.trackImage" alt="" />
                <div class="flex flex-col justify-center">
                    <span class="block text-xs">{{ $store.getters.trackArtist }}</span>
                    <span class="block text-sm">{{ $store.getters.trackName }}</span>
                </div>
            </div>
            <div v-if="$store.getters.trackName !== ''" class="controls flex flex-col items-center flex-grow mt-1">
                <div class="flex items-center mb-2">
                    <button v-if="$store.getters.allowControls" class="p-2 w-10 rounded-full hover:bg-gray-900" @click="previousTrack">
                        <i class="fas fa-step-backward"></i>
                    </button>
                    <button @click="togglePlay" class="bg-red-500 p-2 w-10 mx-4 rounded-full hover:bg-red-700">
                        <i class="fas" :class="$store.getters.playing ? 'fa-pause' : 'fa-play'"></i>
                    </button>
                    <button v-if="$store.getters.allowControls" class="p-2 w-10 rounded-full hover:bg-gray-900" @click="nextTrack">
                        <i class="fas fa-step-forward"></i>
                    </button>
                </div>
                <div class="flex w-full items-center">
                    <span class="mr-2 w-10 text-xs">{{ new Date(position) | moment("mm:ss") }}</span>
                    <vue-slider :tooltip="'none'" 
                        :dot-style="{ borderColor: 'white'}"
                        :rail-style="{ backgroundColor: 'gray' }"
                        :process-style="{ backgroundColor: '#f56565' }"
                        @change="onProgressChange"
                        :max="duration"
                        dot-size="8" style="width: 100%" :lazy="true" v-model="position">
                    </vue-slider>
                    <span class="text-xs w-10 ml-2">{{ new Date(duration) | moment("mm:ss") }}</span>
                </div>
                
            </div>
            <div class="w-1/3 text-right flex justify-end items-center">
                <button @click="toggleMute" class="focus:outline-none focus:shadow-none mr-3">
                    <i class="fa" :class="muted ? 'fa-volume-mute' : 'fa-volume-up'" />
                </button>
                <vue-slider :tooltip="'none'" 
                    :dot-style="{ borderColor: 'white'}"
                    :rail-style="{ backgroundColor: 'gray' }"
                    :process-style="{ backgroundColor: '#f56565' }"
                    :lazy="true" style="width: 30%" dot-size="12" v-model="volume">
                </vue-slider>
            </div>
        </div>
    </div>
</template>


<script>

    export default {

        data() {
            return {
                volume: 50,
                position: 0,
                duration: 0,
                lastVolume: 0,
                muted: false,
                progress: null
            }
        },

        created()  {
            this.$store.watch((state, getters) => getters.trackDuration, (newValue) => {
                this.position = 0
                this.duration = newValue
            })
            this.$store.watch((state, getters) => getters.playing, (newValue) => {
                if(newValue) {
                    this.updateProgress();
                } else {
                    clearInterval(this.progress)
                }
            })
        },

        watch: {
            volume(value) {
                window.player.setVolume(value / 100).then()
            }
        },

        methods: {

            async togglePlay() {
                window.player.togglePlay().then(() => this.$store.commit('togglePlaying'))
            },

            async nextTrack() {
                await window.player.nextTrack().then(() => {
                    if (!this.$store.getters.playing) this.$store.commit('togglePlaying')
                })
            },

            async previousTrack() {
                await window.player.previousTrack().then(() => {
                    if (!this.$store.getters.playing) this.$store.commit('togglePlaying')
                })
            },

            updateProgress() {
                if (this.$store.getters.playing) {
                    this.progress = setInterval(() => {
                        if(this.position + 1000 < this.duration) {
                            this.position += 1000
                        }
                    }, 1000)
                }
            },

            toggleMute() {
                if(this.muted) {
                    this.volume = this.lastVolume
                } else {
                    this.lastVolume = this.volume
                    this.volume = 0
                } 
                this.muted = !this.muted
            },

            async onDragEnd(value) {
                await window.player.seek(value)
            },

            async onProgressChange(value) {
                await window.player.seek(value)
            }
        }

    }
</script>