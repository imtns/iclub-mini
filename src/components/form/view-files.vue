<template>
  <!--图片、视频查看-->
  <uni-grid :column="column" :show-border="false" :square="false" class="view-files">
    <view v-for="(item, index) in fileList" :key="index" class="file-item">
      <image v-if="isImage(item)" mode="aspectFill" :src="item" @click="previewFile(index)"></image>
      <video v-else-if="isVideo(item)" :src="item" controls @error="videoErrorCallback"></video>
    </view>
  </uni-grid>
</template>

<script>
export default {
  name: 'view-files',
  props: {
    column: {
      type: Number,
      default: 3
    },
    inputValue: {
      type: [String, Array],
      default: () => []
    }
  },
  data() {
    return {
      fileList: [],
      videoExt: ['.mp4', '.rmvb', '.m3u8', '.3gp'],
      imageExt: ['.png', '.jpg', '.jpeg', '.bmp', '.gif', '.webp', '.svg']
    }
  },
  watch: {
    inputValue: {
      handler(val) {
        this.setDefaultValue(val)
      },
      immediate: true
    }
  },
  methods: {
    // 值设置
    setDefaultValue(val) {
      if (!val) {
        this.fileList = []
        return
      }

      const arr = typeof val === 'string' ? val.split(',') : val

      this.fileList = arr.filter(i => {
        return this.isImage(i) || this.isVideo(i)
      })
    },

    // 后缀
    getSuffix(dom) {
      const index = dom.lastIndexOf('.')

      return dom.substring(index).toLowerCase()
    },

    // 是否是图片
    isImage(str) {
      return this.imageExt.includes(this.getSuffix(str))
    },

    // 是否是视频
    isVideo(str) {
      return this.videoExt.includes(this.getSuffix(str))
    },

    // 是否包含视频
    hasVideo() {
      return this.fileList.filter(i => this.isVideo(i)).length !== 0
    },

    // 预览
    previewFile(index) {
      // 图片和视频同时存在
      if (this.hasVideo() && wx.canIUse('previewMedia')) {
        const list = [].concat(this.fileList)
        wx.previewMedia({
          current: index,
          sources: list.map((url, index) => ({
            url: url,
            type: this.isImage(url) ? 'image' : 'video', // 返回 image | video
            poster: this.fileList[index]
          }))
        })
        return
      }

      // 预览图片
      uni.previewImage({
        current: index,
        urls: this.fileList
      })
    },

    // 视频播放出错
    videoErrorCallback(err) {
      console.log('videoErrorCallback', err)
    }
  }
}
</script>

<style lang="scss" scoped>
  .view-files {
    .file-item {
      width: 160rpx;
      height: 160rpx;
      margin-top: 24rpx;

      &:not(:last-child) {
        margin-right: 24rpx;
      }

      image, video {
        width: 100%;
        height: 100%;
        border-radius: 32rpx;
      }
    }
  }
</style>
