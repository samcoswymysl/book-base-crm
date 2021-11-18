<template>

  <div class="detailsWrapper">
    <h2>Title:</h2>
    <button v-on:click="one">klik</button>
    <p v-bind="details">{{ book }}</p>

  </div>

</template>

<script>
import Bus from '../config/eventBus';

export default {
  name: 'DetailsOneBook',
  props: ['book'],

  data() {
    return {
      counter: this.book,
      details: {},
    };
  },
  methods: {
    one() {
      console.log(this.book);
      console.log(this.counter);
    },

  },
  created() {
    Bus.$on('show', (book) => {
      console.log('x');
      this.book = book;
    });
  },

};

</script>

<style scoped>

</style>
