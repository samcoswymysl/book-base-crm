<template>

  <div class="editBookWrapper">
    <div
      class="edit"
      v-if="edit"
    >
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
      @click="save"
    >Submit</button>
    </div>

    <button
      @click="editBook"
    >Edit</button>

  </div>
</template>

<script>
import AdminUtils from '../../utils/adminUtils';

export default {
  name: 'EditBook',
  props: {
    book: Object,
  },
  data() {
    return {
      edit: false,
      error: '',
      title: this.book.title,
      author1: this.book.authors[0],
      author2: this.book.authors[1],
      author3: this.book.authors[2],
      isbn_10: this.book.isbn_10,
      isbn_13: this.book.isbn_13,
      description: this.book.description,
      coverSrc: this.book.coverSrc,
      bookEditionKey: this.book.edition_key,
      authors: [],
      correctedBook: {},
      checkData: false,
      serverResponse: '',
    };
  },
  methods: {
    editBook() {
      this.edit = !this.edit;
    },
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

    async save() {
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

      this.correctedBook = {
        title: this.title,
        authors: this.authors,
        isbn_10: this.isbn_10,
        isbn_13: this.isbn_13,
        description: this.description,
        coverSrc: this.coverSrc,
        bookEditionKey: this.bookEditionKey,
        // eslint-disable-next-line no-underscore-dangle
        _id: this.book._id,
      };

      this.serverResponse = await AdminUtils.correctBook(this.$cookies.get('auth'), this.correctedBook);

      if (this.serverResponse) {
        this.edit = false;
      }
    },

  },

};

</script>

<style scoped>
label {
  display: block;
}

textarea{
  display: block;
  margin: 10px auto;
}

</style>
