<template>
  <div>
    <div class="detail-header">
      <m-header :title="title" />
    </div>
    <van-list
      v-model="isLoading"
      :finished="finished"
      :finished-text="finishedText"
      @load="loadMore"
      :immediate-check="false"
      class="detail-list"
      v-if="dataList.length"
    >
      <van-row v-for="(item,idx) in dataList" :key="idx" class="detail-item">
        <van-col :span="18" class="user-name">{{item}}</van-col>
        <van-col :span="6" class="func-btn">
          <van-button type="primary" size="mini" @click.native="jumpToDetail(item)">{{btnText}}</van-button>
        </van-col>
      </van-row>
    </van-list>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import MHeader from 'base/m-header/m-header'
import {
  COUNT_CATE,
  ERR_OK,
  SERVER_ERR_NOTICE,
  COUNT_HANDLE
} from 'common/js/config'
import { jumpTo } from 'api/kit'
import { loadCountDetail } from 'api/count'
import { modifyUser } from 'api/modify-data'

export default {
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.countCate === null || !vm.listOwner) {
        jumpTo(vm.$router, '/')
      }
      if (!vm.dataList.length && !vm.finished) {
        vm.loadMore(vm.countCate, 1)
      }
    })
  },
  data() {
    return {
      isLoading: false,
      finished: false,
      isModified: false,
      specialIndex: [],
      finishedText: '全部加载完成',
      dataList: [],
      title: '列表详情',
      page: 1,
      btnText: '访问'
    }
  },
  methods: {
    loadMore(cate, page) {
      loadCountDetail(cate, page, this.listOwner).then(res => {
        if (res.data.code === ERR_OK) {
          if (res.data.listData.length) {
            let listData = res.data.listData
            this.dataList = this.dataList.concat(listData)
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
    clickBtn() {},
    jumpToDetail(userName) {
      this.setCurrentGuest(userName)
      jumpTo(this.$router, '/guest')
    },
    ...mapMutations({
      setCurrentGuest: 'SET_CURRENT_GUEST'
    })
  },
  components: {
    MHeader
  },
  computed: {
    ...mapGetters(['countCate', 'listOwner', 'currentUser'])
  },
  beforeRouteLeave(to, from, next) {
    this.dataList = []
    this.page = 1
    this.isLoading = false
    this.finished = false
    this.specialIndex = []
    this.isModified = false
    next()
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/reset.styl';
@import '~common/stylus/variables.styl';

.detail-list {
  margin-top: $m-header-height;

  .van-col {
    font-size: $font-size-mini;
    height: 6vh;
    line-height: 6vh;
  }

  .user-name {
    padding: 0 2vw;
    color: $light-primary-color;
  }

  .func-btn {
    text-align: center;

    button {
      background-color: $dark-primary-color;
      border: none;
    }
  }
}
</style>