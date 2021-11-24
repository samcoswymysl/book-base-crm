<template>
  <div class="registerWrapper">
    <div class="register-window">

    <input
      type="text"
      id="name"
      placeholder="Your name"
      required
      v-model="name"
    >
    <input
      type="password"
      id="password"
      placeholder="Password"
      required
      v-model="password"
    >

    <button
      @click="validForm"
      type="submit"
      id="register"
    >Register</button>
    </div>
    <p
      class="error-valid"
      v-if="error"
    >
      {{error}}
    </p>

    <p v-if="serverAnswer">{{serverAnswer.message}}</p>

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
      if (this.name.length < 2) {
        this.error = 'Your name must have 2 char';
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
  font-size: 2.5vw;
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

@media (min-width: 600px) {
  input {
    min-width: 200px;
  }

  button {
    font-size: 1.4em;
    min-width: 150px;
  }
}
</style>
