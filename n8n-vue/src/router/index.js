import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Register.vue'

const routes = [
  {
    path: '/Register',
    name: 'Register',
    component: HomeView
  },
  {
    path: '/Showdata',
    name: 'Showdata',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Showdata.vue')
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
