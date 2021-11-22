<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/search">Search</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/favorite" ref="fav" >Your Favorite Books</router-link> |
      <div
        class="user"
        v-if=" this.$cookies.get('auth') === null"
      >
        <button
          v-if="isLogin === null"
          v-on:click="register"
        >Register
        </button>
        <button
          v-if="isLogin === null"
          v-on:click="login"
        >Login</button>

        <Register
          v-if="registerWindow"
        />
        <Login
          v-if="loginWindow"
          v-on:change="check"
        />
      </div>
      <Logout
        v-if="isLogin !== null"
        v-on:change="check"
      />

    </div>

    <router-view/>

  </div>
</template>
<script>

import Register from './components/Register.vue';
import Login from './components/Login.vue';
import Logout from './components/Logout.vue';

export default {
  name: 'App',
  components: {
    Register,
    Login,
    Logout,

  },
  data() {
    return {
      registerWindow: false,
      loginWindow: false,
      isLogin: this.$cookies.get('auth'),

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
    check() {
      this.isLogin = this.$cookies.get('auth');
      this.registerWindow = false;
      this.loginWindow = false;
      this.$router.go();
    },
  },
};
</script>

<style>
body{
  background-color: gray;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
