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

    <div
      class="bookDetails"
      v-if="details!==''"
    >
      <img class="detailsImg" :src="`${imgSrc}`"  alt="">
      <p v-if="author">Authors: {{author}}</p>
      <p v-if="details.title">Title: {{details.title}}</p>
      <p v-if="details.isbn_10">ISBN 10: {{details.isbn_10[0]}}</p>
      <p v-if="details.isbn_13">ISBN 13: {{details.isbn_13[0]}}</p>
      <p v-if="details.description">Description: {{details.description}} </p>
      <button class="close" v-on:click="close">Close</button>

    </div>

      <div class="booksContainer"
           v-for="(book) in books"
           v-bind:item="book"
           v-bind:key="book.key"
      >
        <img v-bind:src="`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`"
          alt="fs">
        <p>{{book.cover}}</p>

        <p class="authors"
        v-for="(author , index) in book.author_name"
        v-bind:key="index"
        >
          Author: {{author}}</p>

          <p>Title: {{ book.title }}</p>
            <button
              v-on:click="oneBook($event, book, book.author_name)"
              v-bind:book="book">Details
            </button>

        </div>

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
      errDetails: '',
      details: '',
      imgSrc: '',
      author: '',
    };
  },
  methods: {
    async searchBooks() {
      this.books = await connectWithApi.getBooks(this.title);
    },

    async oneBook(event, book, author) {
      try {
        const e = event.target.closest('div').firstChild;
        this.imgSrc = e ? e.getAttribute('src') : '../assets/img/defultCover.png';
        this.author = author.join(',');
        this.details = await connectWithApi.getOneBook(book.edition_key[0]);
        console.log(this.details);
      } catch (e) {
        console.log(e);
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
.bookDetails{
  background: white;
  position: -webkit-sticky;
  position: sticky;
  top: 15vh;
  left: 15vw;
  z-index: 1;
  width: 70vw;
  height: 70vh;
}

.detailsImg{
  width: 100px;
}
</style>
