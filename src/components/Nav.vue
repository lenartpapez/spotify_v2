<template>
    <div class="sidenav">
        <button class="btn btn-nav mb-3" v-for="route in routes" :key="route.path" v-show="route.label">
            <i :class="route.icon" /><router-link :to="{ name: route.name }" class="btn btn-nav">{{ route.label }}</router-link>
        </button>
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