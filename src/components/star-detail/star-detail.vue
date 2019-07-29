<template>
  <div>
    <div class="detail-header">
      <m-header :title="title" />
    </div>
    <swiper class="detail-body" :options="defaultOptions">
      <swiper-slide class="swiper-body" v-show="!isLoading">
        <div class="base-info">
          <van-row class="base-info">
            <van-col span="10" class="avatar">
              <img :src="showingStar.avatar" />
            </van-col>
            <van-col span="14" class="info">
              <ul>
                <li class="info-title">
                  <span class="name">{{showingStar.name}}</span>
                </li>
                <li class="info-item original-name">{{showingStar.name_en}}</li>
                <li class="info-item">生日：{{showingStar.birthday}}</li>
                <li class="info-item">地区：{{showingStar.bornPlace}}</li>
              </ul>
            </van-col>
          </van-row>
        </div>
        <div class="introduction-container">
          <p class="introduction-title">个人简介 / Introduction</p>
          <swiper
            class="introduction-swiper"
            :options="defaultOptions"
            v-if="showingStar.introduction"
          >
            <swiper-slide class="introduction-body">
              <div class="text">{{showingStar.introduction}}</div>
            </swiper-slide>
          </swiper>
          <div class="no-data-layer" v-else>
            <p>暂无数据</p>
          </div>
        </div>
        <div class="photos-container">
          <p class="photos-title">相册 / Photos</p>
          <swiper
            class="photos-swiper"
            :options="photosOptions"
            v-if="showingStar.photos&&showingStar.photos.length"
          >
            <swiper-slide class="swiper-item" v-for="(item,idx) in showingStar.photos" :key="idx">
              <img v-lazy="item" alt />
            </swiper-slide>
          </swiper>
          <div class="photos-swiper" v-else>
            <p>暂无数据</p>
          </div>
        </div>
        <div class="works-container">
          <p class="works-title">作品 / Works</p>
          <swiper class="works-swiper" :options="worksOptions">
            <swiper-slide
              class="swiper-item"
              v-for="(item,idx) in showingStar.artworks"
              :key="idx"
              @click.native="jumpToMovie(item)"
            >
              <img v-lazy="item.imageUrl" alt />
              <p class="work-name">{{item.title}}</p>
            </swiper-slide>
          </swiper>
        </div>
      </swiper-slide>
    </swiper>
    <m-loading v-if="isLoading" />
  </div>
</template>

<script>
import MHeader from 'base/m-header/m-header'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mapGetters, mapMutations } from 'vuex'
import { jumpTo } from 'api/kit'
import { getStarDetail } from 'api/star'
import { ERR_OK, DEFAULT_SWIPER_OPTIONS } from 'common/js/config'
import { modifyStar } from 'api/modify-data'
import MLoading from 'base/m-loading/m-loading'

export default {
  created() {
    if (!this.currentStar.id) {
      jumpTo(this.$router, '/')
      return
    }
    this._getStarDetail(this.currentStar.id)
  },
  data() {
    return {
      isLoading: true,
      showingStar: {},
      title: '艺人详情',
      defaultOptions: DEFAULT_SWIPER_OPTIONS,
      photosOptions: {
        slidesPerView: 1,
        observer: true,
        observeParents: true
      },
      worksOptions: {
        slidesPerView: 2,
        freeMode: true,
        observer: true,
        observeParents: true
      }
    }
  },
  methods: {
    _getStarDetail(id) {
      this.isLoading = true
      getStarDetail(id).then(res => {
        if (res.status === ERR_OK) {
          this.showingStar = modifyStar(res.data)
          this.isLoading = false
        }
      })
    },
    jumpToMovie(movie) {
      this.setCurrentMovie(movie)
      jumpTo(this.$router, '/movieDetail')
    },
    ...mapMutations({
      setCurrentMovie: 'SET_CURRENT_MOVIE'
    })
  },
  watch: {
    currentStar(newStar) {
      this._getStarDetail(newStar.id)
    }
  },
  computed: {
    ...mapGetters(['currentStar'])
  },
  components: {
    MHeader,
    MLoading,
    swiper,
    swiperSlide
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/reset.styl';
@import '~common/stylus/variables.styl';

.detail-body {
  touch-action: none;
  margin-top: $m-header-height;
  height: $rest-page-height;

  .swiper-body {
    height: auto;

    .base-info {
      height: 36vh;
      background-color: $primary-color;
      position: relative;

      .avatar {
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

    .photos-container {
      width: 100%;
      height: 35vh;
      margin-top: 2vh;

      .photos-title {
        font-size: $font-size-mid;
        color: $dark-primary-color;
        margin-left: 3vw;
      }

      .photos-swiper {
        width: 90%;
        height: 30vh;
        margin: 0 auto;
        background-color: $grey-color;
        margin-top: 1vh;
        position: relative;

        p {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: $secondary-text;
          font-size: $font-size-mini;
        }

        .swiper-item {
          position: relative;

          img {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
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

          .photo-name {
            bottom: 4vh;
          }

          .photo-name_en {
            bottom: 1vh;
            color: $secondary-text;
          }
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

      .no-data-layer {
        background-color: $grey-color;
        height: 24vh;
        line-height: 24vh;
        text-align: center;
        color: $secondary-text;
        font-size: $font-size-mini;
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

    .works-container {
      width: 100%;
      height: 35vh;
      margin-top: 2vh;

      .works-title {
        font-size: $font-size-mid;
        color: $dark-primary-color;
        margin-left: 3vw;
      }

      .works-swiper {
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
            top: 3vh;
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

          .work-name {
            bottom: 1vh;
          }
        }
      }
    }
  }
}
</style>