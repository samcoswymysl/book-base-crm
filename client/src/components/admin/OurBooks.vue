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
        <p>{{book.title}}</p>
        <p>{{book.isbn}}</p>

        <button>Edit</button>
        <button
          @click="deleteBook(book)"
        >Delete</button>

      </div>

    </div>

  </div>

</template>

<script>
import AdminUtils from '../../utils/adminUtils';

export default {
  name: 'OurBooks',
  props: {
    ourBooks: Array,
  },
  methods: {
    async deleteBook(book) {
      await AdminUtils.deleteBook(this.$cookies.get('auth'), book);
      this.$emit('reloadBook');
    },
  },

};
</script>

<style scoped>

</style>
