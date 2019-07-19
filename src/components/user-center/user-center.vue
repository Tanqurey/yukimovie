<template>
  <div class="center-container">
    <m-header :title="title" />
    <div class="center-body">
      <div class="center-header">
        <van-row class="header-name">
          <van-col span="18" class="name">{{currentUser.userName}}</van-col>
          <van-col span="6" class="level">
            <van-button disabled type="primary" size="mini">{{'Lv '+currentUser.level}}</van-button>
          </van-col>
        </van-row>
        <van-row class="exp-bar">
          <van-col span="4">经验值</van-col>
          <van-col span="10" class="bar">
            <van-progress :color="lightPrimaryColor" :percentage="expProcess" :show-pivot="false" />
          </van-col>
          <van-col span="10" class="exp-val">
            <span class="now-exp">{{currentUser.exp}}</span>
            <span class="next-exp">{{' / '+nextLevelExp}}</span>
          </van-col>
        </van-row>
        <van-row class="whatsup">
          <van-col span="23" class="whatsup">{{currentUser.whatsUp}}</van-col>
        </van-row>
      </div>
      <div class="center-count">
        <van-grid :column-num="2" square :border="false" class="count-body">
          <van-grid-item>
            <p class="count">{{currentUser.fansCount}}</p>
            <p class="count-title">我的粉丝</p>
          </van-grid-item>
          <van-grid-item>
            <p class="count">{{currentUser.subscribeCount}}</p>
            <p class="count-title">我的关注</p>
          </van-grid-item>
        </van-grid>
      </div>
      <div class="center-function">
        <ul class="function-body">
          <li class="function-item">1</li>
          <li class="function-item">1</li>
          <li class="function-item">1</li>
          <li class="function-item">1</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { jumpTo } from 'api/kit'
import { mapGetters } from 'vuex'
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
      lightPrimaryColor: LIGHT_PRIMARY_COLOR
    }
  },
  computed: {
    nextLevelExp() {
      return levelExp['LEVEL_' + (this.currentUser.level + 1) + '_EXP']
    },
    expProcess() {
      return (this.currentUser.exp / this.nextLevelExp) * 100
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
    }
  }
}
</style>