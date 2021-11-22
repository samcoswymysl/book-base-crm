<template>
  <div class="details Wrapper">
    <div
      class="bookDetails"
      v-if="details!== ''"
    >
      <img class="detailsImg" :src="`${src}`"  alt="">
      <p
        v-for="(author, index) in authors"
        v-bind:key="index"
      >Authors: {{author}}
      </p>
      <p v-if="details.title">Title: {{details.title}}</p>
      <p v-if="details.isbn_10">ISBN 10: {{details.isbn_10[0]}}</p>
      <p v-if="details.isbn_13">ISBN 13: {{details.isbn_13[0]}}</p>
      <p v-if="details.description">Description: {{details.description}} </p>
      <button
        class="close"
        v-on:click="close"
      >Close</button>
      <AddToFav
      v-bind:src="src"
      v-bind:authors="authors"
      v-bind:book="book"
      />

    </div>

    <button
      v-on:click="oneBook($event, book, book.author_name)"
      v-bind:book="book">Details
    </button>
  </div>
</template>

<script>
import connectWithApi from '../utils/connectWithApi';
import AddToFav from './AddToFav.vue';

export default {
  name: 'Details',
  components: {
    AddToFav,
  },
  props: {
    src: String,
    authors: Array,
    book: Object,

  },
  data() {
    return {
      details: '',
    };
  },
  methods: {
    async oneBook(event, book) {
      try {
        this.details = await connectWithApi.getOneBook(book.edition_key[0]);
      } catch (e) {
        this.errDetails = e ? 'We dont have any information' : '';
      }
    },

    close() {
      this.details = '';
    },
  },
};
</script>

<style scoped>

</style>
