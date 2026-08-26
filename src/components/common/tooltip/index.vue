<template>
  <view
    class="zb-tooltip"
    :style="{
      width: '100%',
      '--theme-bg-color': color
    }"
  >
    <view class="zb_tooltip_content" @longpress="handleClick">
      <slot></slot>
      <view
        class="zb_tooltip__popper"
        :style="[
          style,
          {
            visibility: isShow ? 'visible' : 'hidden',
            color: color === 'white' ? '' : '#fff',
            boxShadow: color === 'white' ? '0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d' : ''
          }
        ]"
      >
        <slot name="content">{{ content }}</slot>
        <view
          class="zb_popper__icon"
          :style="[arrowStyle]"
          :class="[
            {
              zb_popper__up: placement.indexOf('bottom') === 0,
              zb_popper__arrow: placement.indexOf('top') === 0,
              zb_popper__right: placement.indexOf('right') === 0,
              zb_popper__left: placement.indexOf('left') === 0
            }
          ]"
        >
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    isSelf: Boolean,
    color: {
      type: String,
      default: '#303133'
    },
    placement: {
      type: String,
      default: 'top'
    },
    content: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    },
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },

  data() {
    return {
      isShow: this.visible,
      title: 'Hello',
      arrowLeft: 0,
      query: null,
      style: {},
      arrowStyle: {}
    }
  },
  onLoad() {},
  watch: {
    isShow: {
      handler(val) {
        this.$emit('update:visible', val)
      },
      immediate: true
    },
    visible: {
      handler(val) {
        this.isShow = val
        if (val) {
          console.log('item', this.item)
          this.$nextTick(() => {
            this.handleClick()
          })
        }
      },
      immediate: true
    }
  },
  mounted() {
    // #ifdef H5
    window.addEventListener('click', () => {
      this.isShow = false
    })

    // #endif
  },
  methods: {
    close() {
      this.isShow = false
    },
    fixedWrap() {
      this.isShow = false
    },
    handleClick() {
      console.log('🚀 ~ handleClick ~ isSelf:', this.isSelf)
      // if (!this.isSelf) return
      uni
        .createSelectorQuery()
        .in(this)
        .selectAll('.zb_tooltip_content,.zb_tooltip__popper')
        .boundingClientRect(async (data) => {
          // const { left, bottom, right, top, width, height } = data[0]
          const { width, height } = data[0]
          const obj1 = data[1]

          const objStyle = {}
          const objStyle1 = {}
          switch (this.placement) {
            case 'top':
              if (obj1.width > width) {
                objStyle.left = `-${(obj1.width - width) / 2}px`
              } else {
                objStyle.left = `${Math.abs(obj1.width - width) / 2}px`
              }

              objStyle.bottom = `${height + 8}px`
              objStyle1.left = obj1.width / 2 - 6 + 'px'

              break
            case 'top-start':
              objStyle.left = '0px'
              objStyle.bottom = `${height + 8}px`
              break

            case 'top-end':
              objStyle.right = '0px'
              objStyle.bottom = `${height + 8}px`
              objStyle1.right = '8px'
              break

            case 'bottom':
              if (obj1.width > width) {
                objStyle.left = `-${(obj1.width - width) / 2}px`
              } else {
                objStyle.left = `${Math.abs(obj1.width - width) / 2}px`
              }

              objStyle.top = `${height + 8}px`
              objStyle1.left = obj1.width / 2 - 6 + 'px'
              break

            case 'bottom-start':
              objStyle.left = '0px'
              objStyle.top = `${height + 8}px`
              objStyle1.left = '8px'
              break

            case 'bottom-end':
              objStyle.right = '0px'
              objStyle.top = `${height + 8}px`
              objStyle1.right = '8px'
              break

            case 'right':
              objStyle.left = `${width + 8}px`
              if (obj1.height > height) {
                objStyle.top = `-${(obj1.height - height) / 2}px`
              } else {
                objStyle.top = `${Math.abs((obj1.height - height) / 2)}px`
              }

              objStyle1.top = `${obj1.height / 2 - 6}px`
              break
            case 'right-start':
              objStyle.left = `${width + 8}px`
              objStyle.top = '0px'
              objStyle1.top = '8px'
              break

            case 'right-end':
              objStyle.left = `${width + 8}px`
              objStyle.bottom = '0px'
              objStyle1.bottom = '8px'
              break

            case 'left':
              objStyle.right = `${width + 8}px`

              if (obj1.height > height) {
                objStyle.top = `-${(obj1.height - height) / 2}px`
              } else {
                objStyle.top = `${Math.abs((obj1.height - height) / 2)}px`
              }

              objStyle1.top = `${obj1.height / 2 - 6}px`
              break

            case 'left-start':
              objStyle.right = `${width + 8}px`
              objStyle.top = '0px'
              objStyle1.top = '8px'
              break

            case 'left-end':
              objStyle.right = `${width + 8}px`
              objStyle.bottom = '0px'
              objStyle1.bottom = '8px'
              break
          }
          this.style = objStyle
          // 三角形箭头
          this.arrowStyle = objStyle1
          this.isShow = true
        })
        .exec()
      this.$emit('open')
    }
  }
}
</script>

<style lang="scss" scoped>
$theme-bg-color: var(--theme-bg-color);

.zb-tooltip {
  position: relative;
}
.zb_tooltip_content {
  /* float: left; */
  position: relative;
  display: inline-block;
  width: 100%;
  height: 100%;
  // display: flex;
  // flex-direction: row;
  // align-items: center;
  /* overflow: hidden; */
}
.zb_tooltip__popper {
  // color:'#fff';
  position: absolute;
  z-index: 9;
  display: inline-block;
  min-width: 10px;
  padding: 6px 2px;
  font-size: 12px;
  white-space: nowrap;
  word-wrap: break-word;
  /* transform-origin: center top; */
  background: $theme-bg-color;
  border-radius: 8px;
  visibility: hidden;
}
.zb_popper__icon {
  position: absolute;
  z-index: 9;
  width: 0;
  height: 0;
}
.zb_popper__arrow {
  bottom: -5px;
  border-top: 6px solid $theme-bg-color;
  border-right: 6px solid transparent;
  /* transform-origin: center top; */
  border-left: 6px solid transparent;
}
.zb_popper__right {
  left: -5px;
  border-top: 6px solid transparent;
  border-right: 6px solid $theme-bg-color;
  border-bottom: 6px solid transparent;
}

.zb_popper__left {
  right: -5px;
  border-top: 6px solid transparent;
  border-bottom: 6px solid transparent;
  border-left: 6px solid $theme-bg-color;
}

.zb_popper__up {
  top: -5px;
  border-right: 6px solid transparent;
  border-bottom: 6px solid $theme-bg-color;
  border-left: 6px solid transparent;
}
.fixed {
  position: absolute;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
  width: 100vw;
  height: 100vh;
  background: red;
  pointer-events: auto;
}
</style>
