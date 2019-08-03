<template>
  <div>
    <div class="list-header">
      <m-header :title="title" />
    </div>
    <div class="list-container">
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="finishedText"
        @load="loadMore"
        :immediate-check="false"
        class="list-body"
      >
        <van-row v-for="(item,idx) in dataList" :key="idx" class="list-item">
          <van-col
            :span="14"
            class="collection-title"
            @click.native="jumpToDetail(item)"
          >{{item.title}}</van-col>
          <van-col :span="6" class="collection-directors">{{item.directors|concatArrText}}</van-col>
          <van-col :span="4" class="m-icon m-iconshanchu1" @click.native="removeCollection(idx)"></van-col>
        </van-row>
      </van-list>
    </div>
  </div>
</template>

<script>
import MHeader from 'base/m-header/m-header'
import { mapGetters, mapMutations } from 'vuex'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import { DEFAULT_SWIPER_OPTIONS } from 'common/js/config'
import { loadCollection, removeCollection } from 'api/collect'
import { ERR_OK, SERVER_ERR_NOTICE } from 'common/js/config'
import { concatStringFromArray, jumpTo } from 'api/kit'

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!vm.currentUser) {
        jumpTo(vm.$router, '/user/login')
        return
      }
      vm.loadMore()
    })
  },
  data() {
    return {
      title: '我的收藏',
      defaultOptions: DEFAULT_SWIPER_OPTIONS,
      dataList: [],
      finishedText: '没有更多了',
      loading: false,
      finished: false,
      page: 1
    }
  },
  methods: {
    loadMore() {
      loadCollection(this.currentUser.userName, this.page).then(res => {
        if (res.data.code === ERR_OK) {
          if (res.data.collectionData.length) {
            this.dataList = this.dataList.concat(res.data.collectionData)
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
    },
    jumpToDetail(movie) {
      this.setCurrentMovie(movie)
      jumpTo(this.$router, '/movieDetail')
    },
    removeCollection(idx) {
      const userName = this.currentUser.userName
      const movieId = this.dataList[idx].id

      removeCollection(movieId, userName).then(res => {
        if (res.data.code === ERR_OK) {
          this.dataList.splice(idx, 1)
        } else {
          this.$toast.fail(SERVER_ERR_NOTICE)
        }
      })
    },
    ...mapMutations({
      setCurrentMovie: 'SET_CURRENT_MOVIE'
    })
  },
  watch: {
    isLogin(newVal) {
      if (newVal) {
        this.loadMore()
      }
    }
  },
  computed: {
    ...mapGetters(['currentUser', 'isLogin'])
  },
  components: {
    MHeader,
    swiper,
    swiperSlide
  },
  filters: {
    concatArrText: concatStringFromArray
  },
  beforeRouteLeave(to, from, next) {
    this.page = 1
    this.dataList = []
    next()
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/reset.styl';
@import '~common/stylus/variables.styl';

.list-header {
  position: fixed;
  top: 0;
  z-index: 999;
}

.list-container {
  margin-top: $m-header-height;

  .list-body {
    .list-item {
      height: 7vh;
      font-size: $font-size-small;

      .van-col {
        line-height: 6vh;
        padding: 0 3vw;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        color: $secondary-text;
      }

      .collection-title {
        color: $light-primary-color;
      }

      .collection-directors {
        color: $firstly-text;
      }
    }

    .list-item:nth-child(odd) {
      background-color: $grey-color;
    }
  }
}
</style>