<template>
  <div id="nav">
    <p class="userName"  v-if="userName !== null">Welcome {{userName}}</p>
    <router-link to="/">Home</router-link>
    <router-link to="/search">Search</router-link>
    <router-link to="/about">About</router-link>
    <router-link to="/favorite" ref="fav" >Your Books</router-link>
    <router-link to="/admin"
                 v-if="this.$cookies.get('auth') !== null"
                 @click="checkAdmin"
    >Admin</router-link>

<!--    link do logowania-->
    <a
      v-if="isLogin === null"
      @click="login"
    >Login</a>
<!--    link do rejestracji-->
    <a
      v-if="isLogin === null"
      @click="register"
    >Register
    </a>
<!--    link do wylogowania-->
    <Logout
      v-if="isLogin !== null"
      @change="check"
    />
<!--    okienko logowania-->
    <Login
      v-if="loginWindow"
      @change="check"
    />
<!--    okienko rejestracji-->
    <Register
      v-if="registerWindow"
    />
  </div>
</template>

<script>

import Register from './Register.vue';
import Login from './Login.vue';
import Logout from './Logout.vue';

export default {
  name: 'Nav',
  components: {
    Register,
    Login,
    Logout,
  },
  data() {
    return {
      userName: this.$cookies.get('userName'),
      registerWindow: false,
      loginWindow: false,
      isLogin: this.$cookies.get('auth'),
      video: '',
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

<style scoped>
#nav {
  display: flex;
  position: fixed;
  width: 30%;
  height: 100vh;
  padding: .1em;
  margin-top: 6vh;
  flex-direction: column;
  background-color: rgba(0,0,0,.1);

}

a{
  padding: .4em;
  color: #e7b1b1;
  font-weight: bold;
  text-decoration: none;
}

a:hover{
  color:#eb1fb5;
}

p.userName{
  padding: 5px;
  font-weight: bold;
  font-size: 115%;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #eb1fb5;
  border-bottom: 1px solid #eb1fb5;
}

@media (min-width: 700px) {
  a{
    font-size: 1.3em;
  }
}
</style>
