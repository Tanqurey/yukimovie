import Vue from 'vue'
import Router from 'vue-router'
import HomePage from 'components/home-page/home-page'
import Rank from 'components/rank/rank'
import Login from 'components/login/login'
import Register from 'components/register/register'
import PreReset from 'components/pre-reset/pre-reset'
import ResetPwd from 'components/reset-pwd/reset-pwd'
import UserCenter from 'components/user-center/user-center'
import MovieDetail from 'components/movie-detail/movie-detail'
import StarDetail from 'components/star-detail/star-detail'
import SearchResult from 'components/search-result/search-result'
import MovieComment from 'components/movie-comment/movie-comment'
import NewComment from 'components/new-comment/new-comment'
import UserCollection from 'components/user-collection/user-collection'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      component: HomePage
    }, {
      path: '/rank',
      component: Rank
    },
    {
      path: '/user/login',
      component: Login
    },
    {
      path: '/user/register',
      component: Register
    },
    {
      path: '/user/preReset',
      component: PreReset
    },
    {
      path: '/user/resetPwd',
      component: ResetPwd
    },
    {
      path: '/userCenter',
      component: UserCenter
    },
    {
      path: '/movieDetail',
      component: MovieDetail
    },
    {
      path: '/starDetail',
      component: StarDetail
    },
    {
      path: '/searchResult',
      component: SearchResult
    },
    {
      path: '/movieComment',
      component: MovieComment
    },
    {
      path: '/newComment',
      component: NewComment
    },
    {
      path: '/user/collection',
      component: UserCollection
    }

  ],

})
