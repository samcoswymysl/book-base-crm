<template>

  <div class="search-wrapper">

    <div class="search-book-container">

      <h1>Books CRM</h1>
      <p class="error" v-if="error">{{ error }}</p>

      <div class="books">
          <label for="title"></label>
          <input
            class="book-title-input"
            type="text"
            id="title"
            v-model="title"
            v-on:keyup.enter="searchBooks"
            placeholder="Enter Book's title...">

      </div>

      <div class="books-container">
        <div class="single-book-container"
             v-for="(book) in books"
             v-bind:item="book"
             v-bind:key="book.key"
        >
          <img class="book-cover-img" v-bind:src="`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`"
               alt="fs">
          <p>{{book.cover}}</p>

          <p class="authors"
             v-for="(author , index) in book.author_name"
             v-bind:key="index"
          >
            Author: {{author}}</p>

          <p>Title: {{ book.title }}</p>

          <Details
            v-bind:src="`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`"
            v-bind:book="book"
            v-bind:authors="book.author_name"
          />

          <addToFav
            v-if="isLogin !== null"
            v-bind:src="`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`"
            v-bind:book="book"
            v-bind:authors="book.author_name"
          />

        </div>
      </div>

    </div>
  </div>
</template>

<script>
import connectWithApi from '../utils/connectWithApi';
import AddToFav from '../components/AddToFav.vue';
import Details from '../components/Details.vue';

export default {
  name: 'Search',
  components: {
    AddToFav,
    Details,
  },

  data() {
    return {
      books: [],
      title: '',
      error: '',
      errDetails: '',
      imgSrc: '',
      author: '',
      isLogin: this.$cookies.get('auth'),
    };
  },
  methods: {
    async searchBooks() {
      this.books = await connectWithApi.getBooks(this.title);
      this.title = '';
    },
  },

};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;700&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

.search-wrapper {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 80%
}

.book-title-input {
  padding: 7px 12px;
  font-size: 14px;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  outline: none;
}

.book-title-input {
  margin-right: 5px;
  color: lightslategrey;
}

.book-title-input:focus {
  color: black;
}
/*.find-book-button {*/
/*  color: black;*/
/*  cursor: pointer;*/
/*  transition: color .3s, background-color .3s;*/
/*}*/

/*.find-book-button:hover {*/
/*  color: white;*/
/*  background-color: black;*/
/*}*/

.books-container {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 50px;
}

.single-book-container {
  margin-bottom: 50px;
  width: 17%;
}

.book-cover-img {
  width: 100%;
}

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
