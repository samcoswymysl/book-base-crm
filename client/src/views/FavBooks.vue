<template>
  <div class="favWrapper">
    <h1>Your favorite books</h1>
    <p
      class="unauthorized"
      v-if="authorize"
    >{{ authorize }}</p>
    <div
      class="favBooksList"
      v-if="favBookArr.length > 0"
    >
      <div
        class="book"
        v-for="(book) in favBookArr"
        :key="book.bookEditionKey"
      >
        <img :src="`${book.coverSrc}`" :alt="`Cover book ${book.title}`">
        <p>{{book.title}}</p>
        <p
          v-for="(author, index) in book.authors"
          :key="index"
        >{{author}}</p>
        <Details
          :showAddBtn="false"
          :src="book.coverSrc"
          :book="book"
          :authors="book.authors"
        />
        <DeleteFav
        :book="book"
        @refresh="refreshBooks"
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
<style scoped>
.favWrapper{
  display: flex;
  flex-direction: column;
  margin: 7vh auto 0 2.5vw;
  width: 65vw
}
.favBooksList{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-top: 50px;
}
.book{
  min-width: 200px;
  height: 70vh;
  font-size: 3vh;
  margin:50px 0;
  width: 19vw;
}

img{
  width: 60%;
  height: 50%;
}

p.unauthorized{
  color: #eb1fb5;
}

@media (min-width: 700px) {
  h1 {
    font-size: 3em;
  }

  img {
    height: 35%;
  }
}
</style>
