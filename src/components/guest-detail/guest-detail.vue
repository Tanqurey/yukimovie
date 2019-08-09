<template>
  <div>
    <div class="guest-header">
      <m-header :title="title" />
    </div>
    <div class="guest-body" v-if="guestData.userName">
      <van-row class="guest-basic">
        <van-col class="name" :span="16">{{guestData.userName}}</van-col>
        <van-col class="level" :span="3">Lv {{guestData.level}}</van-col>
        <van-col class="btn" :span="5">
          <van-button
            type="primary"
            size="mini"
            class="subscribe-btn"
            :class="{'subscribed':isSubscribed}"
            @click="subscribe"
          >{{subscribeText}}</van-button>
        </van-col>
      </van-row>
      <div class="guest-whatsup">{{guestData.whatsUp}}</div>
      <van-row class="guest-count">
        <van-col :span="12" @click.native="viewCountDetail(COUNT_CATE.fans)">
          <p class="count">{{guestData.fansList.length|countOmit}}</p>
          <p>粉丝</p>
        </van-col>
        <van-col :span="12" @click.native="viewCountDetail(COUNT_CATE.subscribe)">
          <p class="count">{{guestData.subscribeList.length|countOmit}}</p>
          <p>关注</p>
        </van-col>
      </van-row>
      <div class="guest-function">
        <ul class="function-body">
          <li class="function-item" @click="jumpToComment">
            <span class="m-icon m-iconxiaoxi"></span>
            <span class="function-title">TA的影评</span>
          </li>
          <li class="function-item">
            <span class="m-icon m-icontupian"></span>
            <span class="function-title">TA的动态</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import MHeader from 'base/m-header/m-header'
import { mapGetters, mapMutations } from 'vuex'
import { jumpTo } from 'api/kit'
import {
  ERR_OK,
  SERVER_ERR_NOTICE,
  COUNT_HANDLE,
  COUNT_CATE
} from 'common/js/config'
import { getGuestData } from 'api/guest'
import { changeCount } from 'api/count'

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.currentGuest) {
        jumpTo(vm.$router, '/')
        return
      }
      if (vm.isLogin && vm.currentUser.userName === vm.currentGuest) {
        jumpTo(vm.$router, '/userCenter')
      }
      if (!vm.guestData.userName) {
        vm._getGuestData(vm.currentGuest)
      }
      if (vm.isLogin) {
        let subscribeList = vm.currentUser.subscribeList
        vm.isSubscribed = subscribeList.some(userName => {
          return userName === vm.currentGuest
        })
      }
    })
  },
  data() {
    return {
      title: 'TA的空间',
      guestData: {},
      isSubscribed: false,
      COUNT_CATE: COUNT_CATE
    }
  },
  methods: {
    _getGuestData(guest) {
      getGuestData(guest).then(res => {
        if (res.data.code === ERR_OK) {
          this.guestData = res.data.guestData
        }
      })
    },
    jumpToComment() {
      jumpTo(this.$router, '/user/comment')
    },
    subscribe() {
      if (!this.isLogin) {
        jumpTo(this.$router, '/user/login')
        return
      }
      let handle
      if (this.isSubscribed) {
        handle = COUNT_HANDLE.remove
      } else {
        handle = COUNT_HANDLE.add
      }
      changeCount(this.currentUser.userName, this.currentGuest, handle).then(
        res => {
          if (res.data.code === ERR_OK) {
            this.setCurrentUser(res.data.currentUser)
            this.guestData = res.data.guestData
            this.isSubscribed = handle === COUNT_HANDLE.remove ? false : true
            return
          }
          this.$toast(SERVER_ERR_NOTICE)
        }
      )
    },
    viewCountDetail(cate) {
      this.setListOwner(this.currentGuest)
      this.setCountCate(cate)
      jumpTo(this.$router, '/countDetail')
    },
    ...mapMutations({
      setCurrentUser: 'SET_CURRENT_USER',
      setListOwner: 'SET_LIST_OWNER',
      setCountCate: 'SET_COUNT_CATE'
    })
  },
  components: {
    MHeader
  },
  watch: {
    currentGuest(newGuest) {
      this._getGuestData(newGuest)
    }
  },
  computed: {
    subscribeText() {
      if (this.isSubscribed) return '已关注'
      return '关注'
    },
    ...mapGetters(['currentGuest', 'currentUser', 'isLogin'])
  },
  filters: {
    countOmit(count) {
      return count > 99 ? '99+' : count
    }
  },
  beforeRouteLeave(to, from, next) {
    this.isSubscribed = false
    next()
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/reset.styl';
@import '~common/stylus/variables.styl';

.guest-body {
  margin-top: $m-header-height;

  .guest-basic {
    height: 10vh;
    font-size: $font-size-mid;
    background-color: $grey-color;

    .van-col {
      height: 100%;
      line-height: 10vh;

      .subscribe-btn {
        border: none;
        background-color: $dark-primary-color;
      }

      .subscribed {
        background-color: $secondary-text;
      }
    }

    .level {
      color: $light-primary-color;
    }

    .name {
      padding: 0 2vw;
    }
  }

  .guest-whatsup {
    font-size: $font-size-mini;
    color: $white-text;
    background-color: $light-primary-color;
    padding: 2vh 3vw;
    margin: 2vh 3vw;
    border-radius: 3px;
  }

  .guest-count {
    .van-col {
      font-size: $font-size-small;
      text-align: center;
      color: $secondary-text;
    }

    .count {
      font-size: $font-size-title;
      color: $light-primary-color;
    }
  }

  .guest-function {
    .function-body {
      position: relative;
      left: 10vw;
      width: 80vw;
      border-top: 2px solid $dark-primary-color;
      border-bottom: 2px solid $dark-primary-color;
      margin-top: 6vh;

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