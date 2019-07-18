<template>
  <div>
    <div class="register-header">
      <m-header :title="title" />
      <m-nav-bar
        :title="navTitle"
        :leftText="leftText"
        :rightText="rightText"
        @clickLeft="returnLogin"
        @clickRight="_userRegister"
      />
    </div>
    <div class="register-body">
      <van-field
        v-model="user.userName"
        required
        clearable
        label="用户名"
        icon="clear"
        placeholder="请输入用户名，长度3-12位,"
        @click-icon="user.userName=''"
        class="input-field"
        :error-message="nameExistedWarning"
        :label-width="labelWidth"
      >
        <van-button
          slot="button"
          size="mini"
          type="primary"
          class="check-btn"
          @click="_checkUserName(user.userName)"
          :label-width="labelWidth"
        >重名检测</van-button>
      </van-field>
      <van-field
        v-model="user.password"
        required
        clearable
        label="密码"
        icon="clear"
        placeholder="请输入密码,长度6-12位"
        type="password"
        @click-icon="user.password=''"
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
      <van-field
        v-model="user.secureQuestion"
        required
        clearable
        label="安全问题"
        icon="clear"
        placeholder="请输入安全问题，长度2-24位"
        @click-icon="user.secureQuestion=''"
        class="input-field"
        :label-width="labelWidth"
      />
      <van-field
        v-model="user.secureAnswer"
        required
        clearable
        label="问题答案"
        icon="clear"
        placeholder="请输入上面问题的答案，长度2-24位"
        @click-icon="user.secureAnswer=''"
        class="input-field"
        :label-width="labelWidth"
      />
    </div>
  </div>
</template>

<script>
import MHeader from 'base/m-header/m-header'
import MNavBar from 'base/m-nav-bar/m-nav-bar'
import { SERVER_ERR_NOTICE } from 'common/js/config'
import { userRegister, checkUserName, checkRegisterInfo } from 'api/register'

export default {
  data() {
    return {
      title: '用户注册',
      navTitle: '填写信息',
      user: {
        userName: '',
        password: '',
        secureQuestion: '',
        secureAnswer: ''
      },
      repeatPassword: '',
      errorMsg: '',
      leftText: '返回登录',
      rightText: '注册',
      nameExistedWarning: '',
      labelWidth: 60
    }
  },
  components: {
    MHeader,
    MNavBar
  },
  methods: {
    returnLogin() {
      this.$router.push({
        path: '/user/login'
      })
    },
    repeatingPassword() {
      if (this.user.password !== this.repeatPassword) {
        this.errorMsg = '两次输入的密码不一致，请重新输入'
      } else {
        this.errorMsg = ''
      }
    },
    _checkUserName(userName) {
      if (userName.length < 3 || userName.length > 12) return
      checkUserName(userName).then(res => {
        if (res.data.code === 200) {
          if (res.data.isExisted) {
            this.nameExistedWarning = '抱歉，已存在重名用户'
            return
          }
          this.nameExistedWarning = '您的用户名可用'
        } else {
          this.nameExistedWarning = SERVER_ERR_NOTICE
        }
      })
    },
    _userRegister() {
      let errNotice = checkRegisterInfo(this.user, this.repeatPassword)
      if (errNotice) {
        this.$toast.fail(errNotice)
        return
      }
      this.$toast.setDefaultOptions({
        duration: 0
      })
      this.$toast.loading({
        mask: true,
        message: '正在注册...'
      })
      userRegister(this.user)
        .then(res => {
          this.$toast.setDefaultOptions({
            duration: 1500
          })
          if (res.data.code === 200) {
            this.$toast.success('注册成功,返回登录')
            const timer = setTimeout(() => {
              this.$router.push({
                path: '/user/login'
              })
              clearTimeout(timer)
            }, 2000)
          } else {
            this.$toast.fail('存在重名用户或服务器异常')
          }
        })
        .catch(err => {
          this.$toast.setDefaultOptions({
            duration: 2000
          })
          this.$toast.fail(SERVER_ERR_NOTICE)
        })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variables.styl';

.register-header {
  height: 3.8 + (44 / 20rem);
}

.nav-bar {
  top: 3.3rem;
}

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

.register-body {
  position: relative;
  height: 27rem;

  .input-field {
    font-size: $font-size-mini;
  }
}

.check-btn {
  background-color: $light-primary-color;
  border: none;
}
</style>