<template>
  <div class="center-container">
    <m-header :title="title" />
    <div class="center-body">
      <div class="center-header">
        <van-row class="header-name">
          <van-col span="18" class="name">{{user.userName}}</van-col>
          <van-col span="6" class="level">
            <van-button disabled type="primary" size="mini">{{'Lv '+user.level}}</van-button>
          </van-col>
        </van-row>
        <van-row class="exp-bar">
          <van-col span="4">经验值</van-col>
          <van-col span="10" class="bar">
            <van-progress :color="lightPrimaryColor" :percentage="expProcess" :show-pivot="false" />
          </van-col>
          <van-col span="10" class="exp-val">
            <span class="now-exp">{{user.exp}}</span>
            <span class="next-exp">{{' / '+nextLevelExp}}</span>
          </van-col>
        </van-row>
        <van-row class="whatsup">
          <van-col span="23" class="whatsup">{{user.whatsUp}}</van-col>
        </van-row>
      </div>
      <div class="center-count">
        <van-grid :column-num="2" square :border="false" class="count-body">
          <van-grid-item>
            <p class="count">{{user.fansCount>maxDisplayNum?'99+':user.fansCount}}</p>
            <p class="count-title">我的粉丝</p>
          </van-grid-item>
          <van-grid-item>
            <p class="count">{{user.subscribeCount>maxDisplayNum?'99+':user.subscribeCount}}</p>
            <p class="count-title">我的关注</p>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="center-function">
        <ul class="function-body">
          <li class="function-item" @click="jumpToCollection">
            <span class="m-icon m-iconshoucang"></span>
            <span class="function-title">我的收藏</span>
          </li>
          <li class="function-item">
            <span class="m-icon m-iconxiaoxi"></span>
            <span class="function-title">我的影评</span>
          </li>
          <li class="function-item">
            <span class="m-icon m-icontupian"></span>
            <span class="function-title">我的动态</span>
          </li>
          <li class="function-item">
            <span class="m-icon m-iconshezhi"></span>
            <span class="function-title">设置</span>
          </li>
          <li class="function-item" @click="_offLine">
            <span class="m-icon m-iconshangyitiao"></span>
            <span class="function-title">退出账号</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { jumpTo, setToastTime } from 'api/kit'
import { mapGetters, mapActions } from 'vuex'
import MHeader from 'base/m-header/m-header'
import { levelExp } from 'common/js/user'
import { LIGHT_PRIMARY_COLOR } from 'common/js/style'

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.currentUser) {
        jumpTo(vm.$router, '/user/login')
      }
    })
  },
  data() {
    return {
      title: '个人中心',
      lightPrimaryColor: LIGHT_PRIMARY_COLOR,
      maxDisplayNum: 99
    }
  },
  methods: {
    _offLine() {
      this.offLine()
      this.$toast.success('已退出当前用户')
      jumpTo(this.$router, '/user/login')
    },
    jumpToCollection(){
      jumpTo(this.$router,'/user/collection')
    },
    ...mapActions(['offLine'])
  },
  computed: {
    nextLevelExp() {
      return levelExp['LEVEL_' + (this.user.level + 1) + '_EXP']
    },
    expProcess() {
      return (this.user.exp / this.nextLevelExp) * 100 || 0
    },
    user() {
      return this.currentUser === null ? {} : this.currentUser
    },
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

.center-body {
  margin-top: $m-header-height;

  .center-header {
    height: 24vh;

    .header-name {
      height: 7vh;

      .van-col {
        position: relative;
        padding-left: 3vw;
        top: 100%;
        transform: translateY(-100%);
      }

      .name {
        font-size: $font-size-big;
        color: $firstly-text;
      }

      .level {
        .van-button {
          height: 4vh;
          border: none;
          background-color: $light-primary-color;
        }
      }
    }

    .exp-bar {
      height: 5vh;

      .van-col {
        position: relative;
        padding-left: 3vw;
        top: 100%;
        color: $secondary-text;
        transform: translateY(-100%);
        font-size: $font-size-mini;

        .now-exp {
          color: $light-primary-color;
          font-size: $font-size-mid;
        }
      }
    }

    .whatsup {
      padding-left: 3vw;
      margin-top: 1vh;

      .van-col {
        background-color: $dark-primary-color;
        border-radius: 4px;
        font-size: $font-size-mini;
        padding: 2vh;
        color: $white-text;
      }
    }
  }

  .center-count {
    .count-body {
      position: relative;
      left: 10vw;
      width: 80vw;
    }

    .count {
      font-size: $font-size-title;
      color: $light-primary-color;
    }

    .count-title {
      font-size: $font-size-mini;
      margin-top: 1vh;
    }
  }

  .center-function {
    .function-body {
      position: relative;
      left: 10vw;
      width: 80vw;
      border-top: 2px solid $dark-primary-color;
      border-bottom: 2px solid $dark-primary-color;

      .function-item {
        height: 6.5vh;
        line-height: 6.5vh;

        .m-icon {
          color: $light-primary-color;
          margin-left: 2vw;
        }

        .function-title {
          font-size: $font-size-small;
          margin-left: 2vw;
        }
      }

      .function-item:nth-child(odd) {
        background-color: $grey-color;
      }
    }
  }
}
</style>