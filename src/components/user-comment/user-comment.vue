<template>
  <div>
    <div class="comment-header">
      <m-header :title="title" />
    </div>
    <div class="comment-container">
      <van-list
        v-model="isLoading"
        :finished="finished"
        :finished-text="finishedText"
        @load="loadMore"
        :immediate-check="false"
        class="comment-body"
        v-if="dataList.length"
      >
        <div class="comment-item" v-for="(item,idx) in dataList" :key="idx">
          <div class="comment-title" @click="jumpToDetail(item)">
            <p>{{item.commentTitle}}</p>
          </div>
          <div class="comment-summary" @click="jumpToDetail(item)">
            <p>{{item.commentContent|sliceSummary}}</p>
          </div>
          <van-row class="comment-info">
            <van-col :span="8">
              <span class="m-icon m-iconlike"></span>
              <span>{{item.usefulList.length}}</span>
            </van-col>
            <van-col :span="8">
              <span class="m-icon m-iconzan2"></span>
              <span>{{item.uselessList.length}}</span>
            </van-col>
            <van-col :span="8">
              <span class="m-icon m-iconriqi"></span>
              <span>{{item.createTime|getCreateDate}}</span>
            </van-col>
          </van-row>
        </div>
      </van-list>
      <div class="no-data-box" v-else>暂无评论</div>
    </div>
  </div>
</template>

<script>
import MHeader from 'base/m-header/m-header'
import { jumpTo, sliceSummary, getCreateDate } from 'api/kit'
import { mapGetters, mapMutations } from 'vuex'
import { loadUserComment } from 'api/comment'
import { ERR_OK, SERVER_ERR_NOTICE } from 'common/js/config'

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.currentGuest) {
        jumpTo(vm.$router, '/')
        return
      }
      if (!vm.dataList.length) {
        vm.loadMore()
      }
    })
  },
  data() {
    return {
      title: '所有影评',
      isLoading: false,
      dataList: [],
      finished: false,
      finishedText: '全部加载完成',
      page: 1
    }
  },
  methods: {
    jumpToDetail(comment) {
      comment.userName = this.currentGuest
      this.setCurrentComment(comment)
      jumpTo(this.$router, '/commentDetail')
    },
    loadMore() {
      this.isLoading = true
      loadUserComment(this.currentGuest, this.page).then(res => {
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
        this.isLoading = false
      })
    },
    ...mapMutations({
      setCurrentComment: 'SET_CURRENT_COMMENT'
    })
  },
  components: {
    MHeader
  },
  watch: {
    isLogin(newLogin) {
      if (!newLogin) {
        this.dataList = []
        this.isLoading = false
        this.finished = false
        this.page = 1
      }
    },
    currentGuest(newGuest) {
      this.dataList = []
      this.isLoading = false
      this.finished = false
      this.page = 1
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'currentGuest'])
  },
  filters: {
    sliceSummary: sliceSummary,
    getCreateDate: getCreateDate
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/reset.styl';
@import '~common/stylus/variables.styl';

.comment-container {
  margin-top: $m-header-height;

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
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
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
        text-align: center;

        .m-icon {
          color: $secondary-text;
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
</style>