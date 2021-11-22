<template>

  <div class="search-wrapper">

    <div class="search-book-container">

      <h1>Books CRM</h1>
      <p class="error" v-if="error">{{ error }}</p>

      <div class="books">
          <label for="title"></label>
          <input
            type="text"
            id="title"
            v-model="title"
            @keyup.enter="searchBooks"
            placeholder="Enter Book's title...">

      </div>

      <div class="books-container">
        <div class="single-book-container"
             v-for="(book) in books"
             :item="book"
             :key="book.key"
        >
          <img class="book-cover-img" v-bind:src="`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`"
               :alt="`Cover ${book.title}`">
          <p>{{book.cover}}</p>

          <p class="authors"
             v-for="(author , index) in book.author_name"
             :key="index"
          >
            Author: {{author}}</p>

          <p>Title: {{ book.title }}</p>

          <Details
            :showAddBtn="true"
            :src="`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`"
            :book="book"
            :authors="book.author_name"
          />

          <addToFav
            v-if="isLogin !== null"
            :src="`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`"
            :alt="`Cover ${book.title}`"
            :book="book"
            :authors="book.author_name"
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

.search-wrapper {
  display: flex;
  flex-direction: column;
  margin: 7vh auto 0 2.5vw;
  width: 65vw
}

.book-title-input {
  padding: 7px 12px;
  font-size: 14px;
  background-color: white;
  border: 1px solid black;
  border-radius: 5px;
  outline: none;
}

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

input{
  width: 30vw;
  display: block;
  margin: 15px auto;
  border-radius: 15px;
  border: 1px solid #e7b1b1;
  color: #e7b1b1;
  padding: 6px 10px;
  text-align: center;
  background-color: rgba(0,0,0, 40%);
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
