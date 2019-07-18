<template>
  <div>
    <van-nav-bar
      :title="title"
      :left-text="leftText"
      :right-text="rightText"
      left-arrow
      class="nav-bar"
      :fixed="true"
      @click-left="clickLeft"
      @click-right="clickRight"
    />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    leftText: {
      type: String
    },
    rightText: {
      type: String
    }
  },
  methods: {
    clickLeft() {
      this.$emit('clickLeft')
    },
    clickRight() {
      this.$emit('clickRight')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variables.styl';

.nav-bar {
  top: 3.3rem;
}

.van-nav-bar__text, .van-nav-bar .van-icon {
  color: $light-primary-color;
  font-size: $font-size-small;
}

.van-nav-bar__title {
  font-size: $font-size-small;
}
</style>