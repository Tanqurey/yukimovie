<template>
  <div class="rank-container">
    <div class="rank-header">
      <div class="header-title">
        <p class="rank-title">{{currentTitle}}</p>
      </div>
      <div class="header-tabs">
        <van-tabs v-model="activeIndex" :color="activeColor">
          <van-tab v-for="(item,idx) in rankName" :key="idx" :title="item" :disabled="isLoading"></van-tab>
        </van-tabs>
      </div>
    </div>
    <m-loading v-if="isLoading" />
    <div class="rank-content">
      <rank-list :dataList="rankList" @selected="jumpToDetail" />
    </div>
  </div>
</template>

<script>
import getRankData from 'api/rank'
import { mapMutations } from 'vuex'
import RankList from 'components/rank-list/rank-list'
import MLoading from 'base/m-loading/m-loading'
import { modifyMovieData } from 'api/modify-data'
import Movie from 'common/js/movie'
import { jumpTo } from 'api/kit'

export default {
  created() {
    this._getRankData(0)
  },
  data() {
    return {
      activeIndex: 0,
      rankName: ['北美票房榜', '全球新片榜', '本周口碑榜'],
      rankList: [],
      isLoading: true,
      activeColor: '#8BC34A'
    }
  },
  methods: {
    _getRankData(index) {
      this.isLoading = true
      getRankData(index).then(res => {
        if (res.status === 200) {
          const dataList = res.data.subjects
          let rankList = []
          let a = 0
          for (let i = 0; i < dataList.length; i++) {
            rankList.push(modifyMovieData(dataList[i].subject || dataList[i]))
          }
          this.rankList = rankList
          this.isLoading = false
        }
      })
    },
    jumpToDetail(movie) {
      this.setCurrentMovie(new Movie(movie))
      jumpTo(this.$router, '/movieDetail')
    },
    ...mapMutations({
      setCurrentMovie: 'SET_CURRENT_MOVIE'
    })
  },
  watch: {
    activeIndex(newIndex) {
      this._getRankData(newIndex)
    }
  },
  computed: {
    currentTitle() {
      return this.rankName[this.activeIndex]
    }
  },
  components: {
    RankList,
    MLoading
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/reset.styl';
@import '~common/stylus/variables.styl';

.rank-header {
  height: 20vh;
  width: 100vw;
  background-color: $dark-primary-color;
  position: relative;

  .rank-title {
    color: $white-text;
    text-align: center;
    font-size: $font-size-big;
    position: absolute;
    bottom: 60%;
    left: 50%;
    transform: translateX(-50%);
    border-bottom: 1px solid $grey-color;
  }

  .header-tabs {
    position: absolute;
    width: 100%;
    bottom: 0;
    height: $vant-nav-bar-height;
  }
}

.rank-content {
  height: 80vh;
}
</style>