<template>
  <form>
    <label for="name">Your name</label>
    <input type="text" id="name">
    <label for="register">Register</label>
    <input
      v-on:click="register"
      type="submit"
      id="register"
    >

  </form>

</template>

<script>
import ConnectWithServ from '../utils/connectWithServ';

export default {
  name: 'Register',
  data() {
    return {
      status: '',
    };
  },
  methods: {
    register() {
      this.status = ConnectWithServ.addUser('Rafał', 'Hasło');
    },
  },

};
</script>

<style scoped>

</style>
