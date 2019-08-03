<template>
  <div>
    <div class="result-header">
      <m-header :title="title" />
    </div>
    <swiper class="result-body" :options="defaultOption">
      <swiper-slide class="swiper-body">
        <van-row class="result-item" v-for="(item,idx) in userSearchResult" :key="idx">
          <van-col :span="4" class="tag">{{item.isAdmin?'管理员':'用&nbsp;&nbsp;&nbsp;户'}}</van-col>
          <van-col :span="10" class="name">{{item.userName}}</van-col>
          <van-col :span="7" class="count">
            <span class="m-iconduoren m-icon">&nbsp;{{item.fansCount}}</span>
            <span class="m-iconguanzhu m-icon">&nbsp;{{item.subscribeCount}}</span>
          </van-col>
          <van-col :span="3" class="level">Lv{{item.level}}</van-col>
        </van-row>
        <div class="result-tips">共找到"{{keywords}}"相关的记录共{{userSearchResult.length}}条</div>
      </swiper-slide>
    </swiper>
    <m-loading v-show="isLoading" />
  </div>
</template>

<script>
import MHeader from 'base/m-header/m-header'
import { modifyUser } from 'api/modify-data'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { mapMutations, mapGetters } from 'vuex'
import { jumpTo } from 'api/kit'
import { ERR_OK, DEFAULT_SWIPER_OPTIONS } from 'common/js/config'
import MLoading from 'base/m-loading/m-loading'
import { searchUser } from 'api/search'

export default {
  created() {
    if (!this.keywords) {
      jumpTo(this.$router, '/')
      return
    }
    this._searchUser(this.keywords)
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.keywords) {
        jumpTo(vm.$router, '/')
        return
      }
    })
  },
  data() {
    return {
      title: '检索结果',
      defaultOption: DEFAULT_SWIPER_OPTIONS,
      isLoading: true,
      activeColor: '#8BC34A',
      userSearchResult: []
    }
  },
  methods: {
    _searchUser(keywords) {
      this.isLoading = true
      searchUser(keywords).then(res => {
        this.isLoading = false
        if (res.data.code === ERR_OK) {
          if (res.data.isExisted) {
            let userSearchResult = []
            res.data.searchResult.forEach(item => {
              let user = modifyUser(item)
              userSearchResult.push(user)
            })
            this.userSearchResult = userSearchResult
            return
          }
          this.userSearchResult = []
        }
        this.$toast.fail(SERVER_ERR_NOTICE)
      })
    }
  },
  watch: {
    keywords(newVal) {
      this._searchUser(newVal)
    }
  },
  components: {
    MHeader,
    MLoading,
    swiper,
    swiperSlide
  },
  computed: {
    ...mapGetters(['keywords'])
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/reset.styl';
@import '~common/stylus/variables.styl';

.result-header {
  height: 10vh;
  width: 100vw;
  background-color: $dark-primary-color;
  position: relative;

  .header-tabs {
    position: absolute;
    width: 100%;
    bottom: 0;
    height: $vant-nav-bar-height;
  }
}

.result-body {
  width: 100%;
  height: 80vh;

  .swiper-body {
    height: auto;

    .result-item:nth-child(odd) {
      background-color: $grey-color;
    }

    .result-item {
      font-size: $font-size-mid;
      height: 6vh;
      line-height: 6vh;

      .tag {
        padding: 0 1vw;
        color: $secondary-text;
      }

      .name, .level {
        color: $light-primary-color;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .count {
        color: $secondary-text;

        span {
          display: inline-block;
          width: 12vw;
        }
      }
    }

    .result-tips {
      color: $secondary-text;
      font-size: $font-size-mini;
      margin-top: 2vh;
      text-align: center;
    }
  }
}
</style>