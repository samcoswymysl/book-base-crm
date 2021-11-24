import Vue from 'vue';
import VueRouter from 'vue-router';
import Search from '../views/Search.vue';
import Home from '../views/Home.vue';
import FavBooks from '../views/FavBooks.vue';
import About from '../views/About.vue'; import
Admin from '../views/Admin.vue';

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

  {
    path: '/about',
    name: 'About',
    component: About,
  },

  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
  },

];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
