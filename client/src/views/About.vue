<template>
  <div class="aboutWrapper">
  <h1>About Library CRM</h1>
    <p>
      Hello in our little app. It was created as part of learning JavaScript programming using the
       Express and Vue frameworks and with the use of MongoDB.
       The application allows you to search for books in the API
       https://openlibrary.org/ and in our Data Base. It is also possible to register the
       user and log in, while using the application, the Client is authenticated using the
       Json Web Token and can add his favorite books.
       the application also has an administrator panel, also with authentication,
       a person with administrator rights can:
    </p>

     <ul>
      <li>Delete users</li>
      <li>reset passwords</li>
      <li>give admin to other users</li>
      <li>add new books to the database</li>
      <li>delete books from the database</li>
      <li>edit existing documents in the database</li>
      </ul>
    <p>
    contact with me: rafalkrukowskipraca123@gmail.com
    </p>
  </div>
</template>
<script>
export default {
  name: 'About',
};
</script>

<style scoped>
.aboutWrapper{
  display: flex;
  flex-direction: column;
  margin: 7vh auto 0 2.5vw;
  width: 65vw;
  padding: 4vw;
}
p{
  text-transform: uppercase;
  text-align: justify;
}
ul{
  margin: 12px;
  list-style-type: none;
  text-align: left;
}

@media (min-width: 700px) {
  h1 {
    font-size: 3em;
  }
  p{
    margin-top: 40px;
    font-size: 1.5em;
  }
}
</style>
