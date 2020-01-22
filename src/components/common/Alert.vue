<template>
  <transition name="fade">
    <div v-if="alertInfo.display" :class="alertInfo.status === 'success' ? success : error"
        class="alert border-red-500 w-64 text-red-900 px-4 py-3 right-0 z-50 mb-4 mr-4 absolute rounded shadow-md" role="alert">
        <div class="flex items-center justify-between">
          <div>
            <p class="font-bold">{{ alertInfo.status | uppercase }}</p>
            <p class="text-sm">{{ alertInfo.message }}</p>
          </div>
          <i class="fa mr-2" :class="alertInfo.status === 'success' ? 'fa-check' : 'fa-exclamation-circle'"/>
        </div>
    </div>
  </transition>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    watch: {
      alertInfo(info) {
        if(info.display) {
          setTimeout(() => {
            this.$store.commit('setAlertInfo', { display: false, status: '', message: '' })
          }, 4000)
        }
      }
    },
    data() {
      return {
        success: 'bg-green-200 border-green-500 text-green-900',
        error: 'bg-red-200 border-red-500 text-red-900'
      }
    },
    props: ['message'],
    computed: {
      ...mapGetters(['alertInfo'])
    },
    filters: {
      uppercase(val) {
        return val.charAt(0).toUpperCase() + val.substring(1)
      }
    }
  }
</script>

<style lang="scss">
    .alert {
      bottom: 6.5rem;
      right: -100%;
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }
</style>