<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
    <div class="home-btn" @click="returnHome">
      <p class="m-icon m-iconzhuye"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    returnHome() {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>

<style>
@import './common/font/iconfont.css';
</style>

<style lang="stylus" scoped>
@import '~common/stylus/variables.styl';

.home-btn {
  height: 2rem;
  width: 2rem;
  border-radius: 50%;
  background-color: $dark-primary-color;
  color: $grey-color;
  position: fixed;
  bottom: 0.6rem;
  right: 0.6rem;
  z-index: 99;

  .m-icon {
    margin: 0;
    font-size: $font-size-big;
    position: absolute;
    top: 47%;
    left: 49%;
    transform: translate(-50%, -50%);
  }
}
</style>