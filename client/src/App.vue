<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/search">Search</router-link> |
      <router-link to="/about">About</router-link>|
      <router-link to="/favorite">Your Favorite Books</router-link> |

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
    <router-view/>
  </div>
</template>
<script>
import Register from './components/Register.vue';
import Login from './components/Login.vue';

export default {
  name: 'App',
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
