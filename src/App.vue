<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
    <div class="menu-container" @click="toggleMenu">
      <p class="menu m-icon m-iconcaidan"></p>
    </div>
    <van-popup v-model="showMenu" position="bottom" :style="{ height: '20%' }">
      <ul class="menu-ul">
        <li class="menu-li" @click="returnHome">
          <p class="menu-icon m-icon m-iconshouye"></p>
          <p class="menu-text">返回首页</p>
        </li>
        <li class="menu-li" @click="jumpToCenter">
          <p class="menu-icon m-icon m-iconyonghu1"></p>
          <p class="menu-text">个人中心</p>
        </li>
      </ul>
    </van-popup>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { jumpTo, jumpToByFlag } from 'api/kit'
export default {
  name: 'App',
  data() {
    return {
      showMenu: false
    }
  },
  methods: {
    returnHome() {
      jumpTo(this.$router, '/')
      this.showMenu = false
    },
    toggleMenu() {
      this.showMenu = true
    },
    jumpToCenter() {
      jumpToByFlag(this.$router, '/userCenter', '/user/login', this.isLogin)
      this.showMenu = false
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  components: {}
}
</script>
<style lang="stylus" scoped>
@import '~common/stylus/reset.styl';
@import '~common/stylus/variables.styl';

.menu-container {
  height: 5vh;
  width: 5vh;
  border-radius: 50%;
  z-index: 999;
  background-color: $white-text;
  position: fixed;
  top: 2.5vh;
  right: 0.6rem;

  .menu {
    color: $dark-primary-color;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.menu-ul {
  height: 100%;

  .menu-li {
    float: left;
    height: 4rem;
    width: 4rem;
    background-color: $grey-color;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    margin-left: 1rem;

    .menu-icon {
      color: $dark-primary-color;
      font-size: $font-size-ultra;
      position: absolute;
      left: 50%;
      top: 40%;
      transform: translate(-50%, -50%);
    }

    .menu-text {
      width: 100%;
      text-align: center;
      color: $firstly-text;
      font-size: $font-size-mini;
      position: absolute;
      left: 50%;
      top: 74%;
      transform: translate(-50%, -50%);
    }
  }
}
</style>

<style>
@import './common/font/iconfont.css';
</style>