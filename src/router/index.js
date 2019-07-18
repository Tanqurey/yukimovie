import Vue from 'vue'
import Router from 'vue-router'
import HomePage from 'components/home-page/home-page'
import Rank from 'components/rank/rank'
import Login from 'components/login/login'
import Register from 'components/register/register'
import ResetPwd from 'components/reset-pwd/reset-pwd'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'homepage',
      component: HomePage
    }, {
      path: '/rank',
      name: 'rank',
      component: Rank
    },
    {
      path: '/user/login',
      name: 'login',
      component: Login
    },
    {
      path: '/user/register',
      name: 'register',
      component: Register
    },
    {
      path: '/user/reset',
      name: 'reset',
      component: ResetPwd
    }
  ],

})
