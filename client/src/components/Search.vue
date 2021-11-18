<template>
  <div class="searchWrapper">
    <h1>Books CRM</h1>
    <p class="error" v-if="error">{{ error }}</p>

    <div class="books">
      <label for="title"></label>
      <input type="text" id="title" v-model="title" placeholder="Title">
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
          <button v-on:click="oneBooks(book.lending_edition_s)">Details</button>
        </p>
      </div>

    </div>

  <button
    v-on:click="searchBooks"
  >
    Find</button>
  </div>
</template>

<script>
import connectWithApi from '../connectWithApi';

export default {
  name: 'Search',
  data() {
    return {
      books: [],
      title: '',
      error: '',
      data: '',
    };
  },
  async findBooks() {
    try {
      console.log('x');
      const booksJSON = await connectWithApi.getBooks(this.title);
      this.books = await JSON.parse(booksJSON);
    } catch (e) {
      this.error = e.message;
    }
  },
  methods: {
    async searchBooks() {
      this.books = await connectWithApi.getBooks(this.title);
      console.log('books', this.books);
    },
    async oneBooks(key) {
      this.data = await connectWithApi.getOneBook(key);
      await console.log(this.data);
    },

  },

};
</script>

<style scoped>
</style>
