<template>
<div class="navWrapper">
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/search">Search</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/favorite">Your Favorite Books</router-link> |
    <div
      class="user"
      v-if=" this.$cookies.get('auth') === null"
    >
      <button
        v-if="!loginNow"
        v-on:click="register"
      >Register
      </button>
      <button
        v-if="!loginNow"
        v-on:click="login"
      >Login</button>

      <Register
        v-if="registerWindow"
      />
      <Login
        v-if="loginWindow"
      />
    </div>

  </div>

  <router-view/>
</div>
</template>

<script>
import Register from './Register.vue';
import Login from './Login.vue';

export default {
  name: 'Nav',
  components: {
    Register,
    Login,

  },
  data() {
    return {
      registerWindow: false,
      registrationPossible: true,
      loginNow: false,
      loginWindow: false,
      InformationLogin: this.$cookies.get('auth'),

    };
  },

  methods: {
    register() {
      this.registerWindow = !this.registerWindow;
      this.loginWindow = false;
    },
    login() {
      this.loginWindow = !this.loginWindow;
      this.registerWindow = false;
    },
  },
};
</script>

<style scoped>

</style>
