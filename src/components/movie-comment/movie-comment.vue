<template>
  <div>
    <div class="comment-header">
      <m-header :title="title" />
    </div>
    <div class="comment-nav">
      <van-tabs v-model="activeIndex" :color="activeColor">
        <van-tab title="最新" :disabled="isLoading"></van-tab>
        <van-tab title="最热" :disabled="isLoading"></van-tab>
      </van-tabs>
    </div>
    <div class="comment-container">
      <van-list
        v-model="isLoading"
        :finished="finished"
        :finished-text="finishedText"
        @load="activeIndex===0?loadMoreNew:loadMoreHot"
        :immediate-check="false"
        class="comment-body"
        v-if="dataList.length"
      >
        <div class="comment-item" v-for="(item,idx) in dataList" :key="idx">
          <div class="comment-title">
            <p>{{item.commentTitle}}</p>
          </div>
          <div class="comment-summary">
            <p>{{item.commentContent|sliceSummary}}</p>
          </div>
          <van-row class="comment-info">
            <van-col :span="14">
              <span class="m-icon m-iconyonghu1"></span>
              <span>{{item.userName}}</span>
            </van-col>
            <van-col :span="5">
              <span class="m-icon m-iconlike"></span>
              <span>{{item.usefulList.length}}</span>
            </van-col>
            <van-col :span="5">
              <span class="m-icon m-iconzan2"></span>
              <span>{{item.uselessList.length}}</span>
            </van-col>
          </van-row>
        </div>
      </van-list>
      <div class="no-data-box" v-else>暂无评论</div>
    </div>
    <div class="function-container">
      <div @click="newComment" class="function">
        <p class="m-icon m-iconbi"></p>
        <p class="function-text">添加</p>
      </div>
    </div>
  </div>
</template>

<script>
import MHeader from 'base/m-header/m-header'
import { jumpTo } from 'api/kit'
import { mapGetters } from 'vuex'
import {
  ERR_OK,
  DEFAULT_SWIPER_OPTIONS,
  SERVER_ERR_NOTICE,
  LIGHT_PRIMARY_COLOR
} from 'common/js/config'
import { loadMovieComment } from 'api/comment'

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.currentMovie.id) {
        jumpTo(vm.$router, '/')
        return
      }
      if (!vm.dataList.length) {
        vm.loadMoreNew()
      }
    })
  },
  data() {
    return {
      isLoading: false,
      defaultOptions: DEFAULT_SWIPER_OPTIONS,
      title: '相关影评',
      finished: false,
      finishedText: '没有更多了',
      activeIndex: 0,
      activeColor: LIGHT_PRIMARY_COLOR,
      page: 1,
      dataList: []
    }
  },
  methods: {
    newComment() {
      if (!this.isLogin) {
        jumpTo(this.$router, '/user/login')
        return
      }
      jumpTo(this.$router, '/newComment')
    },
    loadMoreNew() {
      let movieInfo = {}
      movieInfo.id = this.currentMovie.id
      movieInfo.title = this.currentMovie.title
      loadMovieComment(movieInfo, this.page).then(res => {
        if (res.data.code === ERR_OK) {
          if (res.data.commentData.length) {
            this.dataList = this.dataList.concat(res.data.commentData)
          }
          if (res.data.isEnd) {
            this.finished = true
          }
          this.loading = false
          this.page++
        } else {
          this.$toast.fail(SERVER_ERR_NOTICE)
        }
      })
      this.isLoading = false
    },
    loadMoreHot() {}
  },
  watch: {
    activeIndex(newVal) {
      this.dataList = []
      this.page = 1
      if (newVal === 0) {
        this.loadMoreNew()
      }
      if (newVal === 1) {
        this.loadMoreHot()
      }
    }
  },
  computed: {
    ...mapGetters(['currentMovie', 'isLogin'])
  },
  components: {
    MHeader
  },
  filters: {
    sliceSummary(txt) {
      if (txt.length > 70) {
        return txt.slice(0, 70) + '...'
      } else {
        return txt
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.page = 1
    this.dataList = []
    this.activeIndex = 0
    next()
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/reset.styl';
@import '~common/stylus/variables.styl';

.comment-header {
  position: fixed;
  top: 0;
  z-index: 999;
}

.comment-nav {
  position: fixed;
  height: $vant-nav-bar-height;
  width: 100%;
  z-index: 999;
}

.comment-container {
  margin-top: $m-header-height;
  position: relative;
  top: $vant-nav-bar-height;

  .comment-item {
    height: 25vh;
    font-size: $font-size-mini;

    .comment-title {
      height: 20%;
      background-color: $light-primary-color;

      p {
        width: 90%;
        margin: 0 5vw;
        height: 100%;
        line-height: 5vh;
        color: $grey-color;
      }
    }

    .comment-summary {
      height: 55%;
      border-bottom: 1px solid $grey-color;

      p {
        width: 90%;
        margin: 0 5vw;
        padding: 2vh 0;
      }
    }

    .comment-info {
      height: 25%;
      border-bottom: 1px solid $grey-color;

      .van-col {
        height: 100%;
        line-height: 6.25vh;
        padding: 0 2vw;
        color: $secondary-text;

        .m-icon {
          color: $light-primary-color;
        }
      }
    }
  }

  .no-data-box {
    color: $secondary-text;
    font-size: $font-size-mini;
    padding: 8vh 0;
    text-align: center;
  }
}

.function-container {
  position: fixed;
  bottom: 2vh;
  right: 3vw;
  z-index: 99;

  .function {
    margin-top: 1vh;
    height: 8vh;
    width: 8vh;
    background-color: $dark-primary-color;
    border-radius: 50%;
    color: $white-text;
    text-align: center;

    .function-text {
      font-size: $font-size-mini;
      position: relative;
      top: 18%;
    }

    .m-icon {
      position: relative;
      top: 15%;
    }
  }
}
</style>