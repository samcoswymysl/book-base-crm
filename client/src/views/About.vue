<template>
  <div class="aboutWrapper">
  <h2>About Library CRM</h2>
    <p>Hello in our little app. It was created as part of learning JavaScript programming using the
       Express and Vue frameworks and with the use of MongoDB.
       The application allows you to search for books in the API
       https://openlibrary.org/. It is also possible to register the
       user and log in, while using the application, the Client is authenticated using the
       Json Web Token and can add his favorite books.
       Best regards and have fun with our app.</p>
  </div>
</template>
<script>
export default {
  name: 'About',
};
</script>

<style>
.aboutWrapper{
  display: flex;
  flex-direction: column;
  margin: 7vh auto 0 2.5vw;
  width: 65vw
}

</style>
