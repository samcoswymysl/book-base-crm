<template>
  <div id="app">
    <video autoplay muted loop id="myVideo">
      <source :src="`${video}`" type="video/mp4">
    </video>
    <Nav class="nav"/>

    <router-view/>
  </div>
</template>
<script>
import video from './assets/video/background.mp4';
import Nav from './components/Nav.vue';

export default {
  name: 'App',
  components: {
    Nav,
  },
  data() {
    return {
      video: '',
    };
  },
  mounted() {
    this.video = video;
  },
};
</script>

<style>
/*Video DziarskiLisek from Pixabay*/

@import url('https://fonts.googleapis.com/css2?family=Arima+Madurai:wght@200;400;700&display=swap');

#myVideo {
  position: fixed;
  right: 0;
  bottom: 0;
  min-width: 100%;
  min-height: 100%;
  z-index: -1;
}

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
  display: flex;
}

.nav{
}
</style>
