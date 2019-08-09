<template>
  <div>
    <div class="config-header">
      <m-header :title="title" />
    </div>
    <div class="config-body">
      <div class="config-whatsup">
        <van-field
          v-model="whatsUp"
          label="个性签名"
          type="textarea"
          autosize
          label-align="center"
          :label-width="labelWidth"
          :disabled="!isWhatsUpModify"
          class="whatsUp"
        />
        <van-button type="primary" size="mini" class="whatsUp-btn" @click="modifyWhatsUp">修改</van-button>
        <van-button
          type="primary"
          size="mini"
          class="whatsUp-btn"
          v-show="isWhatsUpModify"
          @click="commitWhatsUp"
          :disabled="isModifying"
        >提交</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import MHeader from 'base/m-header/m-header'
import { mapGetters } from 'vuex'
import { jumpTo } from 'api/kit'

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.isLogin) {
        jumpTo(vm.$router, '/')
        return
      }
      vm.whatsUp = vm.currentUser.whatsUp
    })
  },
  data() {
    return {
      title: '个性化',
      labelWidth: 60,
      whatsUp: '',
      labelWidth: 60,
      isWhatsUpModify: false,
      maxLength: 100,
      isModifying: false
    }
  },
  methods: {
    modifyWhatsUp() {
      this.isWhatsUpModify = true
      this.whatsUp = ''
    },
    commitWhatsUp() {
      this.isModifying = true
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'currentUser'])
  },
  components: {
    MHeader
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/reset.styl';
@import '~common/stylus/variables.styl';

.config-body {
  margin-top: 12vh;

  .config-whatsup {
    font-size: $font-size-mini;
    text-align: center;

    .whatsUp {
      height: 20vh;
    }

    .whatsUp-btn {
      margin: 2vh 0;
    }
  }
}
</style>