import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: "Home | FindMyCountry"
    }
  },
  {
    path: '/country/:name',
    name: 'CountryInfo',
    component: () => import("../pages/CountryInfo.vue"),
    props: true,
    meta: {
      title: "Country | FindMyCountry"
    }
  },
  {
    path: '/:PageNotFound(.*)',
    name: 'PageNotFound',
    component: () => import("../pages/PageNotFound.vue"),
    meta: {
      title: "Page Not Found | FindMyCountry"
    }
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, _, next) => {
  document.title = to.meta.title;
  next();
})

export default router;
