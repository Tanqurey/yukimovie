<template>
  <div class="swiper-container">
    <ul>
      <li v-for="(item,idx) in dataList" :key="idx" class="best-li">
        <img v-lazy="item.imageUrl" alt />
        <p class="best-movie-title">{{item.title}}</p>
        <p class="best-movie-score">综合评分：{{item.score|scoreFilter}}</p>
        <p class="best-movie-tags">{{item.tags}}</p>
        <p class="best-movie-mark">#</p>
        <p class="best-movie-rank" :class="{'movie-rank':idx>2}">{{idx+1}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { scoreFilter } from 'api/kit'

export default {
  props: {
    dataList: {
      default: [],
      type: Array
    }
  },
  data() {
    return {
      swiperOption: {
        direction: 'vertical',
        slidesPerView: 'auto',
        freeMode: true,
        mousewheel: true,
        observer: true,
        observeParents: true
      }
    }
  },
  filters: {
    scoreFilter: scoreFilter
  }
}
</script>

<style lang="stylus">
@import '~common/stylus/reset.styl';
@import '~common/stylus/variables.styl';

.best-li {
  height: 8rem;
  position: relative;

  p {
    position: absolute;
    font-size: $font-size-mini;
    color: $secondary-text;
  }

  .best-movie-title {
    font-size: $font-size-mid;
    color: $light-primary-color;
    left: 6.2rem;
    top: 0.8rem;
    width: 10rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .best-movie-tags {
    left: 6.2rem;
    bottom: 0.6rem;
  }

  .best-movie-score {
    left: 6.2rem;
    bottom: 1.6rem;
  }

  .best-movie-mark {
    right: 4.4rem;
    top: 2rem;
    font-size: $font-size-big;
    color: $divider-color;
  }

  .best-movie-rank {
    right: 1.4rem;
    top: 2rem;
    font-size: $font-size-title;
    color: $light-primary-color;
  }

  .movie-rank {
    color: $grey-color;
  }

  img {
    height: 7rem;
    position: absolute;
    left: 0.6rem;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>