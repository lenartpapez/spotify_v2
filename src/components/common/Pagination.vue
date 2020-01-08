<template>
  <div class="flex items-center paging" v-if="pagingInfo.total > 10">
    <button class="px-2 h-8 rounded bg-gray-500 mr-1" @click="jumpToFirstPage" :disabled="pagingInfo.page === 1"><i class="fas fa-step-backward"></i></button>
    <button class="px-2 h-8 rounded bg-gray-500 mr-3" @click="previousPage" :disabled="pagingInfo.page === 1"><i class="fas fa-chevron-left"></i></button>
    <span class="px-2 rounded h-6 mr-1 bg-gray-700" v-if="pagingInfo.page > 1">{{ pagingInfo.page - 1 }}</span>
    <span class="px-2 rounded h-6 bg-red-500 shadow-lg mr-1">{{ pagingInfo.page }}</span>
    <span class="px-2 rounded h-6 bg-gray-700" v-if="pagingInfo.page < lastPage">{{ pagingInfo.page + 1 }}</span>
    <button :disabled="pagingInfo.page === lastPage" @click="nextPage" class="px-2 h-8 ml-3 mr-1 rounded bg-gray-500"><i class="fas fa-chevron-right"></i></button>
    <button class="px-2 h-8 rounded bg-gray-500" @click="jumpToLastPage" :disabled="pagingInfo.page === lastPage"><i class="fas fa-step-forward"></i></button>
  </div>
</template>

<script>
  export default {
    props: [ 'type', 'pagingInfo' ],
    methods: {
      nextPage() {
        this.$store.dispatch('fetchPaginated', { offset: this.pagingInfo.offset + this.pagingInfo.limit, type: this.type })
      },
      previousPage() {
        this.$store.dispatch('fetchPaginated', { offset: this.pagingInfo.offset - this.pagingInfo.limit, type: this.type })
      },
      jumpToFirstPage() {
        this.$store.dispatch('fetchPaginated', { offset: 0, type: this.type })
      },
      jumpToLastPage() {
        this.$store.dispatch('fetchPaginated', { offset: (this.lastPage - 1) * this.pagingInfo.limit, type: this.type })
      },
    },
    computed: {
      lastPage() {
        return Math.floor((this.pagingInfo.total + this.pagingInfo.limit - 1) / this.pagingInfo.limit)
      }
    }
  }
</script>

<style lang="scss">
  .paging button:disabled {
    opacity: .3
  }
</style>