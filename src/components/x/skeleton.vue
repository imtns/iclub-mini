<template>
  <text v-if="show" :style="{ height, width: computedWidth, background, borderRadius }" class="SkeletonBox" />
</template>

<script>
export default {
  name: 'SkeletonBox',
  props: {
    background: {
      type: String,
      default: '#dddbdd'
    },
    borderRadius: {
      type: String,
      default: '0rpx'
    },
    maxWidth: {
      default: 100,
      type: Number
    },
    minWidth: {
      default: 80,
      type: Number
    },
    height: {
      default: '1em',
      type: String
    },
    width: {
      default: null,
      type: String
    }
  },
  data() {
    return {
      show: false
    }
  },
  computed: {
    computedWidth() {
      return this.width || `${Math.floor(Math.random() * (this.maxWidth - this.minWidth) + this.minWidth)}%`
    }
  },
  mounted() {
    this.show = true
  }
}
</script>

<style lang="scss">
.SkeletonBox {
  position: relative;
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;
  &::after {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(90deg, rgba(#fff, 0) 0, rgba(#fff, 0.2) 20%, rgba(#fff, 0.5) 60%, rgba(#fff, 0));
    transform: translateX(-100%);
    animation: shimmer 1.5s infinite;
    content: '';
  }
  @keyframes shimmer {
    100% {
      transform: translateX(100%);
    }
  }
}
</style>
