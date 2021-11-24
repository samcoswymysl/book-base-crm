<template>
  <div class="adminNavWrapper">
    <ul>
      <li class="users" @click="users">Users</li>
      <li class="ourBook">Our books</li>
      <li class="addNewBook">Add new book</li>
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
