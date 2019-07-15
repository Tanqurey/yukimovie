<template>
  <div>
    <div class="fixed-box">
      <div class="rank-header">
        <p class="header-text">{{rankName[titleIndex]}}</p>
      </div>
      <div class="nav-container">
        <van-tabs v-model="activeNav" :color="'#8BC34A'" :title-active-color="'#8BC34A'">
          <van-tab v-for="(item,idx) in rankName" :key="idx" :title="item" :disabled="isLoading"></van-tab>
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
      activeNav: 0,
      rankName: ['北美票房榜', '全球新片榜', '本周口碑榜'],
      titleIndex: 0,
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
    activeNav(newIndex) {
      this.titleIndex = newIndex
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

.fixed-box {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 99;

  .rank-header {
    height: 7rem;
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
      color: $grey-color;
      border-bottom: 1px solid $grey-color;
    }

    .nav-container {
      width: 100%;
      margin: 0 auto;
      touch-action: none;
    }
  }
}

.rank-content {
  position: relative;
  top: 7rem + (54 / 20rem);
}
</style>