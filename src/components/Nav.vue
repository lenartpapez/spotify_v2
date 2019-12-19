<template>
    <div class="sidenav">
        <router-link v-for="route in routes" 
                    v-show="route.label"
                    :key="route.path" 
                    :to="{ name: route.name }" 
                    class="btn btn-nav mb-3 text-center">
              <i class="mr-2" :class="route.icon" />
              {{ route.label }}
        </router-link>
    </div>
</template>

<script>
    import router from '../router'

    export default {

      data () {
        return {
          routes: router.options.routes
        }
      }

    }
</script>