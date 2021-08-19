import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/h',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import(/* webpackChunkName: "accueil" */ '../views/LoginOrSignUp.vue')
  },
  {
    path: '/accueil',
    name: 'accueil',
    component: () => import(/* webpackChunkName: "accueil" */ '../views/Accueil.vue')
  },
  {
    path: '/post',
    name: 'post',
    component: () => import(/* webpackChunkName: "accueil" */ '../views/Post.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
