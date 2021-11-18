<template>
  <div class="searchWrapper">
    <h1>Books CRM</h1>
    <p class="error" v-if="error">{{ error }}</p>

    <div class="books">
      <label for="title"></label>
      <input type="text" id="title" v-model="title" placeholder="Title">
      <button
        v-on:click="searchBooks"
      >
        Find</button>
    </div>
      <div class="booksContainer"
           v-for="(book) in books"
           v-bind:item="book"
           v-bind:key="book.key"
      >
        <img :src="`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`" alt="fs">
        <p>{{book.cover}}</p>

        <p class="authors"
        v-for="(author , index) in book.author_name"
        v-bind:key="index"
        >
          Author: {{author}}</p>

        <p class="text">
          Title: {{ book.title }}
          <router-link to="/detailsonebook"
          >
            <button
              v-on:click="showDetails(book)"
              v-bind:book="book">Details
            </button>
          </router-link>

        </p>
      </div>

    </div>

</template>

<script>
import connectWithApi from '../connectWithApi';
import Bus from '../config/eventBus';

export default {
  name: 'Search',
  props: {
    book: {
      type: String,
    },
  },
  data() {
    return {
      books: [],
      title: '',
      error: '',
      details: {},
    };
  },
  async findBooks() {
    try {
      const booksJSON = await connectWithApi.getBooks(this.title);
      this.books = await JSON.parse(booksJSON);
    } catch (e) {
      this.error = e.message;
    }
  },
  methods: {
    async searchBooks() {
      this.books = await connectWithApi.getBooks(this.title);
    },

    showDetails(book) {
      console.log('xxxx');
      Bus.$emit('show', book);
    },

  },

};
</script>

<style scoped>
</style>
