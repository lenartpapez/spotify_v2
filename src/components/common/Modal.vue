<template>
      <div class="fixed top-0 left-0 w-full h-full z-50" style="background: rgba(0, 0, 0, .5)">
        <div class="flex items-center justify-center h-full">
          <div :class="width" class="shadow-lg">
              <div class="bg-red-500 text-white text-xl p-3 flex rounded-t justify-between items-center">
                <slot name="header">
                </slot>
                <button><i class="fa fa-times" @click="$emit('close')"></i></button>
              </div>

              <div class="p-3 bg-white">
                <slot name="body">
                </slot>
              </div>

              <div class="p-3 bg-white flex justify-end rounded-b">
                <slot name="footer">
                </slot>
                <button :disabled="!validated" class="btn submit text-white bg-green-500 hover:bg-green-700" @click="$emit('submit')">
                    Submit
                </button>
              </div>
            </div>
        </div>
      </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    props: [ 'show', 'validated', 'width' ]
  }
</script>

<style lang="scss">

  .submit:disabled {
    opacity: .4;
    cursor: not-allowed;
  }

</style>