<template>
  <div class="rank-container">
    <div class="fixed-box">
      <div class="rank-header">
        <p class="header-text">{{rankName[activeIndex]}}</p>
      </div>
      <div class="nav-container">
        <van-tabs v-model="activeIndex" :color="'#8BC34A'" :title-active-color="'#8BC34A'">
          <van-tab
            v-for="(item,idx) in rankName"
            :key="idx"
            :title="item"
            :disabled="isLoading&&idx===activeIndex"
          ></van-tab>
        </van-tabs>
      </div>
    </div>
    <m-loading v-if="isLoading" />
    <div class="rank-content">
      <rank-list :dataList="rankList" />
    </div>
  </div>
</template>

<script>
import getRankData from 'api/rank'
import RankList from 'components/rank-list/rank-list'
import MLoading from 'base/m-loading/m-loading'
import { modifyMovieData } from 'api/modify-data'
export default {
  created() {
    this._getRankData(0)
  },
  data() {
    return {
      activeIndex: null,
      rankName: ['北美票房榜', '全球新片榜', '本周口碑榜'],
      rankList: [],
      isLoading: true
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
    }
  },
  watch: {
    activeIndex(newIndex) {
      this.activeIndex = newIndex
      this._getRankData(newIndex)
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

.rank-container {
  margin-top: 20vh;
  // touch-action: none;
}

.fixed-box {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;
  touch-action: none;

  .rank-header {
    height: 20vh;
    background-color: $dark-primary-color;
    margin: 0 auto;
    border-bottom: 2px solid $grey-color;

    .header-text {
      font-size: $font-size-title;
      width: 12rem;
      text-align: center;
      position: relative;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      color: $white-text;
      border-bottom: 2px solid $primary-color;
    }

    .nav-container {
      width: 100%;
      margin: 0 auto;
    }
  }
}
</style>