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
    component: () => import(/* webpackChunkName: "auth" */ '../views/Auth.vue')
  },
  {
    path: '/accueil',
    name: 'accueil',
    component: () => import(/* webpackChunkName: "accueil" */ '../views/Accueil.vue')
  },
  {
    path: '/post',
    name: 'post',
    component: () => import(/* webpackChunkName: "post" */ '../views/Post.vue')
  },
  {
    path: '/textPost',
    name: 'textPost',
    component: () => import(/* webpackChunkName: "textPost" */ '../views/TextPost.vue')
  },
  {
    path: '/imagePost',
    name: 'imagePost',
    component: () => import(/* webpackChunkName: "imagePost" */ '../views/ImagePost.vue')
  },
  {
    path: '/update',
    name: 'update',
    component: () => import(/* webpackChunkName: "update" */ '../views/Update.vue') 
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
