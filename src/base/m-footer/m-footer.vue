<template>
  <div class="footer-container">
    <p class="text">Designed by Tanqurey</p>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/reset.styl';
@import '~common/stylus/variables.styl';

.footer-container {
  width: 100%;
  height: 2rem;
  color: $grey-color;
  background-color: $dark-primary-color;
  position: relative;

  .text {
    font-size: $font-size-mini;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}
</style>