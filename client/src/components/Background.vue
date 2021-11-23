<template>
    <video autoplay muted loop id="myVideo">
      <source :src="`${video}`" type="video/mp4">
    </video>
</template>

<script>
import video from '../assets/video/background.mp4';

export default {
  name: 'Background',
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

<style scoped>
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

</style>
