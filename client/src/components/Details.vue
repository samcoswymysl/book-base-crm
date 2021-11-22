<template>
  <div class="details Wrapper">
    <div
      class="bookDetails"
      v-if="details!== ''"
    >
      <img class="detailsImg" :src="`${src}`"  :alt="`Cower ${book.title}`">
      <p
        v-for="(author, index) in authors"
        :key="index"
      >Authors: {{author}}
      </p>
      <p v-if="details.title">Title: {{details.title}}</p>
      <p v-if="details.isbn_10">ISBN 10: {{details.isbn_10[0]}}</p>
      <p v-if="details.isbn_13">ISBN 13: {{details.isbn_13[0]}}</p>
      <p v-if="details.description">Description: {{details.description}} </p>
      <button
        class="close"
        @click="close"
      >Close</button>
      <AddToFav
        v-if="isLogin !== null && showAddBtn"
        :src="src"
        :authors="authors"
        :book="book"
      />

    </div>

    <button
      @click="oneBook($event, book, book.author_name)"
      :book="book">Details
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
    showAddBtn: Boolean,
    src: String,
    authors: Array,
    book: Object,

  },
  data() {
    return {
      details: '',
      isLogin: this.$cookies.get('auth'),
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
