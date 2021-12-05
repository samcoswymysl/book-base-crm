<template>

  <div class="homeWrapper">
    <h1>Welcome to the Library CRM </h1>
    <p>You can search for your favorite books in API https://openlibrary.org as well as in our database.
       After registration, you can also create your own catalog with your favorite books.
       Use it and enjoy it as much as you want.
     </p>
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
h1{
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
@media (min-width: 700px) {
  h1 {
    font-size: 3em;
  }
  p{
    font-size: 1.5em;
  }
}
</style>
