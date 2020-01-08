<template>
  <div class="flex items-center" v-if="this.pagingInfo.total > 10">
    <button class="px-4 h-10 rounded bg-gray-500 mr-1" @click="previousPage" :disabled="this.pagingInfo.page !== 0"><i class="fas fa-chevron-left"></i></button>
    <button @click="nextPage" class="px-4 h-10 rounded bg-gray-500"><i class="fas fa-chevron-right"></i></button>
  </div>
</template>

<script>
  export default {
    props: [ 'type', 'pagingInfo' ],
    methods: {
      nextPage() {
        this.$store.dispatch('fetchPaginated', { offset: this.pagingInfo.page + 1, type: this.type })
      },
      previousPage() {
        this.$store.dispatch('fetchPaginated', { offset: this.pagingInfo.page - 1, type: this.type })
      }
    }
  }
</script>