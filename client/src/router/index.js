import Vue from 'vue';
import VueRouter from 'vue-router';
import Search from '../views/Search.vue';
import Home from '../views/Home.vue';
import FavBooks from '../views/FavBooks.vue';

Vue.use(VueRouter);

const routes = [

  {
    path: '/',
    name: 'Home',
    component: Home,
  },

  {
    path: '/search',
    name: 'Search',
    component: Search,
  },
  {
    path: '/favorite',
    name: 'FavBooks',
    component: FavBooks,
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;