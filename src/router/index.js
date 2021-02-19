import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import CountryInfo from '../pages/CountryInfo.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/country/:id',
    name: 'CountryInfo',
    component: CountryInfo,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
