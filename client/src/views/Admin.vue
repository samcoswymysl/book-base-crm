<template>
  <div class="adminWrapper">
  <h1>Admin Panel</h1>
  <p v-if="message">{{message}}</p>
    <NavAdmin
      v-if="!message"
      @showUsers="getUsers"
      @showOurBooks="getOurBooks"
      @addBook="showAddPanel"
    />
    <Users
    v-if="show === 'users'"
    :users="usersList"
    @reload="getUsers"
    />

    <our-books
    v-if="show === 'books'"
    :ourBooks="oruBooksList"
    @reloadBook="getOurBooks"
    />

    <AddNewBook
    v-if="show === 'add'"
    />

  </div>
</template>

<script>
import AdminUtils from '../utils/adminUtils';
import NavAdmin from '../components/admin/AdminNav.vue';
import Users from '../components/admin/Users.vue';
import OurBooks from '../components/admin/OurBooks.vue';
import AddNewBook from '../components/admin/AddNewBook.vue';

export default {
  name: 'Admin',
  components: {
    NavAdmin,
    Users,
    OurBooks,
    AddNewBook,
  },

  data() {
    return {
      message: '',
      checkStatus: '',
      show: '',
      usersList: [],
      oruBooksList: [],
    };
  },
  methods: {
    async getUsers() {
      this.usersList = await AdminUtils.showUserList(this.$cookies.get('auth'));
      this.show = 'users';
    },
    async getOurBooks() {
      this.oruBooksList = await AdminUtils.getOurBooksFromServ(this.$cookies.get('auth'));
      console.log(this.oruBooksList);
      this.show = 'books';
    },

    showAddPanel() {
      console.log('xxxx');
      this.show = 'add';
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
