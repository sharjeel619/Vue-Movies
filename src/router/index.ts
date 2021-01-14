import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/favourites',
    name: 'Favourites',
    component: () => import('../views/Favourite.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
