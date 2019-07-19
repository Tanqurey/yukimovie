// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueCookies from 'vue-cookies'
import store from './store'
import FastClick from 'fastclick'
import {
  Button,
  Row,
  Col,
  Field,
  Swipe,
  SwipeItem,
  Lazyload,
  Grid,
  GridItem,
  Divider,
  Sidebar,
  SidebarItem,
  Tab,
  Tabs,
  Loading,
  Popup,
  NavBar,
  Toast,
  Progress
} from 'vant'
Vue.use(Button).use(Row).use(Col).use(Field).use(Swipe).use(SwipeItem).use(Lazyload).use(Grid).use(GridItem).use(Divider)
  .use(Sidebar).use(SidebarItem).use(Tab).use(Tabs).use(Loading).use(Popup).use(NavBar).use(Toast).use(Progress)
Vue.use(VueCookies)

Vue.config.productionTip = false

// // 进行默认前缀配置
// Axios.defaults.baseURL = '/api'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App,
  },
  template: '<App/>'
})

FastClick.attach(document.body)
