<template>
    <div>
    </div>
</template>

<script>
export default {

  data () {
    return {

    }
  },

  mounted () {
    let url = new URLSearchParams(window.location.hash.substring(2))
    let token = url.get('access_token')
    if (token) {
      this.localStorage.access_token = token
      this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
      this.$store.dispatch('setUserAction')
    }
    this.$router.push({ name: 'front' })
  }

}
</script>