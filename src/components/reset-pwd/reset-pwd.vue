<template>
  <div>
    <div class="reset-header">
      <m-header :title="title" />
      <m-nav-bar
        :title="navTitle"
        :leftText="leftText"
        :rightText="rightText"
        @clickLeft="returnLogin"
        @clickRight="_resetPassword"
      />
    </div>
    <div class="reset-body">
      <van-field
        v-model="newPassword"
        required
        clearable
        label="新密码"
        icon="clear"
        placeholder="请输入新密码,长度6-12位"
        type="password"
        @click-icon="newPassword=''"
        class="input-field"
        :label-width="labelWidth"
      />
      <van-field
        v-model="repeatPassword"
        required
        clearable
        label="确认密码"
        icon="clear"
        placeholder="请再次输入密码"
        type="password"
        @click-icon="repeatPassword=''"
        class="input-field"
        @input="repeatingPassword"
        :error-message="errorMsg"
        :label-width="labelWidth"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { setToastTime } from 'api/kit'
import { resetPassword } from 'api/login'
import { SERVER_ERR_NOTICE } from 'common/js/config'
import MHeader from 'base/m-header/m-header'
import MNavBar from 'base/m-nav-bar/m-nav-bar'
import { jumpTo } from 'api/kit'

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.resetAccount) {
        jumpTo(vm.$router, '/user/preReset')
      }
    })
  },
  data() {
    return {
      title: '密码重置',
      navTitle: '密码填写',
      rightText: '重置',
      leftText: '返回登录',
      newPassword: '',
      repeatPassword: '',
      errorMsg: '',
      labelWidth: 60
    }
  },
  methods: {
    returnLogin() {
      jumpTo(this.$router, '/user/login')
    },
    repeatingPassword() {
      if (this.newPassword !== this.repeatPassword) {
        this.errorMsg = '两次输入的密码不一致，请重新输入'
      } else {
        this.errorMsg = ''
      }
    },
    _resetPassword() {
      if (this.newPassword.length < 6 || this.newPassword.length > 12) {
        this.$toast.fail('密码长度不符合要求')
        return
      } else if (this.newPassword !== this.repeatPassword) {
        this.$toast.fail('两次输入的密码不一致')
        return
      }
      setToastTime(this.$toast, 0)
      this.$toast.loading({
        mask: true,
        message: '正在重置...'
      })
      resetPassword(this.resetAccount, this.newPassword).then(res => {
        setToastTime(this.$toast, 2000)
        if (res.data.code === 200) {
          this.$toast.success('重置成功，返回登录')
          this.returnLogin()
        } else {
          this.$toast.fail(SERVER_ERR_NOTICE)
        }
      })
    },
    ...mapMutations({
      setResetAccount: 'SET_RESET_ACCOUNT'
    })
  },
  computed: {
    ...mapGetters(['resetAccount'])
  },
  components: {
    MHeader,
    MNavBar
  },
  beforeRouteLeave(to, from, next) {
    this.setResetAccount('')
    next()
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variables.styl';

.van-nav-bar__text {
  color: $light-primary-color;
  font-size: $font-size-small;
}

.van-nav-bar .van-icon {
  color: $light-primary-color;
  font-size: $font-size-small;
}

.van-nav-bar__title {
  color: $firstly-text;
  font-size: $font-size-mid;
}

.reset-body {
  position: relative;
  top: $vant-nav-bar-height;
  margin-top: 10vh;

  .input-field {
    font-size: $font-size-mini;
  }
}
</style>