<template>
  <div>
    <div id="LoginMenu">
      <a v-if="!loggedIn" href="/login">Login</a>
        <a v-if="!loggedIn" href="/register">Register</a>
        <a v-if="loggedIn" v-on:click.once="logout">Logout</a>
        <a v-if="loggedIn" href="/me">{{ user.name }}</a>
    </div>
  </div>
</template>

<style>
#LoginMenu{
  height: 20px;
  width: 100%;
  background: rgb(156, 156, 156);
  position: absolute;
  top: 0;
  left: 0;
}
</style>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('auth', ['loggedIn', 'user'])
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push('/login')
    }
  }
}
</script>
