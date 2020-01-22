<template>
  <div class="flex items-center paging" v-if="pagingInfo.total > 10">
    <button class="px-2 h-8 rounded bg-gray-500 mr-1" @click="jumpToFirstPage" :disabled="pagingInfo.page === 1"><i class="fas fa-step-backward"></i></button>
    <button class="px-2 h-8 rounded bg-gray-500 mr-3" @click="previousPage" :disabled="pagingInfo.page === 1"><i class="fas fa-chevron-left"></i></button>
    <span class="px-2 rounded h-6 mr-1 bg-gray-700" v-if="pagingInfo.page > 1">{{ pagingInfo.page - 1 }}</span>
    <span class="px-2 rounded h-6 bg-red-500 shadow-lg">{{ pagingInfo.page }}</span>
    <span class="px-2 rounded h-6 bg-gray-700 ml-1" v-if="pagingInfo.page < lastPage">{{ pagingInfo.page + 1 }}</span>
    <button :disabled="pagingInfo.page === lastPage" @click="nextPage" class="px-2 h-8 ml-3 mr-1 rounded bg-gray-500"><i class="fas fa-chevron-right"></i></button>
    <button class="px-2 h-8 rounded bg-gray-500" @click="jumpToLastPage" :disabled="pagingInfo.page === lastPage"><i class="fas fa-step-forward"></i></button>
  </div>
</template>

<script>
  export default {
    props: [ 'type', 'pagingInfo' ],
    data() {
      return {
        max_offset: 10000
      }
    },
    methods: {
      nextPage() {
        this.$store.dispatch('fetchPaginated', { type: this.type })
      },
      previousPage() {
        this.$store.dispatch('fetchPaginated', { previous: true, type: this.type })
      },
      jumpToFirstPage() {
        this.$store.dispatch('fetchPaginated', { first: true, query: this.$route.query.q, type: this.type })
      },
      jumpToLastPage() {
        let last
        if(this.pagingInfo.total > this.max_offset) {
          last = this.max_offset - this.pagingInfo.limit
        } else { 
          last = (this.lastPage - 1) * this.pagingInfo.limit
        }
        this.$store.dispatch('fetchPaginated', { last: true, query: this.$route.query.q, offset: last, type: this.type })
      },
    },
    computed: {
      lastPage() {
        if(this.pagingInfo.total > this.max_offset) return this.max_offset / this.pagingInfo.limit
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