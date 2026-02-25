<template>
  <view class="wf-page">
    <div v-if="loading" style="position: relative; top: 44px">
      <x-spin />
    </div>
    <scroll-view v-else-if="newList.length" type="custom">
      <grid-view type="masonry" cross-axis-count="2" main-axis-gap="12" cross-axis-gap="10" style="width: 100%">
        <view v-for="(item, index) in newList" :key="index" class="wf-item" @tap="$emit('click', item, index, list)">
          <WaterfallFlowItem :item="item" />
        </view>
      </grid-view>
    </scroll-view>
  </view>
</template>

<script>
import WaterfallFlowItem from './WaterfallFlowItem'
import waterfallMixin from '@/mixin/waterfall'
export default {
  components: {
    WaterfallFlowItem
  },
  mixins: [waterfallMixin],
  props: {
    // 瀑布流列表
    list: {
      type: Array,
      require: true
    }
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    isVideo(item) {
      return item.contentType === '2'
    }
  }
}
</script>

<style lang="scss" scoped>
$page-padding: 32rpx;
$grid-gap: 24rpx;

.wf-page {
  position: relative;
  /* display: grid; */
  /* grid-gap: $grid-gap; */
  /* grid-template-columns: 1fr 1fr; */
  min-height: 160rpx;
  padding: 32rpx $page-padding;
}

.wf-item {
  width: 100%;
  /* padding-bottom: $grid-gap; */
}
</style>
