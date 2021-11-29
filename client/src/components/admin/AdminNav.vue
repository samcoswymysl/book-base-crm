<template>
  <div class="adminNavWrapper">
    <ul>
      <li class="users" @click="users">Users</li>
      <li class="ourBook" @click="ourBooks">Our books</li>
      <li class="addNewBook" @click="addNew">Add new book</li>
    </ul>

  </div>

</template>

<script>
export default {
  name: 'AdminNav',
  methods: {
    users() {
      this.$emit('showUsers');
    },

    ourBooks() {
      this.$emit('showOurBooks');
    },
    addNew() {
      this.$emit('addBook');
    },
  },

};
</script>

<style scoped>
ul{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  list-style-type: none;
}
li {
  display: block;
  cursor: pointer;
}

</style>
