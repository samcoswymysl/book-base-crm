<template>
  <div class="adminWrapper">
  <h1>Admin Panel</h1>
  <p v-if="message">{{message}}</p>
    <NavAdmin
      v-if="!message"
      @showUsers="getUsers"
    />
    <Users
    v-if="usersList.length"
    :users="usersList"
    @reload="getUsers"
    />
  </div>
</template>

<script>
import AdminUtils from '../utils/adminUtils';
import NavAdmin from '../components/admin/AdminNav.vue';
import Users from '../components/admin/Users.vue';

export default {
  name: 'Admin',
  components: {
    NavAdmin,
    Users,
  },

  data() {
    return {
      message: '',
      checkStatus: '',
      usersList: [],
    };
  },
  methods: {
    async getUsers() {
      this.usersList = await AdminUtils.showUserList(this.$cookies.get('auth'));
    },
  },
  async created() {
    try {
      this.checkStatus = await AdminUtils.openAdminPanel(this.$cookies.get('auth'));
    } catch (e) {
      this.message = e.message;
    }
  },
};
</script>

<style scoped>
.adminWrapper{
  display: flex;
  flex-direction: column;
  margin: 7vh auto 0 2.5vw;
  width: 65vw
}
</style>
