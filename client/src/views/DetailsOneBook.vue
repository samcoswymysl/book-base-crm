<template>

  <div class="detailsWrapper">
    <h2>xxxxx</h2>

  </div>

</template>

<script>
import connectWithApi from '../connectWithApi';
import Bus from '../config/eventBus';

export default {
  name: 'DetailsOneBook',
  data() {
    return {
      book: {},
    };
  },
  methods: {
    async oneBooks(key) {
      this.details = await connectWithApi.getOneBook(key);
      await console.log(this.details);
    },

  },

};
Bus.$on('show', (book) => {
  console.log('odebrano', book);
});
</script>

<style scoped>

</style>
