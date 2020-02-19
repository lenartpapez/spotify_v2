<template>
  <div class="flex p-5">
    <div v-if="user">
      Front Page
    </div>
    <div v-else class="flex h-full items-center justify-center">
      <span class="font-bold text-xl">Please login to use the app</span>
    </div>
  </div>

</template>

<script>
  import { mapGetters } from 'vuex'
  export default {

    data () {
      return {

      }
    },

    computed: {
      ...mapGetters(['user'])
    }
  
  }
</script>

<style>

</style>
