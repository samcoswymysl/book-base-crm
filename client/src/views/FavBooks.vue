<template>
  <div class="favWrapper">
    <h1>Your favorite books</h1>
    <p
      v-if="authorize"
    >{{ authorize }}</p>
    <div
      class="favBooksList"
      v-if="favBookArr.length > 0"
    >
      <div
        class="book"
        v-for="(book) in favBookArr"
        v-bind:key="book.bookEditionKey"
      >
        <img v-bind:src="`${book.coverSrc}`" v-bind:alt="`Cover book ${book.title}`">
        <p>{{book.title}}</p>
        <p
          v-for="(author, index) in book.authors"
          v-bind:key="index"
        >{{author}}</p>
        <Details
          v-bind:src="book.coverSrc"
          v-bind:book="book"
          v-bind:authors="book.authors"
        />
        <DeleteFav
        v-bind:book="book"
        v-on:refresh="refreshBooks"
        />

      </div>
    </div>
  </div>
</template>

<script>
import ConnectWithServ from '../utils/connectWithServ';
import Details from '../components/Details.vue';
import DeleteFav from '../components/DeleteFav.vue';

export default {
  name: 'FavBooks',
  components: {
    Details,
    DeleteFav,
  },

  data() {
    return {
      authorize: '',
      favBookArr: [],
    };
  },
  methods: {
    async refreshBooks() {
      if (this.$cookies.get('auth') === null) {
        this.authorize = 'You must Login';
        return;
      }
      this.favBookArr = await ConnectWithServ.getFavorite(this.$cookies.get('auth'));
    },

  },

  async created() {
    if (this.$cookies.get('auth') === null) {
      this.authorize = 'You must Login';
      return;
    }
    this.favBookArr = await ConnectWithServ.getFavorite(this.$cookies.get('auth'));
  },

};

</script>
