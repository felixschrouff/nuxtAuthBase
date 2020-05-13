<template>
  <div class="row">
    <div class="mx-auto col-md-4 mt-5">
        <form @submit="submitForm">
          <label id="input-group-1" label-for="username">Username</label>
            <input id="username" type="text" v-model="username" required placeholder="Enter username">
            <label id="input-group-2" label-for="password">Password</label>
            <input id="password" v-model="password" type="password" required placeholder="Enter password">
          <button type="submit" variant="primary">Login</button>
          </form>

    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async submitForm(evt) {
      evt.preventDefault()
      const credentials = {
        username: this.username,
        password: this.password
      }
      console.log('pressed Submit')
      try {
        let response = await this.$auth.loginWith('local', {
          data: credentials
        })
        console.log(response);
        this.$router.push('/backend')
      } catch (e) {
        console.log('ERROR:')
        console.log(e)
        this.$router.push('/login')
      }
    }
  }
}
</script>

<style></style>
