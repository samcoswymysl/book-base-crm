<template>
  <div class="logoutWrapper">
  <button @click="logoutUser">Logout</button>
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
button{
  display: block;
  margin: 5px auto;
  padding: 5px 15px;
  border-radius: 10px;
  background-color: rgba(0,0,0, .4);
  border: 1px solid #e7b1b1;
  color: #e7b1b1;
}
button:hover{
  box-shadow:  0 0 6px 1px #e7b1b1;
  color: #eb1fb5;
}
@media (min-width: 600px) {

  button {
    font-size: 1.4em;
    min-width: 150px;
  }
}
</style>
