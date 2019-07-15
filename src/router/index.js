import Vue from 'vue'
import Router from 'vue-router'
import HomePage from 'components/pages/home-page'
import Rank from 'components/rank/rank'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'HomePage',
    component: HomePage
  }, {
    path: '/rank',
    name: 'rank',
    component: Rank
  }]
})
