<template>
  <view class="watermark-container" :style="{ width: containerWidth + 'px', height: containerHeight + 'px' }">
    <view
      v-for="(item, index) in watermarkList"
      :key="index"
      class="watermark-item"
      :style="{
        left: item.x + 'px',
        top: item.y + 'px',
        transform: `rotate(${rotateDeg}deg)`,
        color: color,
        fontSize: fontSize + 'px',
        opacity: opacity
      }"
    >
      {{ text }}
    </view>
  </view>
</template>

<script>
export default {
  name: 'Watermark',
  props: {
    text: {
      type: String,
      default: '爱美客'
    },
    color: {
      type: String,
      default: '#000000'
    },
    fontSize: {
      type: Number,
      default: 20
    },
    rotateDeg: {
      type: Number,
      default: -45
    },
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 500
    },
    opacity: {
      type: Number,
      default: 0.3
    }
  },
  data() {
    return {
      watermarkList: [],
      containerWidth: this.width,
      containerHeight: this.height,
      timer: null
    }
  },
  mounted() {
    this.calculateWatermarkPositions()
  },

  methods: {
    calculateWatermarkPositions() {
      const spacingX = 150
      const spacingY = 100
      const list = []

      for (let x = 0; x < this.containerWidth; x += spacingX) {
        for (let y = 0; y < this.containerHeight; y += spacingY) {
          list.push({
            x: x + Math.random() * 20 - 10,
            y: y + Math.random() * 20 - 10
          })
        }
      }
      this.watermarkList = list
    }
  }
}
</script>

<style scoped>
.watermark-container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  pointer-events: none;
}

.watermark-item {
  position: absolute;
  white-space: nowrap;
}
</style>
