<template>
    <div class="footer">
        <div v-if="track.name !== ''" class="flex p-4 items-center">
            <div class="w-1/3 flex">
                <img class="h-12 mr-3 rounded" :src="track.image" alt="" />
                <div class="flex flex-col justify-center">
                    <span class="block text-xs">{{ track.artist }}</span>
                    <span class="block text-sm">{{ track.name }}</span>
                </div>
            </div>
            <div v-if="track.name !== ''" class="controls flex flex-col items-center flex-grow mt-1">
                <div class="flex items-center mb-2">
                    <button v-if="track.allowControls" class="p-2 w-10 rounded-full hover:bg-gray-900" @click="previousTrack">
                        <i class="fas fa-step-backward"></i>
                    </button>
                    <button @click="togglePlay" class="bg-red-500 p-2 w-10 mx-4 rounded-full hover:bg-red-700">
                        <i class="fas" :class="playing ? 'fa-pause' : 'fa-play'"></i>
                    </button>
                    <button v-if="track.allowControls" class="p-2 w-10 rounded-full hover:bg-gray-900" @click="nextTrack">
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
                        :max="track.duration"
                        dot-size="8" style="width: 100%" :lazy="true" v-model="position">
                    </vue-slider>
                    <span class="text-xs w-10 ml-2">{{ new Date(track.duration) | moment("mm:ss") }}</span>
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

    import { mapGetters } from 'vuex'

    export default {

        data() {
            return {
                volume: 50,
                position: 0,
                lastVolume: 0,
                muted: false,
                progress: null
            }
        },

        watch: {
            track: {
                deep: true,
                handler() {
                    this.position = 0
                }
            },
            volume(value) {
                window.player.setVolume(value / 100).then()
            },
            playing(val) {
                if(val) { 
                    this.updateProgress()
                } else { 
                    clearInterval(this.progress)
                }
            }
        },

        methods: {

            async togglePlay() {
                window.player.togglePlay().then(() => this.$store.commit('togglePlaying'))
            },

            async nextTrack() {
                await window.player.nextTrack().then(() => {
                    if (!this.playing) this.$store.commit('togglePlaying')
                })
            },

            async previousTrack() {
                await window.player.previousTrack().then(() => {
                    if (!this.playing) this.$store.commit('togglePlaying')
                })
            },

            updateProgress() {
                if (this.playing) {
                    this.progress = setInterval(() => {
                        if(this.position + 1000 < this.track.duration) {
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
        },

        computed: {
            ...mapGetters([
                'track',
                'playing'
            ])
        }

    }
</script>