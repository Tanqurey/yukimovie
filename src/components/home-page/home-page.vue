<template>
  <div>
    <div class="fixed-box">
      <div class="header-container">
        <img src="../../common/images/header.png" />
      </div>
      <div class="search-bar">
        <van-row>
          <van-col span="3" class="search-icon m-icon m-iconchaxun"></van-col>
          <van-col span="16" class="input-box">
            <van-field v-model="keywords" placeholder="请输入影片或用户关键字" />
          </van-col>
          <van-col span="5" class="search-btn">
            <van-button plain size="mini" type="primary">搜索</van-button>
          </van-col>
        </van-row>
      </div>
    </div>
    <div class="nowplaying">
      <van-divider :style="dividerStyle">————&nbsp;&nbsp;院线热映&nbsp;&nbsp;————</van-divider>
      <div class="nowplaying-body">
        <swiper :options="swiperOptions">
          <swiper-slide v-for="(item,idx) in nowPlayingArr" :key="idx">
            <div class="nowplaying-item">
              <img v-lazy="item.imageUrl" />
              <p class="item-title">{{item.title}}</p>
              <p class="item-score">{{item.score||'暂无评分'}}</p>
            </div>
          </swiper-slide>
          <div class="swiper-scrollbar" slot="scrollbar"></div>
        </swiper>
      </div>
    </div>
    <div class="nav-container">
      <div class="left-container" @click="jumpToCenter">
        <p class="m-icon m-iconyonghu1 icon-user"></p>
        <p class="user">个人中心</p>
      </div>
      <div class="right-container">
        <van-grid :column-num="2" :border="false">
          <van-grid-item @click.native="jumpToRank">
            <p class="nav-icon m-icon m-iconpaixing"></p>
            <p class="nav-text">排行</p>
          </van-grid-item>
          <van-grid-item>
            <p class="nav-icon m-icon m-icontupian"></p>
            <p class="nav-text">动态</p>
          </van-grid-item>
          <van-grid-item>
            <p class="nav-icon m-icon m-iconxiaoxi"></p>
            <p class="nav-text">影评</p>
          </van-grid-item>
          <van-grid-item>
            <p class="nav-icon m-icon m-iconguanzhu"></p>
            <p class="nav-text">关注</p>
          </van-grid-item>
        </van-grid>
      </div>
    </div>
  </div>
</template>

<script>
import { getPlayingMovies } from 'api/home'
import { modifyMovieData } from 'api/modify-data'
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mapGetters } from 'vuex'
import { jumpTo, jumpToByFlag } from 'api/kit'

export default {
  created() {
    this._getPlayingMovies()
  },
  data() {
    return {
      keywords: '',
      nowPlayingArr: [],
      dividerStyle: {
        color: '#8BC34A'
      },
      swiperOptions: {
        slidesPerView: 3,
        scrollbar: {
          el: '.swiper-scrollbar',
          draggable: true,
          hide: true
        }
      }
    }
  },
  methods: {
    _getPlayingMovies() {
      getPlayingMovies().then(res => {
        if (res.status === 200) {
          let nowPlayingArr = []
          let dataArr = res.data.entries.slice(0, 9)
          dataArr.forEach(item => {
            nowPlayingArr.push(modifyMovieData(item))
          })
          this.nowPlayingArr = nowPlayingArr
        }
      })
    },
    jumpToRank() {
      jumpTo(this.$router, '/rank')
    },
    jumpToCenter() {
      jumpToByFlag(this.$router, '/userCenter', '/user/login', this.isLogin)
    }
  },
  computed: {
    ...mapGetters(['isLogin'])
  },
  components: {
    swiper,
    swiperSlide
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/reset.styl';
@import '~common/stylus/variables.styl';

.fixed-box {
  position: fixed;
  top: 0;
  width: 100%;

  .header-container {
    background-color: $dark-primary-color;

    img {
      height: 10vh;
    }
  }

  .search-bar {
    height: 6vh;
    background-color: $dark-primary-color;
    line-height: 6vh;
    text-align: center;

    .search-icon {
      color: $white-text;
    }

    .input-box {
      font-size: $font-size-small;
      height: 6vh;
      position: relative;

      div {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        border-radius: 0.1rem;
      }
    }

    .search-btn {
      .van-button--plain, .van-button--primary {
        color: $white-text;
        border: 1px solid $grey-color;
        background-color: $primary-color;
      }
    }
  }
}

.nowplaying {
  margin: 0 auto;
  margin-top: 18vh;

  .van-divider {
    font-size: $font-size-small;
  }

  .nowplaying-body {
    height: 34vh;
    width: 100%;
    background-color: $grey-color;
    margin-top: 0.4rem;

    .swiper-container {
      height: 34vh;
    }

    .nowplaying-item {
      font-size: $font-size-mini;
      text-align: center;
      position: relative;
      margin-top: 1rem;

      img {
        height: 24vh;
      }

      .item-title, .item-score {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
      }

      .item-score {
        color: $secondary-text;
        margin-top: 0.2rem;
      }
    }
  }
}

.nav-container {
  height: 24vh;
  margin: 0 auto;
  margin-top: 0.5rem;

  .left-container {
    width: 49%;
    height: 8rem;
    color: $dark-primary-color;
    border-right: 1px solid $light-primary-color;
    float: left;
    position: relative;

    .icon-user, .user {
      position: absolute;
      left: 49%;
      text-align: center;
    }

    .icon-user {
      font-size: $font-size-ultra;
      top: 44%;
      transform: translate(-50%, -50%);
    }

    .user {
      font-size: $font-size-mini;
      top: 64%;
      transform: translate(-50%, -50%);
    }
  }

  .right-container {
    .van-grid {
      width: 50%;
      height: 8rem;
      background-color: blue;
      float: left;

      .van-grid-item {
        height: 50%;
        color: $dark-primary-color;

        .nav-icon {
          font-size: $font-size-mid;
        }

        .nav-text {
          font-size: $font-size-mini;
        }
      }
    }
  }
}
</style>

