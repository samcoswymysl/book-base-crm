<template>
  <div class="homeWrapper">
    <h2>Welcome to the Library CRM </h2>
    <p>You can log in here and search your favorite books in the https://openlibrary.org database and after registration you can add your favorite books to your shelf</p>
  </div>
</template>

<script>

export default {
  name: 'Home',
};
</script>
s
<style scoped>
.homeWrapper{
  display: flex;
  flex-direction: column;
  margin: .5vh auto 0 1vw;
  width: 65vw
}
h2{
  font-size: 2em;
  font-weight: 900;
  padding: 1em;
}

p{
  margin: .5em auto;
  font-size: 1.1em;
  padding: .5em 2em;
  text-align: center;

}
</style>
