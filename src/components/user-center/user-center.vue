<template>
  <div class="center-container">
    <div class="center-header">
      <m-header :title="title" />>
    </div>
  </div>
</template>

<script>
import { jumpTo } from 'api/kit'
import { mapGetters } from 'vuex'
import MHeader from 'base/m-header/m-header'

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.isLogin) {
        jumpTo(vm.$router, '/user/login')
      }
    })
  },
  data() {
    return {
      title: '个人中心'
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  components: {
    MHeader
  }
}
</script>

<style lang="stylus" scoped>
.center-container {
  height:33.6rem;
}
</style>