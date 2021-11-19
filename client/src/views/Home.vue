<template>
  <div class="home">
    <Register/>
    <h2>Welcome to the LiberyCRM </h2>
    <p>You can log in here and search for books in the https://openlibrary.org database and after registration you can add your favorite books to your shelf</p>
  </div>
</template>

<script>

import Register from '../components/Register.vue';

export default {
  name: 'Home',
  components: {
    Register,
  },
};
</script>
