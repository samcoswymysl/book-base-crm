<template>
  <div class="logginWrapper">
    <div class="loginWindow">
      <p v-if="loginMessage">{{loginMessage}}</p>

    <input
      type="text"
      id="userName"
      placeholder="Your login"
      v-model="name"
    >

    <input
      type="password"
      id="userPass"
      placeholder="Password"
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

input{
  width: 10vw;
  display: block;
  margin: 10px auto;
  border-radius: 10px;
  border: 1px solid #e7b1b1;
  color: #e7b1b1;
  padding: 3px 5px;
  text-align: center;
  background-color: rgba(0,0,0, 40%);
}

button{
  display: block;
  margin: 5px auto;
  padding: 5px 15px;
  border-radius: 10px;
  background-color: rgba(0,0,0, 40%);
  border: 1px solid #e7b1b1;
  color: #e7b1b1;
}
button:hover{
  color: #eb1fb5;
}

</style>
