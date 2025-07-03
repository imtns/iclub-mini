<template>
  <view class="x-uploader">
    <view class="x-uploader__wrapper" :style="{ 'grid-template-columns': `repeat(${previewColumn},${previewSize}rpx)`, gap: previewGap + 'rpx' }">
      <!-- 预览样式 -->
      <view v-for="(item, index) in lists" v-if="previewImage" :key="index" class="x-uploader__preview" data-index="index" :style="{ borderRadius: radius }">
        <view style="position: relative">
          <image
            mode="aspectFill"
            :src="`${item.url}?x-oss-process=image/resize,m_mfit,w_${previewSize}`"
            class="x-uploader__preview-image"
            :style="{ width: previewSize + 'rpx', height: previewSize + 'rpx', borderRadius: radius }"
            @click="onPreviewImage(index)"
          />
          <image
            v-if="item.audit === 0"
            style="position: absolute; top: 50%; left: 50%; width: 41px; height: 37px; transform: translate(-50%, -50%)"
            src="https://assets.speedomes.com/promotion/pic-audit-big.png"
          />
          <!-- <view class="x-uploader__preview-image-text">{{ item.index }}/{{ maxCount < lists.length ? lists.length : maxCount }}</view> -->
        </view>
        <view v-if="item.status === 'uploading' || item.status === 'failed'" class="x-uploader__mask" :style="{ borderRadius: radius }">
          <uni-icons v-if="item.status === 'failed'" type="closeempty" class="x-uploader__mask-icon" />
          <uni-icons v-else type="spinner-cycle" size="22" class="x-uploader__loading" color="white" />
          <text v-if="item.message && showText" class="x-uploader__mask-message">{{ item.message }}</text>
        </view>
        <view v-if="deletable && item.deletable" data-index="index" class="x-uploader__preview-delete" @click.stop="deleteItem(index)">
          <!-- <uni-icons type="closeempty" class="x-uploader__preview-delete-icon" color="white" /> -->
          <image src="https://imeikud.oss-cn-beijing.aliyuncs.com/pcUploads/1701338940500/close%402x.png" class="delete-image" mode="aspectFill" />
        </view>
      </view>

      <!-- 上传样式 -->
      <template v-if="((isInCount && !disabled) || disabled) && showUpload">
        <!-- <view class="x-uploader__slot" @click="startUpload">
          <slot />
        </view> -->

        <!-- 默认上传样式 -->
        <view :class="['x-uploader__upload', disabled ? 'x-uploader__upload--disabled' : '']" :style="{ width: previewSize + 'rpx', height: previewSize + 'rpx' }" @click="startUpload">
          <!-- <image src="https://udstatic.imeik.com/pcUploads/1699005891565/%E7%BC%96%E7%BB%84%402x.png" class="x-uploader__upload-icon" />
          <text v-if="uploadText" class="x-uploader__upload-text">{{ uploadText }}</text> -->
          <image :src="uploadIcon" />
        </view>
      </template>
    </view>
    <x-toast ref="toast" />
  </view>
</template>

<script>
import { isPromise, isImageFile, chooseFile } from './utils/upload'
import { ls } from '@/utils/util'
export default {
  props: {
    isDelay: Boolean,
    disabled: Boolean,
    multiple: Boolean,
    showText: {
      type: Boolean,
      default: true
    },
    uploadText: {
      type: String,
      default: '上传照片'
    },
    useBeforeRead: Boolean,
    uploadIcon: {
      type: String,
      default: 'https://imeikud.oss-cn-beijing.aliyuncs.com/pcUploads/1706670226639/ziliao_Impor%402x%20(1).png'
    },
    afterRead: null,
    beforeRead: null,
    previewColumn: {
      type: Number,
      default: 4
    },
    radius: {
      type: String,
      default: '32rpx'
    },
    previewGap: {
      type: Number,
      default: 10
    },
    previewSize: {
      type: null,
      default: 142
    },
    name: {
      type: null,
      default: ''
    },
    accept: {
      type: String,
      default: 'image'
    },
    filelist: {
      type: Array,
      default() {
        return []
      }
    },
    maxSize: {
      type: Number,
      default: 5
    },
    maxCount: {
      type: Number,
      default: 20
    },
    deletable: {
      type: Boolean,
      default: true
    },
    showUpload: {
      type: Boolean,
      default: true
    },
    previewImage: {
      type: Boolean,
      default: true
    },
    previewFullImage: {
      type: Boolean,
      default: true
    },
    imageFit: {
      type: String,
      default: 'scaleToFill'
    },
    sizeType: {
      type: Array,
      default() {
        return ['original', 'compressed']
      }
    },
    capture: {
      type: Array,
      default() {
        return ['album', 'camera']
      }
    }
  },
  data() {
    return {
      lists: [],
      isInCount: true
    }
  },
  watch: {
    maxCount: {
      handler(v) {
        this.isInCount = this.filelist.length < v
      },
      immediate: true,
      deep: true
    },

    filelist: {
      handler(filelist = []) {
        const lists = filelist.map((item) =>
          Object.assign(Object.assign({}, item), {
            isImage: isImageFile(item),
            audit: item.audit,
            deletable: typeof item.deletable === 'boolean' ? item.deletable : true
          })
        )
        this.lists = lists
        this.isInCount = lists.length < this.maxCount
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    sizeStyle(data) {
      function addUnit(value) {
        // eslint-disable-next-line no-useless-escape
        const REGEXP = getRegExp('^-?\d+(\.\d+)?$')
        if (value == null) {
          return undefined
        }
        return REGEXP.test('' + value) ? value + 'px' : value
      }
      return {
        width: addUnit(data.previewSize),
        height: addUnit(data.previewSize)
      }
    },

    getDetail(index) {
      return {
        name: this.name,
        index: index == null ? this.filelist.length : index
      }
    },
    startUpload() {
      if (this.disabled) {
        this.$emit('disabled')
        return
      }
      const maxCount = this.maxCount - this.lists.length
      console.log('maxCount', maxCount)
      const systemInfo = uni.getSystemInfoSync()
      const isAndroid = systemInfo.platform === 'android'

      const executeUpload = () => {
        chooseFile(this.multiple, this.capture, this.sizeType, maxCount)
          .then((res) => {
            this.onBeforeRead(this.multiple ? res : res[0])
          })
          .catch((error) => {
            this.$emit('error', error)
          })
      }
      // 安卓机在有输入框键盘弹出来的情况下，wx.chooseMedia的弹窗会有样式bug，需要300ms延时等待键盘收回后再弹出
      if (isAndroid && this.isDelay) {
        setTimeout(executeUpload, 300)
      } else {
        executeUpload()
      }
    },
    onBeforeRead(file) {
      const { beforeRead, useBeforeRead } = this
      let res = true
      if (typeof beforeRead === 'function') {
        res = beforeRead(file, this.getDetail())
      }
      if (useBeforeRead) {
        res = new Promise((resolve, reject) => {
          this.$emit(
            'beforeread',
            Object.assign(Object.assign({ file }, this.getDetail()), {
              callback: (ok) => {
                ok ? resolve() : reject()
              }
            })
          )
        })
      }
      if (!res) {
        return
      }
      if (isPromise(res)) {
        res.then((data) => this.onAfterRead(data || file))
      } else {
        this.onAfterRead(file)
      }
    },
    onAfterRead(file) {
      function getFileMB(size) {
        return size / 1000 / 1000
      }
      const oversize = Array.isArray(file) ? file.some((item) => getFileMB(item.size) > this.maxSize) : getFileMB(file.size) > this.maxSize
      if (this.multiple) {
        const originLength = file.length
        // 把大于maxSize的图片剔除出去
        file = file.filter((item) => getFileMB(item.size) < this.maxSize)
        if (oversize) {
          this.$emit('oversize', Object.assign({ file }, this.getDetail()), { total: originLength, left: originLength - file.length })
        }
      } else if (oversize) {
        this.$refs.toast.show({
          message: `图片不能超过${this.maxSize}MB`
        })
        this.$emit('oversize', Object.assign({ file }, this.getDetail()))
        return
      }
      if (typeof this.afterRead === 'function') {
        this.afterRead(file, this.getDetail())
      }
      this.$emit('afterread', Object.assign({ file }, this.getDetail()))
    },
    deleteItem(index) {
      this.$emit('delete', index)
    },
    onPreviewImage(index) {
      if (!this.previewFullImage) return
      const item = this.lists[index]
      ls('preview', 1)
      wx.previewImage({
        urls: this.lists.filter((item) => isImageFile(item)).map((item) => item.url),
        current: item.url,
        fail() {
          wx.showToast({ title: '预览图片失败', icon: 'none', duration: 2000 })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.x-clearfix::after {
  display: table;
  clear: both;
  content: '';
}
.x-uploader {
  position: relative;

  &__wrapper {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: repeat(4, 142rpx);
  }
  &__slot:empty {
    display: none;
  }
  &__slot:not(:empty) + &__upload {
    display: none !important;
  }
  &__upload {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: 142rpx;
    height: 142rpx;
    /* margin: 0 8px 8px 0; */
    /* background-color: #edf6ff; */
    /* &::after {
      width: 138rpx;
      height: 138rpx;
      border: 1px solid #4a9dea;
      border-radius: 3rpx;
      content: '';
      @include position-center;
    } */
    > image {
      width: 100%;
      height: 100%;
    }
  }
  &__upload:active {
    background-color: #edf6ff;
  }
  &__upload-icon {
    width: 34rpx;
    height: 34rpx;
  }
  &__upload-text {
    margin-top: 8px;
    color: #000;
    font-size: 24rpx;
  }
  &__upload--disabled {
    opacity: 0.5;
  }
  &__preview {
    position: relative;
    cursor: pointer;
  }
  &__preview-image {
    display: block;
    overflow: hidden;
  }
  &__preview-delete,
  &__preview-delete::after {
    position: absolute;
    top: -10rpx;
    right: -8rpx;
    z-index: 10;
    width: 16px;
    height: 16px;
  }
  .delete-image {
    width: 16px;
    height: 16px;
    padding: 4rpx;
  }
  /* &__preview-delete::after {
    background-color: rgba(0, 0, 0, 70%);
    border-radius: 0 0 0 12px;
    content: '';
  } */
  &__preview-delete-icon {
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1;
    color: #fff;
    font-size: 16px;
    transform: scale(0.8) translate(10%, -10%);
  }
  &__file {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80px;
    height: 80px;
    background-color: #f7f8fa;
  }
  &__file-icon {
    color: #646566;
    font-size: 20px;
  }
  &__file-name {
    box-sizing: border-box;
    width: 100%;
    margin-top: 8px;
    padding: 0 4px;
    color: #646566;
    font-size: 12px;
    text-align: center;
  }
  &__mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #fff;
    background-color: rgba(50, 50, 51, 88%);
  }
  &__mask-icon {
    font-size: 22px;
  }
  &__mask-message {
    margin-top: 6px;
    padding: 0 4px;
    font-size: 12px;
    line-height: 14px;
  }
  &__loading {
    color: #fff !important;
    @keyframes rotate-animation {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }

    animation: rotate-animation 1s linear infinite;
  }
  &__preview-image-text {
    position: absolute;
    bottom: 0;
    left: 0;
    display: inline-flex;
    align-items: center;
    padding: 0 6px 0 8px;
    color: white;
    font-size: 10px;
    background: rgba(0, 0, 0, 60%);
    border-radius: 0rpx 32rpx;
  }
}
</style>
