<template>
  <div class="registerWrapper">
    <div class="register-window">
      <p
        class="error-valid"
        v-if="error"
      >
        {{error}}
      </p>

    <p v-if="serverAnswer">{{serverAnswer.message}}</p>
    <label for="name">Your name</label>
    <input
      type="text"
      id="name"
      required
      v-model="name"
    >
    <label for="password">Your name</label>
    <input
      type="password"
      id="password"
      required
      v-model="password"
    >
    <label for="register">Register</label>
    <input
      v-on:click="validForm"
      type="submit"
      id="register"
    >
    </div>
  </div>
</template>

<script>
import ConnectWithServ from '../utils/connectWithServ';

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      password: '',
      serverAnswer: '',
      error: '',
    };
  },
  methods: {
    async register() {
      this.serverAnswer = await ConnectWithServ.addUser(this.name, this.password);
    },
    validForm() {
      if (this.name.length <= 4) {
        this.error = 'Your name must have 4 char';
        return;
      }
      if (this.password.length <= 6) {
        this.error = 'Your password must have 6 char';
        return;
      }
      this.register();
    },
  },

};
</script>

<style scoped>

</style>
