<template>
  <div class="logginWrapper">
    <div class="loginWindow">
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
    <p v-if="loginMessage.status">{{loginMessage.message}}</p>

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
      loginMessage: {},
    };
  },

  methods: {
    async login() {
      if (this.name.length <= 2 || this.password.length <= 6) {
        this.loginMessage.message = 'You must write name and password';
        return;
      }
      this.loginMessage = await ConnectWithServ.login(this.name, this.password);
      if (this.loginMessage.status === 200) {
        this.$emit('change');
      }
    },
  },
};
</script>

<style scoped>

input{
  max-width: 10vw;
  min-width: 65px;
  display: block;
  margin: 10px auto;
  border-radius: 10px;
  border: 1px solid #e7b1b1;
  color: #e7b1b1;
  padding: 3px 5px;
  text-align: center;
  background-color: rgba(0,0,0, .4);
  font-size: 1.5vw;
}

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

p{
  font-weight: 800;
  color: #eb1fb5;
}

@media(min-width: 600px) {
  input {
    min-width: 200px;
  }
  button {
    font-size: 1.4em;
    min-width: 150px;
  }
}
</style>
