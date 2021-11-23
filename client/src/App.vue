<template>
  <div id="app">
    <background/>
    <Nav/>
    <router-view/>
  </div>
</template>
<script>

import Nav from './components/Nav.vue';
import Background from './components/Background.vue';

export default {
  name: 'App',
  components: {
    Nav,
    Background,
  },
  data() {
    return {
    };
  },
};
</script>

<style>

*{
  margin: 0;
  padding: 0;
  border: none;
  box-sizing: border-box;
}

#app {
  display: flex;
  flex-direction: row-reverse;
  max-height: 100vw;
  font-family: 'Arima Madurai', sans-serif;
  text-align: center;
  color: #e7b1b1;
}
</style>
