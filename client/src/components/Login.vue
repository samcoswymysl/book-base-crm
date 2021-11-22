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
    <button @click="login">Login</button>
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
      if (this.name.length <= 4 || this.password.length <= 6) {
        this.loginMessage = 'You must write name and password';
        return;
      }
      this.loginMessage = await ConnectWithServ.login(this.name, this.password);
      if (this.loginMessage === 'Login successful') {
        this.$emit('change');
      }
    },
  },
};
</script>

<style scoped>

</style>
