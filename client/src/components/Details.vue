<template>
  <div class="detailsWrapper">
    <div
      class="bookDetails"
      v-if="details"
    >
      <img class="detailsImg" :src="`${src}`"  :alt="`Cower ${book.title}`">
      <p
        v-for="(author, index) in authors"
        :key="index"
      >Authors: {{author}}
      </p>
      <p v-if="book.title">Title: {{book.title}}</p>
      <p v-if="isbn_10">ISBN 10: {{isbn_10}}</p>
      <p v-if="isbn_13">ISBN 13: {{isbn_13}}</p>
      <p v-if="edition_key">Book Edition key: {{edition_key}}</p>
      <p v-if="description">Description: {{description}} </p>
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
      details: false,
      isLogin: this.$cookies.get('auth'),
      isbn_10: '',
      isbn_13: '',
      description: '',
      edition_key: '',

    };
  },
  methods: {
    async oneBook(event, book) {
      try {
        if (book.fromBase) {
          console.log(book.fromBase);
          console.log('xxxx');
          this.isbn_10 = book.isbn_10;
          this.isbn_13 = book.isbn_13;
          this.description = book.description;
          this.edition_key = (typeof book.edition_key === 'string') ? book.edition_key : book.edition_key[0];
          this.details = true;
          return;
        }
        this.edition_key = (typeof book.edition_key === 'string') ? book.edition_key : book.edition_key[0];
        const details = await connectWithApi.getOneBook(this.edition_key);
        if (details.isbn_10) {
          // eslint-disable-next-line prefer-destructuring
          this.isbn_10 = details.isbn_10[0];
        }
        if (details.isbn_13) {
          // eslint-disable-next-line prefer-destructuring
          this.isbn_13 = details.isbn_13[0];
        }
        if (details.description) {
          this.description = details.description.value;
          console.log(details);
        }
        this.details = true;
      } catch (e) {
        this.errDetails = e ? 'We dont have any information' : '';
      }
    },

    close() {
      this.details = false;
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
  background-color: rgba(0,0,0, .4);
  border: 1px solid #e7b1b1;
  color: #e7b1b1;
}

button:hover{
  box-shadow:  0 0 6px 1px #e7b1b1;
  color: #eb1fb5;
}

.bookDetails{
  padding: 4vh;
  position: fixed;
  font-size: 2.7vh;
  top: 13vh;
  left: 5vw;
  width: 60vw;
  height: 80vh;
  z-index: 5;
  background-color:rgba(0, 0, 0, .7);
  box-shadow:  0 0 6px 1px #e7b1b1;
}

.bookDetails:hover{
  box-shadow:  0 0 8px 3px #e7b1b1;

}

img{
  width: 14vw;
  height: 17vw;
}

</style>
