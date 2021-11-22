<template>
  <div class="logoutWrapper">
  <button v-on:click="logoutUser">Logout</button>
    <p v-if="response">{{response}}</p>
  </div>
</template>

<script>
import ConnectWithServ from '../utils/connectWithServ';

export default {
  name: 'Logout',
  data() {
    return {
      response: '',
    };
  },

  methods: {
    async logoutUser() {
      this.response = await ConnectWithServ.logout();
      this.$emit('change');
    },
  },
};
</script>

<style scoped>

</style>
