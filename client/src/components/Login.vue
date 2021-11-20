<template>
  <div class="logginWrapper">
    <div class="loginWindow">
      <p v-if="loginMessage">{{loginMessage}}</p>
    <label for="userName" >Your Nick</label>
    <input
      type="text"
      id="userName"
      v-model="name"
    >
    <label for="userPass">Your Password</label>
    <input
      type="password"
      id="userPass"
      v-model="password"
    >
    <button v-on:click="login">Login</button>
    </div>

  </div>

</template>

<script>
import ConnectWithServ from '../utils/connectWithServ';

export default {
  name: 'Login',
  data() {
    return {
      name: '',
      password: '',
      loginMessage: '',
    };
  },

  methods: {
    async login() {
      this.loginMessage = await ConnectWithServ.login(this.name, this.password);
    },
  },

};
</script>

<style scoped>

</style>
