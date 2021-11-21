<template>
  <div class="about">
    <h1>Your favorite books</h1>
    <p v-if="InformationLogin">{{ InformationLogin }}</p>
  </div>
</template>

<script>
import ConnectWithServ from '../utils/connectWithServ';

export default {
  name: 'FavBooks',

  data() {
    return {
      InformationLogin: '',
    };
  },
  methods: {},

  async created() {
    if (this.$cookies.get('auth') === null) {
      this.InformationLogin = 'You must Login';
      return;
    }
    this.InformationLogin = await ConnectWithServ.getFavorite(this.$cookies.get('auth'));
  },

};

</script>
