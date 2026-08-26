<template>
  <view>
    <view v-if="!hidePainter" class="ik-painter">
      <canvas :id="canvasId" :canvas-id="canvasId" :style="canvasStyle" :width="boardWidth * dpr" :height="boardHeight * dpr"></canvas>
    </view>
    <x-toast ref="toast" />
  </view>
</template>

<script>
import { toPx, getTextStart, getMultiTextStart } from './helper'
export default {
  name: 'painter',
  props: {
    canvasId: {
      type: String,
      default: () => 'ikPainter' + Math.random().toString(16).substring(2)
    }
  },
  data() {
    return {
      canvasWidth: '750rpx',
      canvasHeight: '600rpx',
      hidePainter: false
    }
  },
  computed: {
    canvasStyle() {
      if (this.boardWidth && this.boardHeight) {
        return `width:${this.boardWidth}px; height: ${this.boardHeight}px;`
      }
      return ''
    },
    dpr() {
      return this.pixelRatio || uni.getSystemInfoSync().pixelRatio
    },
    boardWidth() {
      return toPx(this.canvasWidth)
    },
    boardHeight() {
      return toPx(this.canvasHeight)
    }
  },
  methods: {
    getNetWorkImage(src) {
      return new Promise((resolve, reject) => {
        uni.getImageInfo({
          src: src,
          success: (res) => {
            resolve(res)
          },
          fail: (err) => {
            console.log('failfailfailfail', err)
            reject(err)
          }
        })
      })
    },
    formatConfig(conf) {
      const { css } = conf
      this.canvasWidth = (css && css.width) || '750rpx'
      this.canvasHeight = (css && css.height) || '600rpx'

      return conf
    },
    async render(conf) {
      conf = this.formatConfig(conf)
      const { views } = conf
      if (!views || !views.length) {
        return
      }

      setTimeout(() => {
        uni.showLoading({ title: '保存中...', mask: true })
      }, 200)
      const imgObj = {}
      let imgs = views.filter((i) => i.type === 'image').map((i) => i.src)
      imgs = [...new Set(imgs)] // url去重 - 优化
      if (imgs && imgs.length) {
        Promise.all(imgs.map((i) => this.getNetWorkImage(i)))
          .then((arr) => {
            const heights = []
            const bw = toPx(this.canvasWidth)
            const bh = toPx(this.canvasHeight)
            arr.map((item, index) => {
              imgObj[imgs[index]] = item
              heights.push((item.height / item.width) * bw)
              return item
            })
            this.canvasHeight = Math.max(bh, ...heights)

            this.hidePainter = false
            this.$nextTick(() => {
              this.drawPainter(conf, imgObj)
            })
          })
          .catch((e) => {
            console.error(e)
            uni.hideLoading()
          })
      } else {
        this.hidePainter = false
        this.$nextTick(() => {
          this.drawPainter(conf, {})
        })
      }
    },
    drawPainter(conf, imgObj) {
      const that = this
      const ctx = uni.createCanvasContext(this.canvasId, this)

      const { views } = conf
      for (let i = 0; i < views.length; i++) {
        const { type, css, children } = views[i]
        switch (type) {
          case 'text':
            if (!children || !children.length) {
              const fw = css.fontWeight || '400'
              const fs = toPx(css.fontSize || '24rpx') + 'px'
              const ff = css.fontFamily || 'PingFangSC-Regular, PingFang SC'

              ctx.setFillStyle(css.color)
              ctx.font = [fw, fs, ff].join(' ')

              const left = getTextStart(css, views[i], ctx)
              ctx.fillText(views[i].text, left, toPx(css.top) + toPx(fs))
            } else {
              children.forEach((item, index) => {
                const style = item.css
                const fwItem = style.fontWeight || '400'
                const fsItem = toPx(style.fontSize || '24rpx') + 'px'
                const ffItem = style.fontFamily || 'PingFangSC-Regular, PingFang SC'

                ctx.setFillStyle(style.color)
                ctx.font = [fwItem, fsItem, ffItem].join(' ')

                const starts = getMultiTextStart(style, children, ctx)
                ctx.fillText(item.text, starts[index], toPx(style.top) + toPx(fsItem))
              })
            }
            break
          case 'image':
            const img = imgObj[views[i].src]
            const x = toPx(css.left || 0)
            const y = toPx(css.top || 0)
            const ratio = img.width / this.boardWidth // 图片与canvas的比
            const w = (css.width && toPx(css.width)) || (ratio > 1 ? img.width / ratio : img.width)
            const h = (css.height && toPx(css.height)) || (ratio > 1 ? img.height / ratio : img.height)

            const isRound = css.borderRadius === '50%' // 圆形
            if (!isRound) {
              ctx.drawImage(img.path, x, y, w, h)
            } else {
              ctx.save()
              ctx.beginPath()
              ctx.arc(x + w / 2, y + w / 2, w / 2, 0, Math.PI * 2, false)
              // ctx.setStrokeStyle('#fff')
              // ctx.lineWidth = 4
              // ctx.stroke()
              ctx.clip()
              ctx.drawImage(img.path, x, y, w, h)
              ctx.restore()
            }
            break
        }
      }

      ctx.draw(false, () => {
        that.saveCanvas()
      })
    },
    saveCanvas() {
      const that = this

      uni.canvasToTempFilePath(
        {
          canvasId: that.canvasId,
          fileType: 'png',
          pathType: 'url',
          quality: 1,
          success(res) {
            uni.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success: () => {
                setTimeout(() => {
                  that.$refs.toast.show({
                    message: '保存成功',
                    duration: 2000
                  })
                  // uni.showToast({
                  //   title: '保存成功',
                  //   duration: 3000,
                  //   icon: 'none'
                  // })
                }, 100)
                uni.hideLoading()
                that.hidePainter = true
              },
              fail: (err) => {
                console.error(err)
                that.$refs.toast.show({
                  message: '保存失败',
                  duration: 2000
                })
                uni.hideLoading()
              }
            })
          },
          fail: (err) => {
            console.error(err)
            uni.hideLoading()
          }
        },
        that
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.ik-painter {
  position: fixed;
  bottom: -9999px;
  left: -9999px;
}
</style>
