import Vue from 'vue'
import Router from 'vue-router'

import LoginVue from '../components/login.vue'
import MainVue from '../components/main.vue'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'login',
      component: LoginVue
    },
    {
      path: '/main',
      name: 'main',
      component: MainVue
    }
  ],
  mode: 'history'
})
