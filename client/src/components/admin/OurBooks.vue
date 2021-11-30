<template>
  <div class="ourBooksWrapper">
    <div
      class="ourBooks"
      v-if="ourBooks.length"
    >
      <div
        class="oneBook"
        v-for="(book, index) in ourBooks"
        :key="index"
      >
        <img
          v-if="book.coverSrc"
          :src="book.coverSrc"
          :alt="`${book.title} cover`"
        >

        <p>{{book.title}}</p>
        <p>{{book.author1}}</p>
        <p v-if="book.author2">{{book.author2}}</p>
        <p v-if="book.author3">{{book.author3}}</p>
        <p>{{book.isbn_10}}</p>
        <p v-if="book.isbn_13">{{book.isbn_13}}</p>
        <p>{{book.edition_key[0]}}</p>
        <EditBook
          :book="book"
          @refreshCorrectBook="refreshBook"
        />
        <button
          @click="deleteBook(book)"
        >Delete</button>
      </div>

    </div>

  </div>

</template>

<script>
import AdminUtils from '../../utils/adminUtils';
import EditBook from './EditBook.vue';

export default {
  name: 'OurBooks',
  components: {
    EditBook,
  },
  props: {
    ourBooks: Array,
  },
  data() {
    return {

    };
  },
  methods: {
    async deleteBook(book) {
      await AdminUtils.deleteBook(this.$cookies.get('auth'), book);
      this.$emit('reloadBook');
    },
    refreshBook() {
      this.$emit('reloadBook');
    },
  },

};
</script>

<style scoped>

.ourBooksWrapper{
  display: flex;
  flex-direction: column;
  margin:  7vh auto 0;
  width: 65vw;
}

.ourBooks {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 50px;
}

.oneBook {
  min-width: 200px;
  height: 70vh;
  font-size: 3vh;
  margin:50px 0;
  width: 19vw;
}

img {
  width: 60%;
  height: 50%;
}

@media (min-width: 700px) {
  h1 {
    font-size: 3em;
  }

  img {
    height: 35%;
  }
}

button{
  display: inline-block;
  margin: 10px;
  padding: 5px 15px;
  border-radius: 10px;
  background-color: rgba(0,0,0, .4);
  border: 1px solid #e7b1b1;
  color: #e7b1b1;
  font-weight: normal;
}

button:hover{
  box-shadow:  0 0 6px 1px #e7b1b1;
  color: #eb1fb5;
}
</style>
