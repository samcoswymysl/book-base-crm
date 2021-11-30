<template>
  <div class="usersWrapper">
    <div
      v-if="users"
      class="users"
    >

      <p
        class="error"
        v-if="error"
      >{{error}}</p>
     <table>
       <thead>
         <tr>
           <th>Name</th>
           <th>Admin</th>
           <th></th>
         </tr>
       </thead>
       <tbody>
         <tr
           v-for="(user) in users"
           :key="user.id"
         >

           <td>{{user.name}}</td>

           <td>{{user.admin}}</td>

           <td>

             <button
              @click="deleteOnUser(user)"
             >Delete</button>

             <button
              @click="chngeAdmin(user)"
             >Set Admin</button>

             <button
              @click="resetPass(user)"
             >Reset Password</button>

           </td>
         </tr>

       </tbody>

     </table>

      </div>
  </div>

</template>

<script>
import AdminUtils from '../../utils/adminUtils';

export default {
  name: 'Users',
  props: {
    users: Array,
  },
  data() {
    return {
      adminStatus: '',
      error: '',
      resPassword: '',
      delete: '',

    };
  },
  methods: {
    async chngeAdmin(user) {
      try {
        this.adminStatus = await AdminUtils.changeAdminStatus(this.$cookies.get('auth'), user);
        this.$emit('reload');
      } catch (er) {
        this.error = er.message;
      }
    },
    async resetPass(user) {
      try {
        this.resPassword = await AdminUtils.resetPasword(this.$cookies.get('auth'), user);
      } catch (er) {
        this.error = er.massage;
      }
    },

    async deleteOnUser(user) {
      try {
        this.delete = await AdminUtils.deleteUser(this.$cookies.get('auth'), user);
        this.$emit('reload');
      } catch (er) {
        this.error = er.massage;
      }
    },
  },
};
</script>

<style scoped>

.usersWrapper{
  display: flex;
  max-width: 65vw;
  flex-direction: column;
  margin: 7vh 2vw 0 3vw
}

table{
  width: 60vw;
}
table * {
  font-weight: bold;
  border-bottom: 1px solid #e7b1b1;
  padding: 1%;
}
button{
  display: inline-block;
  margin: 10px;
  padding: 5px 15px;
  border-radius: 10px;
  background-color: rgba(0,0,0, .4);
  border: 1px solid #e7b1b1;
  color: #e7b1b1;
  font-weight: normal;
}

button:hover{
  box-shadow:  0 0 6px 1px #e7b1b1;
  color: #eb1fb5;
}

</style>
