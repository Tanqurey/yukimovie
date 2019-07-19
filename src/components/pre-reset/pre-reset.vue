<template>
  <div>
    <div class="reset-header">
      <m-header :title="title" />
      <m-nav-bar
        :title="navTitle"
        :leftText="leftText"
        :rightText="rightText"
        @clickLeft="returnLogin"
        @clickRight="_checkAnswer"
      />
    </div>
    <div class="reset-body">
      <van-field
        v-model="userName"
        required
        clearable
        label="用户名"
        icon="clear"
        placeholder="请输入您注册的用户名"
        @click-icon="userName=''"
        class="input-field"
        :label-width="labelWidth"
        @input="needGetQuestion"
      >
        <van-button
          slot="button"
          :text="btnText"
          size="mini"
          type="primary"
          class="check-btn"
          :disabled="isLoadingQuestion"
          @click="_getSecureQuestion(userName)"
        />
      </van-field>

      <van-field
        v-model="secureQuestion"
        label="安全问题"
        disabled
        class="input-field"
        v-show="secureQuestion"
        :label-width="labelWidth"
      />

      <van-field
        v-model="secureAnswer"
        required
        label="问题答案"
        placeholder="请输入您注册时填入的答案"
        class="input-field"
        v-show="secureQuestion"
        :label-width="labelWidth"
      />
    </div>
  </div>
</template>

<script>
import MHeader from 'base/m-header/m-header'
import MNavBar from 'base/m-nav-bar/m-nav-bar'
import { mapMutations } from 'vuex'
import { setToastTime, jumpTo } from 'api/kit'
import { getSecureQuestion, checkAnswer } from 'api/login'

export default {
  data() {
    return {
      userName: '',
      title: '密码重置',
      leftText: '返回登录',
      rightText: '确认',
      navTitle: '填写信息',
      secureQuestion: '',
      labelWidth: 60,
      isLoadingQuestion: false,
      btnText: '获取密保',
      secureAnswer: ''
    }
  },
  methods: {
    returnLogin() {
      jumpTo(this.$router, '/user/login')
    },
    needGetQuestion() {
      this.secureQuestion = ''
      this.secureAnswer = ''
    },
    _getSecureQuestion(userName) {
      if (userName.length < 3 || userName.length > 12) {
        this.$toast.fail('请输入有效的用户名')
        this.userName = ''
        this.secureQuestion = ''
        return
      }
      this.isLoadingQuestion = true
      this.secureAnswer = ''
      getSecureQuestion(userName).then(res => {
        if (res.data.code === 200) {
          if (!res.data.isExisted) {
            this.$toast.fail('用户不存在')
            this.userName = ''
            this.secureQuestion = ''
            this.isLoadingQuestion = false
            return
          }
          this.secureQuestion = res.data.secureQuestion
          this.isLoadingQuestion = false
        }
      })
    },
    _checkAnswer() {
      if (!this.secureQuestion) {
        this.$toast.fail('您还未获取密保问题')
        return
      } else if (
        this.secureAnswer.length < 2 ||
        this.secureAnswer.length > 24
      ) {
        this.$toast.fail('回答错误')
        this.secureAnswer = ''
        return
      }
      setToastTime(this.$toast, 0)
      this.$toast.loading({
        mask: true,
        message: '正在校验...'
      })
      checkAnswer(this.userName, this.secureAnswer).then(res => {
        if (res.data.code === 200) {
          setToastTime(this.$toast, 1500)
          if (!res.data.isMatch) {
            this.$toast.fail('回答错误')
            return
          }
          this.$toast.success('回答正确,正在跳转')
          this.setResetAccount(this.userName)
          jumpTo(this.$router, '/user/resetPwd')
        } else {
          this.$toast.fail('服务器异常')
        }
      })
    },
    ...mapMutations({
      setResetAccount: 'SET_RESET_ACCOUNT'
    })
  },
  watch: {
    isLoadingQuestion(newVal) {
      if (newVal) {
        this.btnText = '正在获取'
      } else {
        this.btnText = '获取密保'
      }
    }
  },
  components: {
    MHeader,
    MNavBar
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

  .check-btn {
    background-color: $light-primary-color;
    border: none;
  }
}
</style>