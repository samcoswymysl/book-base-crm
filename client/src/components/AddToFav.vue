<template>
  <div
    class="addToFavWrapper"
    >
    <p
      v-if="servResponse.massage"
    >{{servResponse.massage}}</p>
    <button
      class="addToFav"
      @click="sendFavBook"
    >
    Add to Favorite</button>
  </div>
</template>

<script>
import ConnectWithServ from '../utils/connectWithServ';

export default {
  name: 'AddToFav',
  props: {
    src: String,
    authors: Array,
    book: Object,
    fromBase: Boolean,
  },

  data() {
    return {
      token: this.$cookies.get('auth'),
      servResponse: '',
      infoBook: {
        fromBase: this.fromBase,
        title: this.book.title,
        authors: this.authors,
        coverSrc: this.src,
        edition_key: this.book.edition_key[0],
      },
    };
  },

  methods: {
    async sendFavBook() {
      console.log(this.infoBook);
      if (this.token === null) {
        this.error = 'You must login if you want add books to your favorite';
        return;
      }
      this.servResponse = await ConnectWithServ.addToFav(this.$cookies.get('auth'), this.infoBook);
      console.log(this.servResponse);
      if (this.servResponse.status) {
        this.$router.go();
      }
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

</style>
