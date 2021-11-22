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
