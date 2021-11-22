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
