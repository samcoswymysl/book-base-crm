<template>
  <div
    class="addToFavWrapper"
    >
    <p
      v-if="error"
    >{{error}}</p>
    <p
      v-if="servResponse"
    >
      {{servResponse}}
    </p>
    <button
      class="addToFav"
      v-on:click="sendFavBook"
    >
    Add to Favorite</button>
  </div>
</template>
import Conn

<script>
import ConnectWithServ from '../utils/connectWithServ';

export default {
  name: 'AddToFav',
  props: {
    src: String,
    isLogin: String,
    book: Object,
  },

  data() {
    return {
      error: '',
      token: this.$cookies.get('auth'),
      servResponse: '',
      infoBook: {
        title: this.book.title,
        author: this.book.author,
        coverSrc: this.src,
        bookEditionKey: this.book.edition_key[0],
      },
    };
  },

  methods: {
    async sendFavBook() {
      if (this.isLogin === null) {
        this.error = 'You must login if you want add books to your favorite';
        return;
      }
      this.servResponse = await ConnectWithServ.addToFav(this.token, this.infoBook);
    },

  },

};
</script>

<style scoped>

</style>
