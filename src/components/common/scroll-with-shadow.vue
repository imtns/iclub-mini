<template>
  <div class="container">
    <div class="wrapper">
      <scroll-view ref="scrollView" :scroll-y="true" :style="{ height, borderRadius: '32rpx', overflow: 'hidden' }" lower-threshold="150" @scroll="onScrolling">
        <slot />
      </scroll-view>

      <img v-if="shadow" class="shadow" src="https://udstatic.imeik.com/compressed/1740385607238_%E7%9F%A9%E5%BD%A2%402x.png" />
    </div>

    <image src="https://udstatic.imeik.com/pcUploads/1699867879319/icon_guanbi%402x.png" class="close" @click="$emit('close')" />
  </div>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      default: '1040rpx'
    },
    show: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      shadow: true,
      clientHeight: 0
    }
  },
  watch: {
    show: {
      handler(value) {
        console.log('!!!!', value)
        if (value && !this.clientHeight) {
          setTimeout(() => {
            this.getScrollViewHeight()
          }, 500)
        }
      },
      immidiate: true,
      deep: true
    }
  },
  mounted() {},
  methods: {
    async getScrollViewHeight() {
      return new Promise((resolve) => {
        const query = uni.createSelectorQuery().in(this)
        query
          .select('.wrapper')
          .boundingClientRect((res) => {
            if (res) {
              this.clientHeight = res.height
            }
            resolve(res)
          })
          .exec()
      })
    },
    onScrolling(e) {
      const { scrollTop, scrollHeight } = e.detail

      if (scrollTop + this.clientHeight >= scrollHeight - 50) {
        this.shadow = false
      } else {
        this.shadow = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  .wrapper {
    position: relative;
    background: white;
    border-radius: 32rpx;
    .shadow {
      position: absolute;
      bottom: 0;
      left: 0;
      z-index: 2;
      width: 640rpx !important;
      height: 40rpx !important;
    }
  }
  .close {
    display: flex;
    align-items: center;
    width: 66rpx;
    height: 64rpx;
    margin: 32rpx auto 0;
  }
}
</style>
