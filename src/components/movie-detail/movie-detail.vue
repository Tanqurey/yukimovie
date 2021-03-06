<template>
  <div>
    <div class="detail-header">
      <m-header :title="title" />
    </div>
    <swiper class="detail-body" :options="defaultOptions" v-show="!isLoading">
      <swiper-slide class="swiper-body">
        <van-row class="base-info">
          <van-col span="10" class="poster">
            <img :src="showingMovie.imageUrl" />
          </van-col>
          <van-col span="14" class="info">
            <ul>
              <li class="info-title">
                <span class="name">{{showingMovie.title}}</span>
                <span class="year">({{showingMovie.year}})</span>
              </li>
              <li class="info-item original-name">{{showingMovie.originalTitle}}</li>
              <li class="info-item">语言：{{showingMovie.language}}</li>
              <li class="info-item">时长：{{showingMovie.durations}}</li>
              <li class="info-item">上映日期：{{showingMovie.pubdate}}</li>
              <li class="info-item">国家：{{showingMovie.countries|concatArr}}</li>
              <li class="info-item">综合评分：{{showingMovie.score|modifyScore}}</li>
              <li class="info-item">标签：{{showingMovie.tags}}</li>
            </ul>
          </van-col>
        </van-row>
        <div class="introduction-container">
          <p class="introduction-title">剧情简介 / Introduction</p>
          <swiper class="introduction-swiper" :options="defaultOptions">
            <swiper-slide class="introduction-body">
              <div class="text">{{showingMovie.introduction}}</div>
            </swiper-slide>
          </swiper>
        </div>
        <div class="avatars-container">
          <p class="avatars-title">导演 / Directors</p>
          <swiper class="avatars-swiper" :options="avatarsOptions">
            <swiper-slide
              class="swiper-item"
              v-for="(item,idx) in showingMovie.directors"
              :key="idx"
              @click.native="jumpToStar(item)"
            >
              <img v-lazy="item.avatar" alt />
              <p class="avatar-name">{{item.name}}</p>
              <p class="avatar-name_en">{{item.name_en}}</p>
            </swiper-slide>
          </swiper>
        </div>
        <div class="avatars-container">
          <p class="avatars-title">演职员 / Casts</p>
          <swiper class="avatars-swiper" :options="avatarsOptions">
            <swiper-slide
              class="swiper-item"
              v-for="(item,idx) in showingMovie.actors"
              :key="idx"
              @click.native="jumpToStar(item)"
            >
              <img v-lazy="item.avatar" alt />
              <p class="avatar-name">{{item.name}}</p>
              <p class="avatar-name_en">{{item.name_en}}</p>
            </swiper-slide>
          </swiper>
        </div>
        <div class="galleries-container">
          <p class="galleries-title">剧照 / Galleries</p>
          <swiper class="galleries-swiper" :options="galleriesOptions">
            <swiper-slide
              class="galleries-item"
              v-for="(item,idx) in showingMovie.photos"
              :key="idx"
            >
              <img v-lazy="item" />
            </swiper-slide>
          </swiper>
        </div>
      </swiper-slide>
    </swiper>
    <m-loading v-show="isLoading" />
    <div class="function-container">
      <div @click="collectMovie" class="function">
        <p class="m-icon" :class="{'m-iconshoucang':!isCollected,'m-iconyishoucang':isCollected}"></p>
        <p class="function-text">收藏</p>
      </div>
      <div @click="jumpToComment" class="function">
        <p class="m-icon m-iconxiaoxi"></p>
        <p class="function-text">影评</p>
      </div>
    </div>
  </div>
</template>

<script>
import MHeader from 'base/m-header/m-header'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mapGetters, mapMutations } from 'vuex'
import { jumpTo, concatStringFromArray } from 'api/kit'
import { getMovieDetail } from 'api/detail'
import {
  ERR_OK,
  DEFAULT_SWIPER_OPTIONS,
  SERVER_ERR_NOTICE
} from 'common/js/config'
import { modifyMovieData, modifyStar } from 'api/modify-data'
import MLoading from 'base/m-loading/m-loading'
import {
  addToCollection,
  checkIsCollected,
  removeCollection
} from 'api/collect'

export default {
  created() {
    if (!this.currentMovie.id) {
      jumpTo(this.$router, '/')
      return
    }
    this._getMovieDetail(this.currentMovie.id)
    if (this.isLogin) {
      this._checkIsCollected(this.currentMovie.id, this.currentUser.userName)
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.currentMovie.id) {
        jumpTo(vm.$router, '/')
        return
      }
    })
  },
  data() {
    return {
      title: '影片详情',
      showingMovie: {},
      isLoading: true,
      isCollected: false,
      defaultOptions: DEFAULT_SWIPER_OPTIONS,
      avatarsOptions: {
        slidesPerView: 2,
        freeMode: true,
        observer: true,
        observeParents: true
      },
      galleriesOptions: {
        slidesPerView: 1,
        observer: true,
        observeParents: true
      }
    }
  },
  methods: {
    _getMovieDetail(id) {
      this.isLoading = true
      getMovieDetail(id).then(res => {
        if (res.status === ERR_OK) {
          this.showingMovie = modifyMovieData(res.data)
          this.isLoading = false
        }
      })
    },
    jumpToStar(star) {
      this.setCurrentStar(star)
      jumpTo(this.$router, '/starDetail')
    },
    collectMovie() {
      if (!this.isLogin) {
        jumpTo(this.$router, '/user/login')
        return
      }
      if (this.isCollected) {
        //取消收藏
        this._removeCollection(this.showingMovie.id, this.currentUser.userName)
        return
      }
      let directorsArr = []
      this.showingMovie.directors.forEach(item => {
        directorsArr.push(item.name)
      })

      addToCollection(
        this.showingMovie.id,
        this.showingMovie.title,
        directorsArr,
        this.currentUser.userName
      ).then(res => {
        if (res.data.code === ERR_OK) {
          this.isCollected = true
          this.$toast.success('收藏成功')
        } else {
          this.$toast.fail(SERVER_ERR_NOTICE)
        }
      })
    },
    _removeCollection(id, userName) {
      removeCollection(id, userName).then(res => {
        if (res.data.code === ERR_OK) {
          this.isCollected = false
          this.$toast.success('已取消收藏')
        } else {
          this.$toast.fail(SERVER_ERR_NOTICE)
        }
      })
    },
    _checkIsCollected(id, userName) {
      checkIsCollected(id, userName).then(res => {
        if (res.data.code === 200) {
          this.isCollected = res.data.isCollected
        } else {
          this.$toast.fail(SERVER_ERR_NOTICE)
        }
      })
    },
    jumpToComment() {
      jumpTo(this.$router, '/movieComment')
    },
    ...mapMutations({
      setCurrentStar: 'SET_CURRENT_STAR'
    })
  },
  watch: {
    currentMovie(newMovie) {
      this._getMovieDetail(newMovie.id)
      this.isCollected = false
      if (this.isLogin) {
        this._checkIsCollected(newMovie.id, this.currentUser.userName)
      }
    }
  },
  computed: {
    ...mapGetters(['currentMovie', 'isLogin', 'currentUser'])
  },
  filters: {
    concatArr(arr) {
      return concatStringFromArray(arr)
    },
    modifyScore(val) {
      if (!val) return
      if (typeof val === 'object') {
        return '暂无评分'
      }
      val = val.toString()
      return val.padEnd(3, '.0')
    }
  },
  components: {
    MHeader,
    swiper,
    swiperSlide,
    MLoading
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/reset.styl';
@import '~common/stylus/variables.styl';

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

.detail-body {
  touch-action: none;
  margin-top: $m-header-height;
  height: $rest-page-height;

  .swiper-body {
    height: auto;
  }

  .base-info {
    height: 36vh;
    background-color: $primary-color;
    position: relative;

    .poster {
      position: absolute;
      height: 100%;

      img {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        height: 28vh;
      }
    }

    .info {
      position: absolute;
      height: 28vh;
      transform: translateY(-50%);
      top: 50%;
      right: 0;

      span {
        display: inline-block;
        color: $firstly-text;
        font-size: $font-size-mid;
        overflow: hidden;
      }

      .name {
        max-width: 40vw;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .info-item {
        color: $firstly-text;
        font-size: $font-size-mini;
        overflow: hidden;
        width: 50vw;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-top: 0.6vh;
      }

      .original-name {
        color: $grey-color;
      }
    }
  }

  .introduction-container {
    width: 100%;
    height: 28vh;
    margin-top: 2vh;

    .introduction-title {
      font-size: $font-size-mid;
      color: $dark-primary-color;
      margin-left: 3vw;
      margin-bottom: 1vh;
    }

    .introduction-swiper {
      background-color: $grey-color;
      height: 24vh;

      .introduction-body {
        font-size: $font-size-mini;
        height: auto;

        .text {
          margin: 5vw;
        }
      }
    }
  }

  .avatars-container {
    width: 100%;
    height: 35vh;
    margin-top: 2vh;

    .avatars-title {
      font-size: $font-size-mid;
      color: $dark-primary-color;
      margin-left: 3vw;
    }

    .avatars-swiper {
      width: 90%;
      height: 30vh;
      margin: 0 auto;
      background-color: $grey-color;
      margin-top: 1vh;

      .swiper-item {
        position: relative;

        img {
          position: absolute;
          left: 50%;
          top: 1vh;
          transform: translateX(-50%);
          height: 22vh;
        }

        p {
          position: absolute;
          font-size: $font-size-mini;
          left: 50%;
          transform: translateX(-50%);
          width: 100%;
          text-align: center;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .avatar-name {
          bottom: 4vh;
        }

        .avatar-name_en {
          bottom: 1vh;
          color: $secondary-text;
        }
      }
    }
  }

  .galleries-container {
    width: 100%;
    height: 35vh;
    margin-top: 2vh;

    .galleries-title {
      font-size: $font-size-mid;
      color: $dark-primary-color;
      margin-left: 3vw;
    }

    .galleries-swiper {
      width: 90%;
      height: 30vh;
      margin: 0 auto;
      background-color: $grey-color;
      margin-top: 1vh;

      .galleries-item {
        position: relative;

        img {
          position: absolute;
          height: 22vh;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
      }
    }
  }
}
</style>