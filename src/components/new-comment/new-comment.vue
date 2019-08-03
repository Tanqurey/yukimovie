<template>
  <div>
    <div class="comment-header">
      <m-header :title="title" />
    </div>
    <div class="comment-body">
      <div class="comment-movie">
        <div class="movie-cover">
          <img :src="currentMovie.imageUrl" alt />
        </div>
        <div class="movie-title"></div>
      </div>
      <van-field
        v-model="comment.commentTitle"
        clearable
        label="标题"
        icon="clear"
        placeholder="请输入评论标题，32字符以内"
        @click-icon="comment.commentTitle=''"
        class="input-title"
        :label-width="labelWidth"
      />
      <van-field
        v-model="comment.commentContent"
        label="内容"
        placeholder="请输入评论内容，20-300字符"
        class="input-text"
        :label-width="labelWidth"
        :type="'textarea'"
        :autosize="true"
      />
      <van-row class="rating-container">
        <van-col :span="4" class="rating-title">评分</van-col>
        <van-col :span="16" class="rating-tools">
          <van-rate
            v-model="comment.rating"
            :size="20"
            :color="lightPrimaryColor"
            void-icon="star"
          />
        </van-col>
        <van-col :span="4" class="rating-score">{{comment.rating}}.0</van-col>
      </van-row>
      <van-button type="primary" size="small" class="submit-btn" @click="submitComment">提交评论</van-button>
    </div>
  </div>
</template>

<script>
import MHeader from 'base/m-header/m-header'
import { LIGHT_PRIMARY_COLOR } from 'common/js/config'
import { mapGetters } from 'vuex'
import { newComment } from 'api/comment'
import { jumpTo } from 'api/kit'
import { ERR_OK, SERVER_ERR_NOTICE } from 'common/js/config'

export default {
  created() {
    if (!this.isLogin || !this.currentMovie.id) {
      jumpTo(this.$router, '/')
      return
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.isLogin || !vm.currentMovie.id) {
        jumpTo(vm.$router, '/')
        return
      }
    })
  },
  data() {
    return {
      title: '发表影评',
      comment: {
        commentTitle: '',
        commentContent: '',
        rating: 0
      },
      labelWidth: 42,
      lightPrimaryColor: LIGHT_PRIMARY_COLOR,
      maxCommentTitle: 32,
      maxCommentContent: 300,
      minCommentContent: 20
    }
  },
  methods: {
    checkComment() {
      if (
        this.comment.commentTitle === '' ||
        this.comment.commentContent === ''
      ) {
        this.$toast.fail('请完善评论信息')
        return false
      }
      if (
        this.comment.commentTitle.length > this.maxCommentTitle ||
        this.comment.commentContent.length < this.minCommentContent ||
        this.comment.commentContent.length > this.maxCommentContent
      ) {
        this.$toast.fail('评论长度不合要求')
        return false
      }
      return true
    },
    submitComment() {
      const flag = this.checkComment()
      if (!flag) return
      let movieInfo = {}
      movieInfo.id = this.currentMovie.id
      movieInfo.title = this.currentMovie.title
      newComment(this.comment, this.currentUser.userName, movieInfo).then(
        res => {
          if (res.data.code === ERR_OK) {
            this.$toast.success('成功发布，正在跳转')
            this.$router.go(-1)
          } else {
            this.$toast.fail(SERVER_ERR_NOTICE)
          }
        }
      )
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'currentMovie', 'currentUser'])
  },
  components: {
    MHeader
  },
  beforeRouteLeave(to, from, next) {
    this.comment.commentTitle = ''
    this.comment.commentContent = ''
    this.comment.rating = 0
    next()
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/reset.styl';
@import '~common/stylus/variables.styl';

.comment-body {
  touch-action: none;
  margin-top: $m-header-height;
  height: $rest-page-height;
  width: 100%;

  .comment-movie {
    background-color: $primary-color;
    height: 30vh;

    .movie-cover {
      img {
        position: relative;
        left: 50%;
        height: 25vh;
        top: 2.5 vh;
        transform: translateX(-50%);
      }
    }
  }

  .comment-title {
    height: 6vh;
    line-height: 6vh;
    font-size: $font-size-mini;

    .title-tips {
      text-align: center;
      color: $light-primary-color;
    }

    .title-text {
      position: relative;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .input-title {
    font-size: $font-size-mini;
    text-align: center;
    color: $light-primary-color;
    height: 8vh;
    line-height: 8vh;
    padding-right: 4vw;
  }

  .input-text {
    font-size: $font-size-mini;
    text-align: center;
    color: $light-primary-color;
    height: 20vh;
    padding-right: 4vw;
  }

  .rating-container {
    font-size: $font-size-mini;
    height: 8vh;
    line-height: 8vh;

    .rating-title {
      color: $light-primary-color;
      text-align: center;
    }

    .rating-tools {
      position: relative;
      text-align: right;
      top: 1vh;
    }

    .rating-score {
      text-align: center;
      color: $light-primary-color;
    }
  }

  .submit-btn {
    top: 3vh;
    border: none;
    background-color: $light-primary-color;
    color: $white-text;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
