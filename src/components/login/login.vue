<template>
  <div class="login-container">
    <m-header :title="title" />
    <div class="login-body">
      <div class="input-box">
        <p class="title">Welcome</p>
        <van-field v-model="userName" placeholder="请输入用户名" class="input" />
        <van-field v-model="password" placeholder="请输入密码" type="password" class="input" />
        <div class="notice">
          <span class="notice-account">没有账号？</span>
          <span class="notice-register" @click="jumpToRegister">立即注册</span>
          <span class="notice-reset" @click="jumpToResetPwd">忘记密码？</span>
        </div>
        <van-button
          type="primary"
          size="mini"
          class="login-btn"
          @click="_userLogin"
          :disabled="userName===''||password===''"
        >登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import MHeader from 'base/m-header/m-header'
import { userLogin } from 'api/login'
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { setToastTime, jumpTo } from 'api/kit'
import { SERVER_ERR_NOTICE } from 'common/js/config'
import { getUserFromCookie } from 'api/store'
import { ERR_OK } from 'common/js/config'

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.currentUser) {
        jumpTo(vm.$router, '/userCenter')
        return
      }
      setToastTime(vm.$toast, 1500)
      vm.$toast.loading({
        mask: true,
        message: '正在检验登录状态...'
      })

      getUserFromCookie(currentUser => {
        if (currentUser) {
          vm.setCurrentUser(currentUser)
          jumpTo(vm.$router, '/userCenter')
          return
        }
      })
    })
  },
  data() {
    return {
      title: '登录',
      userName: '',
      password: ''
    }
  },
  components: {
    MHeader
  },
  methods: {
    jumpToRegister() {
      jumpTo(this.$router, '/user/register')
    },
    jumpToResetPwd() {
      jumpTo(this.$router, '/user/preReset')
    },
    _userLogin() {
      if (this.userName.length < 3 || this.userName.length > 12) {
        this.$toast.fail('用户不存在')
        return
      } else if (this.password.length < 6 || this.password.length > 12) {
        this.$toast.fail('用户名或密码错误')
        return
      }
      setToastTime(this.$toast, 0)
      this.$toast.loading({
        mask: true,
        message: '正在登录...'
      })
      userLogin(this.userName, this.password).then(res => {
        if (res.data.code === ERR_OK) {
          setToastTime(this.$toast, 1500)
          if (!res.data.isMatch) {
            this.$toast.fail('用户名或密码不正确')
            return
          }
          this.password = ''
          this.$toast.success('登录成功，正在跳转')
          this.onLine(res.data.currentUser)
          jumpTo(this.$router, '/userCenter')
        } else {
          setToastTime(this.$toast, 2000)
          this.$toast.fail(SERVER_ERR_NOTICE)
        }
      })
    },
    ...mapActions(['onLine']),
    ...mapMutations({
      setCurrentUser: 'SET_CURRENT_USER'
    })
  },
  computed: {
    ...mapGetters(['isLogin', 'currentUser'])
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/reset.styl';
@import '~common/stylus/variables.styl';

.login-container {
  height: 90vh;
  position: relative;
  touch-action: none;

  .login-body {
    position: relative;
    height: 40vh;
    top: 30vh;

    .input-box {
      width: 60vw;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);

      .title {
        text-align: center;
        font-size: $font-size-title;
        color: $light-primary-color;
        border-bottom: 1px solid $light-primary-color;
      }

      .input {
        border: 1px solid $grey-color;
        border-radius: 3px;
        margin-top: 0.6rem;
        font-size: $font-size-mini;
      }

      .notice {
        font-size: $font-size-mini;
        text-align: center;
        margin: 0.2rem 0;

        .notice-account {
          color: $grey-color;
        }

        .notice-register, .notice-reset {
          color: $light-primary-color;
        }
      }

      .login-btn {
        background-color: $light-primary-color;
        border: none;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
</style>