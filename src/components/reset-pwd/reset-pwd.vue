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
        v-model="userName"
        required
        clearable
        label="用户名"
        icon="clear"
        placeholder="请输入您注册的用户名"
        @click-icon="userName=''"
        class="input-field"
        :label-width="labelWidth"
      >
        <van-button
          slot="button"
          size="mini"
          type="primary"
          class="check-btn"
          @click="_getSecureQuestion(userName)"
        >获取密保</van-button>
      </van-field>

      <van-field
        v-model="secureQuestion"
        label="安全问题"
        disabled
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
import { getSecureQuestion } from 'api/login'

export default {
  data() {
    return {
      userName: '',
      title: '密码重置',
      leftText: '返回登录',
      rightText: '重置',
      navTitle: '填写信息',
      secureQuestion: '',
      labelWidth:60
    }
  },
  methods: {
    returnLogin() {
      this.$router.push({
        path: '/user/login'
      })
    },
    _getSecureQuestion(userName) {
      if (userName.length < 3 || userName.length > 12) {
        this.$toast.fail('请输入有效的用户名')
        this.secureQuestion = ''
        return
      }
      getSecureQuestion(userName).then(res => {
        if (res.data.code === 200) {
          if (!res.data.isExisted) {
            this.$toast.fail('用户不存在')
            this.secureQuestion = ''
            return
          }
          this.secureQuestion = res.data.secureQuestion
        }
      })
    },
    _resetPassword() {
      console.log('reset')
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

.reset-header {
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

.reset-body {
  position: relative;
  height: 27rem;

  .input-field {
    font-size: $font-size-mini;
  }

  .check-btn {
    background-color: $light-primary-color;
    border: none;
  }
}
</style>