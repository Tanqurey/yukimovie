<template>
  <div class="title-container">
    <p class="title">{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/reset.styl';
@import '~common/stylus/variables.styl';

.title-container {
  position: fixed;
  top: 0;
  height: 3.3rem;
  width: 100%;
  background-color: $dark-primary-color;

  .title {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    left: 0.6rem;
    color: $grey-color;
    font-size: $font-size-mid;
  }
}
</style>