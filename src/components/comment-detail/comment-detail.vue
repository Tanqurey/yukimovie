<template>
  <div>
    <div class="detail-header">
      <m-header :title="title" />
    </div>
    <div class="detail-body" v-if="currentComment.commentTitle">
      <div class="comment-title">{{currentComment.commentTitle}}</div>
      <div class="comment-content">{{currentComment.commentContent}}</div>
      <div class="comment-rating">
        <van-rate v-model="commentRating" :readonly="true" :color="lightPrimaryColor" />
      </div>
      <div class="movie-info">
        <span class="title" @click="jumpToMovie">{{currentComment.movieInfo.title}}</span>
      </div>
      <van-row class="comment-creator">
        <van-col
          class="creator-name"
          :span="18"
          @click.native="jumpToGuest"
        >{{currentComment.userName}}</van-col>
        <van-col class="creator-date" :span="6">发表于&nbsp;{{currentComment.createTime|getCreateDate}}</van-col>
      </van-row>
      <van-row class="comment-judge">
        <van-col
          :class="{'judged':isJudged&&judgeFlag===usefulFlag}"
          :span="12"
          @click.native="judge(usefulFlag)"
        >
          <p class="m-icon m-iconlike"></p>
          <p class="count">{{usefulList.length}}</p>
        </van-col>
        <van-col
          :class="{'judged':isJudged&&judgeFlag===uselessFlag}"
          :span="12"
          @click.native="judge(uselessFlag)"
        >
          <p class="m-icon m-iconzan2"></p>
          <p class="count">{{uselessList.length}}</p>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import MHeader from 'base/m-header/m-header'
import { mapGetters, mapMutations } from 'vuex'
import { jumpTo } from 'api/kit'
import { judgeComment } from 'api/comment'
import { queryCount } from 'api/count'
import {
  USELESS_FLAG,
  USEFUL_FLAG,
  ERR_OK,
  SERVER_ERR_NOTICE,
  LIGHT_PRIMARY_COLOR
} from 'common/js/config'

export default {
  created() {
    if (!this.currentComment.commentTitle) return
    this._queryCount(this.currentComment)
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.currentComment.commentTitle) {
        jumpTo(vm.$router, '/')
        return
      }
      vm.commentRating = vm.currentComment.rating
    })
  },
  data() {
    return {
      title: '评论详情',
      usefulFlag: USEFUL_FLAG,
      uselessFlag: USELESS_FLAG,
      isJudged: false,
      judgeFlag: -1,
      usefulList: [],
      uselessList: [],
      commentRating: 0,
      lightPrimaryColor: LIGHT_PRIMARY_COLOR
    }
  },
  methods: {
    judge(flag) {
      if (!this.isLogin) {
        jumpTo(this.$router, '/user/login')
        return
      }
      if (this.isJudged) {
        this.$toast.fail('您已经评论过了')
        return
      }
      judgeComment(flag, this.currentComment, this.currentUser.userName).then(
        res => {
          if (res.data.code === ERR_OK) {
            this.judgeFlag = flag
            this.isJudged = true
            if (flag === USEFUL_FLAG) {
              this.usefulList.push(this.currentUser.userName)
            } else {
              this.uselessList.push(this.currentUser.userName)
            }
            return
          }
        }
      )
    },
    _queryCount(comment) {
      this.isJudged = false
      this.judgeFlag = -1
      queryCount(comment).then(res => {
        if (res.data.code === ERR_OK) {
          this.usefulList = res.data.usefulList
          this.uselessList = res.data.uselessList
          if (!this.isLogin) return
          for (let i = 0; i < this.usefulList.length; i++) {
            if (this.usefulList[i] === this.currentUser.userName) {
              this.isJudged = true
              this.judgeFlag = USEFUL_FLAG
              return
            }
          }
          for (let j = 0; j < this.uselessList.length; j++) {
            if (this.uselessList[j] === this.currentUser.userName) {
              this.isJudged = true
              this.judgeFlag = USELESS_FLAG
              return
            }
          }
          return
        }
        this.$toast.fail(SERVER_ERR_NOTICE)
      })
    },
    jumpToGuest() {
      this.setCurrentGuest(this.currentComment.userName)
      jumpTo(this.$router, '/guest')
    },
    jumpToMovie() {
      this.setCurrentMovie(this.currentComment.movieInfo)
      jumpTo(this.$router, '/movieDetail')
    },
    ...mapMutations({
      setCurrentMovie: 'SET_CURRENT_MOVIE',
      setCurrentGuest: 'SET_CURRENT_GUEST'
    })
  },
  components: {
    MHeader
  },
  watch: {
    currentComment(newComment) {
      this._queryCount(newComment)
    }
  },
  computed: {
    ...mapGetters(['currentComment', 'isLogin', 'currentUser'])
  },
  filters: {
    getCreateDate(timeStamp) {
      timeStamp = new Date(timeStamp)
      return timeStamp.getMonth() + 1 + '-' + timeStamp.getDate()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/reset.styl';
@import '~common/stylus/variables.styl';

.detail-body {
  margin-top: $m-header-height;

  .comment-title {
    height: 6vh;
    font-size: $font-size-mid;
    background-color: $light-primary-color;
    padding: 2vh 3vw;
    color: $grey-color;
  }

  .comment-content {
    padding: 2vh 3vw;
    font-size: $font-size-mini;
    color: $firstly-text;
    border-bottom: 1px dashed $grey-color;
  }

  .comment-rating {
    height: 6vh;
    line-height: 6vh;
    padding: 0 2vw;
    text-align: right;
  }

  .movie-info {
    font-size: $font-size-small;
    text-align: center;

    span {
      display: inline-block;
      height: 100%;
      line-height: 4vh;
      height: 4vh;
    }

    .title {
      color: $light-primary-color;
      max-width: 50vw;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .comment-creator {
    height: 2vh;
    padding: 2vh 3vw;
    font-size: $font-size-mini;
    border-bottom: 1px solid $grey-color;
    border-top: 1px solid $grey-color;
    margin-top: 2vh;

    .van-col {
      height: 2vh;
      line-height: 2vh;
      color: $light-primary-color;
    }

    .creator-date {
      text-align: right;
      color: $secondary-text;
    }
  }

  .comment-judge {
    .van-col {
      padding: 4vh 3vw;
      color: $secondary-text;

      p {
        text-align: center;
      }

      .m-icon {
        font-size: $font-size-ultra;
      }

      .count {
        margin-top: 2vh;
      }
    }

    .judged {
      color: $light-primary-color;
    }
  }
}
</style>