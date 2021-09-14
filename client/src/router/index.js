import Vue from 'vue'
import Router from 'vue-router'

import LoginVue from '../components/login.vue'
import MainVue from '../components/main.vue'

Vue.use(Router)

const router = new Router({
  routes: [{
      path: '/',
      redirect: 'login',
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginVue
    },
    {
      path: '/main',
      name: 'main',
      component: MainVue,
      meta: {
        requireAuth: true
      },
    }
  ],
  mode: 'history'
})

export default router

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (localStorage.getItem("token")) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  } else {
    if (localStorage.getItem("token")) {
      next('/main')
    } else {
      next()
    }
  }
})
