import Vue from 'vue'
import VueRouter from 'vue-router'
import GameRoom from "@/views/GameRoom";

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: GameRoom
  },
  {
    path: '/settings',
    name: 'settings',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/settings')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router



