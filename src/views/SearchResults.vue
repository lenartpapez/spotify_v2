<template> 
    <div class="component">
        <div v-if="$store.getters.hasResults">
            <span></span>
            <playlists :data="$store.getters.playlistsSearch" />
            <!-- <artists :data="$store.getters.artistsSearch" />
            <playlists :data="$store.getters.playlistsSearch" />
            <tracks :data="$store.getters.tracksSearch" /> -->
        </div>
        <span v-else>Please type to search.</span>
    </div>
</template>

<script>

import Artists from '../components/Artists'
import Albums from '../components/Albums'
import Tracks from '../components/Tracks'
import Playlists from '../components/Playlists'

export default {

    components: {
        Artists,
        Tracks,
        Albums,
        Playlists
    }
    
}
</script>