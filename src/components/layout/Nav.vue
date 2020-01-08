<template>
  <div class="flex">
    <div class="sidenav hidden md:flex">
        <router-link v-for="route in routes" 
                    v-show="route.label"
                    :key="route.path" 
                    :to="{ name: route.name }" 
                    exact
                    class="btn btn-nav mb-3 text-center hover:bg-gray-800">
              <i class="mr-2" :class="route.icon" />
              {{ route.label }}
        </router-link>
    </div>
    <div class="narrow-sidenav flex md:hidden">
        <router-link v-for="route in routes" 
                    v-show="route.label"
                    :key="route.path" 
                    :to="{ name: route.name }" 
                    exact
                    class="text-center p-3 hover:bg-gray-800">
              <i :class="route.icon" />
        </router-link>
    </div>
  </div>
</template>

<script>
    import router from '../../router'

    export default {

      data () {
        return {
          routes: router.options.routes
        }
      }

    }
</script>