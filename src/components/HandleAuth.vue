<template>
    <div>
    </div>
</template>

<script>
export default {

  data () {
    return {
      token: null,
      expires_in: null
    }
  },

  async mounted () {
    let url = new URLSearchParams(window.location.hash.substring(2))
    this.token = url.get('access_token')
    this.expires_in = url.get('expires_in')
    if (this.token) {
      await this.fetchUser()
    }
    this.$router.push({ name: 'front' })
  },

  methods: {
    fetchUser () {
      return this.axios.get('/me',
        {
          headers: {
            'Authorization': 'Bearer ' + this.token
          }
        }).then(response => {
          this.loginUser(response.data)
      })
    },

    loginUser (data) {
      this.localStorage.access_token = this.token,
      this.localStorage.user = JSON.stringify(data)
    }

  }

}
</script>