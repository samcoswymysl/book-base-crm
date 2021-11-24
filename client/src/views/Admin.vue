<template>
  <div class="adminWrapper">
  <h1>Admin Panel</h1>
  <p>{{message}}</p>
  </div>

</template>

<script>
import ConnectWithServ from '../utils/connectWithServ';

export default {
  name: 'Admin',

  data() {
    return {
      message: '',
    };
  },
  async created() {
    const checkStatus = await ConnectWithServ.openAdminPanel(this.$cookies.get('auth'));
    if (checkStatus.status !== 200) {
      this.message = checkStatus.message;
    }
  },
};
</script>

<style scoped>

</style>
