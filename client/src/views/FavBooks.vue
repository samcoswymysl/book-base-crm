<template>
  <div class="about">
    <h1>Your favorite books</h1>
    <p v-if="InormationLogin">{{ InormationLogin }}</p>

  </div>
</template>

<script>
export default {
  name: 'FavBooks',

  data() {
    return {
      InormationLogin: '',
    };
  },
  methods: {
  },

};

</script>
