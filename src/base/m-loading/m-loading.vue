<template>
  <div class="loading-container">
    <van-loading :color="color" class="loading-box" />
    <p class="loading-text">加载中</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      color: '#AFB42B'
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/reset.styl';
@import '~common/stylus/variables.styl';

.loading-container {
  touch-action: none;
  position: fixed;
  width: 5rem;
  z-index: 100;
  height: 5rem;
  top: 16rem;
  background-color: $firstly-text-transparent;
  left: 50%;
  transform: translateX(-50%);
}

.loading-box {
  position: absolute;
  left: 50%;
  top: 44%;
  transform: translate(-50%, -50%);
}

.loading-text {
  font-size: $font-size-mini;
  position: absolute;
  color: $grey-color;
  left: 50%;
  top: 68%;
  transform: translateX(-50%);
}
</style>
