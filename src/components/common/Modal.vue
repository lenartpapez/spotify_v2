<template>
  <div>
    <transition name="modal">
      <div class="fixed top-0 left-0 w-full h-full z-50" style="background: rgba(0, 0, 0, .5)">
        <div class="flex items-center justify-center h-full">
          <div class="w-1/4 shadow-lg">
              <div class="bg-red-500 text-white text-xl p-3 flex rounded-t justify-between items-center">
                <slot name="header">
                </slot>
                <button><i class="fa fa-times" @click="$emit('close')"></i></button>
              </div>

              <div class="p-3 bg-white">
                <slot name="body">
                </slot>
              </div>

              <div class="p-3 bg-gray-500 flex justify-end rounded-b">
                <slot name="footer">
                </slot>
                <button class="btn text-white bg-green-500 hover:bg-green-700" @click="$emit('submit')">
                    Submit
                </button>
              </div>
            </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {

    data() {
      return {

      }
    },

    props: [ 'show' ]
    
  }
</script>

<style lang="scss">

  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
  
</style>