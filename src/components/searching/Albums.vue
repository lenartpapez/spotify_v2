<template>
  <div class="flex flex-col">
    <div class="p-6 bg-gray-600 flex text-white justify-between">
      <h3 class="text-4xl">Albums <span class="text-sm">({{ $store.getters.albumPages.total }})</span></h3>
      <pagination :paging-info="$store.getters.albumPages" type="album"></pagination>
    </div>
    <div class="flex flex-wrap p-3 items-end">
      <div class="w-1/5 p-3" v-for="album in data.items" :key="album.id">
        <span class="text-sm mr-2">{{ album.name }}</span>
        <vue-hover-mask @click="playAlbum(album)" class="mt-3 shadow-lg">
          <img class="rounded object-cover w-full" :src="album.images[0].url" />
            <template #action>
              <i class="fas p-6 fa-play rounded-full bg-red-500"></i>
            </template>
        </vue-hover-mask> 
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: ["data"],
  methods: {
    playAlbum(album) {
      this.$store.dispatch('play', { type: 'albums', toPlay: album })
    }
  }
};

</script>