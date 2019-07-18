<template>
  <div class="login-container">
    <m-header :title="title" />
    <p class="title">Welcome</p>
    <div class="input-box">
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
</template>

<script>
import MHeader from 'base/m-header/m-header'
import { userLogin } from 'api/login'
import { mapMutations } from 'vuex'
import { SERVER_ERR_NOTICE } from 'common/js/config'
export default {
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
      this.$router.push({
        path: '/user/register'
      })
    },
    jumpToResetPwd() {
      this.$router.push({
        path: '/user/reset'
      })
    },
    _userLogin() {
      if (this.userName.length < 3 || this.userName.length > 12) {
        this.$toast.fail('用户不存在')
        return
      } else if (this.password.length < 6 || this.password.length > 12) {
        this.$toast.fail('用户名或密码错误')
        return
      }
      this.$toast.setDefaultOptions({
        duration: 0
      })
      this.$toast.loading({
        mask: true,
        message: '正在登录...'
      })
      userLogin(this.userName, this.password).then(res => {
        if (res.data.code === 200) {
          this.$toast.setDefaultOptions({
            duration: 1500
          })
          if (!res.data.isMatch) {
            this.$toast.fail('用户名或密码不正确')
            return
          }
          this.$toast.success('登录成功，正在跳转')
          this.setLoginStatus(true)
        } else {
          this.$toast.setDefaultOptions({
            duration: 2000
          })
          this.$toast.fail(SERVER_ERR_NOTICE)
        }
      })
    },
    ...mapMutations({
      setLoginStatus: 'SET_LOGIN_STATUS'
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/reset.styl';
@import '~common/stylus/variables.styl';

.login-container {
  height: 30em;
  margin-top: 3.3rem;
  position: relative;

  .title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 24%;
    font-size: $font-size-title;
    color: $light-primary-color;
    border-bottom: 1px solid $light-primary-color;
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

  .input-box {
    width: 11rem;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 34%;

    .input {
      border: 1px solid $grey-color;
      border-radius: 3px;
      margin-top: 0.6rem;
      font-size: $font-size-mini;
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
</style>