<template>
  <div class="component">
    <div v-if="localStorage.access_token">
      Front Page
    </div>
    <div v-else class="flex h-full items-center justify-center">
      <span class="font-bold text-xl">Please login to use the app</span>
    </div>
  </div>

</template>

<script>
  export default {

    data () {
      return {

      }
    },

    mounted () {
  
    }
  
  }
</script>

<style>

</style>
