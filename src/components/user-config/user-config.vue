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
import { modifyWhatsUp } from 'api/config'
import { ERR_OK, SERVER_ERR_NOTICE } from 'common/js/config'

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
      maxLength: 100,
      isModifying: false,
      isWhatsUpModify: false
    }
  },
  methods: {
    modifyWhatsUp() {
      this.isWhatsUpModify = true
      this.whatsUp = '内容长度不得多于100字符'
    },
    commitWhatsUp() {
      if (this.whatsUp.length > this.maxLength || this.whatsUp.length === 0) {
        this.$toast.fail('长度不符合要求')
      }
      this.isModifying = true
      modifyWhatsUp(this.currentUser.userName, this.whatsUp).then(res => {
        if (res.data.code === ERR_OK) {
          this.$toast.success('修改成功')
          this.isWhatsUpModify = false
        } else {
          this.$toast.fail(SERVER_ERR_NOTICE)
        }
        this.isModifying = false
      })
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