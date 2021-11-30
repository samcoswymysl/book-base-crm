<template>
  <div class="addNewBookWrapper">
    <p v-if="error">{{error}}</p>

    <label for="title">Book title</label>
    <input
      id="title"
      type="text"
      required
      v-model="title"
    >

    <label for="author1">Author</label>
    <input
      id="author1"
      type="text"
      required
      v-model="author1"
    >

    <label for="author2">Second Author</label>
    <input
      id="author2"
      type="text"
      v-model="author2"
    >

    <label for="author3">Third Author</label>
    <input
      id="author3"
      type="text"
      v-model="author3"
    >

    <label for="bookEditionKey">Book Edition Key</label>
    <input
      id="bookEditionKey"
      type="text"
      required
      v-model="bookEditionKey"
    >

    <label for="isbn10">ISBN 10</label>
    <input
      id="isbn10"
      type="text"
      required
      v-model="isbn_10"
    >

    <label for="isbn13">ISBN 13</label>
    <input
      id="isbn13"
      type="text"
      v-model="isbn_13"
    >

    <label for="coversrc">Cover URL</label>
    <input
      id="coversrc"
      type="text"
      v-model="coverSrc"
    >

    <textarea
      name="Description"
      cols="30"
      rows="10"
      v-model="description"
    >Description</textarea>

    <button
      @click="addNewBook"
    >Submit</button>

  </div>

</template>

<script>
import AdminUtils from '../../utils/adminUtils';

export default {
  name: 'AddNewBook',
  data() {
    return {
      title: '',
      author1: '',
      author2: '',
      author3: '',
      isbn_10: '',
      isbn_13: '',
      description: '',
      coverSrc: '',
      bookEditionKey: '',
      authors: [],
      error: '',
      checkData: false,
      newBook: {},
      serverResponse: '',

    };
  },
  methods: {
    checkRequiredData() {
      if (this.title.length <= 2) {
        this.error = 'Book title is to short should have 4 letter';
        return false;
      }
      if (this.author1.length <= 4) {
        this.error = 'Author name is to short should have 4 letter';
        return false;
      }
      if (this.bookEditionKey.length <= 10) {
        this.error = 'Book edition key is to short should have 10 characters';
        return false;
      }
      if (!(this.isbn_10.length === 10 || this.isbn_10.isNaN)) {
        this.error = 'ISBN 10 should have 10 numbers';
        return false;
      }
      return true;
    },

    async addNewBook() {
      this.checkData = this.checkRequiredData();
      if (!this.checkData) {
        this.error = 'Check Book Data';
        return;
      }
      this.authors.push(this.author1);
      if (this.author2) {
        this.authors.push(this.author2);
      }
      if (this.author3) {
        this.authors.push(this.author3);
      }

      this.newBook = {
        title: this.title,
        authors: this.authors,
        isbn_10: this.isbn_10,
        isbn_13: this.isbn_13,
        description: this.description,
        coverSrc: this.coverSrc,
        bookEditionKey: this.bookEditionKey,
      };

      this.serverResponse = await AdminUtils.addBook(this.$cookies.get('auth'), this.newBook);

      if (this.serverResponse) {
        this.title = '';
        this.authors = [];
        this.isbn_10 = '';
        this.isbn_13 = '';
        this.description = '';
        this.coverSrc = '';
        this.bookEditionKey = '';
        this.author1 = '';
        this.author2 = '';
        this.author3 = '';
      }
    },
  },

};
</script>

<style scoped>

label {
  display: block;
}
input{
  width: 45vw;
  border-radius: 15px;
  border: 1px solid #e7b1b1;
  color: #e7b1b1;
  padding: 6px 10px;
  text-align: center;
  background-color: rgba(0, 0, 0, .4);
}

textarea{
  width: 45vw;
  display: block;
  margin: 20px auto;
  border-radius: 15px;
  border: 1px solid #e7b1b1;
  color: #e7b1b1;
  padding: 6px 10px;
  text-align: center;
  background-color: rgba(0,0,0, .4);

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
