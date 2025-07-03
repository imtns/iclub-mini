<template>
  <uni-transition :show="show" :duration="duration" @click="clickHandler">
    <div class="u-overlay">
      <slot />
    </div>
  </uni-transition>
</template>

<script>
/**
 * overlay 遮罩
 * @description 创建一个遮罩层，用于强调特定的页面元素，并阻止用户对遮罩下层的内容进行操作，一般用于弹窗场景
 * @tutorial https://www.uviewui.com/components/overlay.html
 * @property {Boolean}			show		是否显示遮罩（默认 false ）
 * @property {String | Number}	zIndex		zIndex 层级（默认 10070 ）
 * @property {String | Number}	duration	动画时长，单位毫秒（默认 300 ）
 * @property {String | Number}	opacity		不透明度值，当做rgba的第四个参数 （默认 0.5 ）
 * @property {Object}			customStyle	定义需要用到的外部样式
 * @event {Function} click 点击遮罩发送事件
 * @example <u-overlay :show="show" @click="show = false"></u-overlay>
 */
export default {
  name: 'u-overlay',
  props: {
    // 是否显示遮罩
    show: {
      type: Boolean,
      default: false
    },
    // 层级z-index
    zIndex: {
      type: [String, Number],
      default: 99999
    },
    // 遮罩的过渡时间，单位为ms
    duration: {
      type: [String, Number],
      default: 300
    },
    // 不透明度值，当做rgba的第四个参数
    opacity: {
      type: [String, Number],
      default: 0
    }
  },
  computed: {},
  methods: {
    clickHandler() {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
/* @import '../../libs/css/components.scss'; */
$u-overlay-top: 0;
$u-overlay-left: 0;
$u-overlay-width: 100%;
$u-overlay-height: 100%;
$u-overlay-background-color: rgba(0, 0, 0, 0%);
.u-overlay {
  position: fixed;
  top: $u-overlay-top;
  left: $u-overlay-left;
  width: $u-overlay-width;
  height: $u-overlay-height;
  pointer-events: none;
  /* background-color: $u-overlay-background-color; */
  @include flex-center;
}
</style>
