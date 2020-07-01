<template>
  <div class="flex flex-col">
    <div class="p-6 bg-gray-600 flex text-white justify-between">
      <h3 class="text-lg md:text-4xl">Albums <span class="text-sm">({{ pagingInfo('albums').total }})</span></h3>
      <pagination :paging-info="pagingInfo('albums')" type="album"></pagination>
    </div>
    <div class="flex flex-wrap p-3 items-end">
      <div class="w-1/2 sm:w-1/3 lg:w-1/4 xl:w-1/5 p-3" v-for="album in data.items" :key="album.id">
        <span class="text-sm mr-2">{{ album.name }}</span>
        <vue-hover-mask class="mt-3 shadow-lg">
          <img class="rounded object-cover w-full" :src="album.images[0].url" />
            <template #action>
              <i class="fas p-6 fa-play rounded-full bg-red-500" @click="playAlbum(album.uri)"></i>
            </template>
        </vue-hover-mask> 
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    props: ["data"],
    methods: {
      playAlbum(uri) {
        this.$store.dispatch('play', { type: 'albums', uri: uri, offset: 0 })
      }
    },
    computed: {
      ...mapGetters(['pagingInfo'])
    }
  };

</script>