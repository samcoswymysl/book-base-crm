<template>
  <div class="deleteFavWrapper">
    <p v-if="error">{{error}}</p>
    <button @click="deleteFav">Delete on fav</button>
  </div>

</template>

<script>
import ConnectWithServ from '../utils/connectWithServ';

export default {
  name: 'DeleteFav',
  props: {
    book: Object,
  },
  data() {
    return {
      error: '',
      deleteInfo: '',
      token: this.$cookies.get('auth'),
    };
  },
  methods: {
    async deleteFav() {
      this.deleteInfo = await ConnectWithServ.deleteOnFav(this.token, this.book);
      this.$emit('refresh');
    },
  },
};
</script>

<style scoped>

</style>
