import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Auth from '../views/Auth.vue'
import Profile from '../views/Profile.vue'
import userComponents from '../views/userComponents.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth: true,
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth
  }, 
  {
    path: '/u/profile',
    name: 'profile',
    component: Profile
  },
  {
    path: '/components',
    name: 'userComponents',
    component: userComponents
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// navigation guard
router.beforeEach((to, from, next) => {
  // route guard. if user is not connected prevent them from going anywhere
  if (to.meta.auth && !store.state.currentUser) {
    next({
      path: "/auth",
    });
  } else {
    next();
  }
});
export default router
