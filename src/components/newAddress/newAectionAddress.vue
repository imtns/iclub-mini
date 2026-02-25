<template name="regionPicker">
  <view class="region-list">
    <view v-if="!onlySlot" class="item">所在城市</view>

    <picker class="picker" mode="multiSelector" :range="range" :value="dataValue" :disabled="disabled" @change="regionChange" @columnchange="regionChangeCol" @cancel="regionCancel">
      <slot></slot>
      <view v-if="!onlySlot" class="itemName">{{ address ? address : disabled ? '' : '请选择' }}</view>
    </picker>

    <view v-if="!onlySlot">
      <image v-if="!disabled" style="width: 32rpx; height: 32rpx" src="https://udstatic.imeik.com/pcUploads/1651050347935_wode_icon_right%402x" />
    </view>
  </view>
</template>

<script>
import { provinceAndCityData } from 'element-china-area-data'

export default {
  name: 'regionPicker',
  behaviors: ['uni://form-field'], // 目前仅支持 微信小程序、QQ小程序、百度小程序、h5。
  props: {
    inputValue: {
      type: [Array, String, Number],
      default: () => [0, 0, 0]
    },
    disabled: {
      type: Boolean,
      default: false
    },
    // 层级，默认为2，只到省市
    depth: {
      type: Number,
      default: 2
    },
    onlySlot: Boolean
  },
  data() {
    return {
      range: [],
      dataValue: [],
      zonesTree: provinceAndCityData,
      address: ''
    }
  },
  watch: {
    inputValue(nv, ov) {
      if (JSON.stringify(nv) !== JSON.stringify(ov)) {
        this.valueFormat()
        this.rangeSet()
        this.regionChange({ detail: { value: this.dataValue } })
      }
    }
  },
  mounted() {
    this.valueFormat()
    this.rangeSet()
    this.regionChange({ detail: { value: this.dataValue } })
  },
  methods: {
    valueFormat(type) {
      let value = this.inputValue || ''

      // 最后一级
      if (typeof value == 'number') {
        value = value + ''
      }

      // 拆分成数组
      if (typeof value == 'string' && value.indexOf(',') > 0) {
        value = value.split(',')
      }

      let sk = 0
      const ck = 0
      const zk = 0

      if (typeof value == 'string') {
        console.log('zonesTree', this.zonesTree)
        this.zonesTree.forEach((sv, si) => {})

        this.dataValue = [sk, ck, zk]
      } else if (typeof value[0] == 'string' || value[0] > 999) {
        this.zonesTree.forEach((sv, si) => {
          if (sv.value === value[0]) {
            sk = si
          }
        })

        this.dataValue = [sk, ck, zk]
      } else {
        this.dataValue = value
      }
    },

    rangeSet() {
      const zonesAry = this.depth === 3 ? [[], [], []] : [[], []]
      this.zonesTree.forEach((sv, si) => {
        zonesAry[0].push(sv.label)
        if (si === this.dataValue[0]) {
          sv.children.forEach((cv, ci) => {
            zonesAry[1].push(cv.label)
          })
        }
      })

      this.range = zonesAry
      console.log('range', this.range)
    },

    regionChange(e) {
      console.log('e.detail', e.detail)
      const v = e.detail.value
      const value = []
      const code = []
      const data = []

      // 省
      const sv = this.zonesTree[v[0]]
      value.push(sv.label)
      code.push(sv.value)
      data.push(JSON.parse(JSON.stringify(sv)))
      // 市
      if (sv.children.length) {
        const cv = sv.children[v[1]]
        value.push(cv.label)
        code.push(cv.value)
        data.push(JSON.parse(JSON.stringify(cv)))
      }

      e.detail = { code: code, value: value, data: data }
      this.address = sv.label + ',' + data.name
      this.addressCode = data.value
      this.$emit('change', this.address)
      this.$emit('GetKye', this.addressCode)
      this.$emit('data', data)
    },

    regionChangeCol(e) {
      if (e.detail.column === 0) {
        this.dataValue[1] = 0
        this.dataValue[2] = 0
      }

      if (e.detail.column === 1) {
        this.dataValue[2] = 0
      }

      this.dataValue[e.detail.column] = e.detail.value
      this.rangeSet()

      this.$emit('columnchange', e)
    },

    regionCancel(e) {
      this.$emit('cancel', e)
    }
  }
}
</script>

<style lang="scss">
.region-list {
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  align-items: center;
  box-sizing: border-box;
  padding-bottom: 16rpx;
  line-height: 96rpx;
  border-bottom: 2rpx #eee solid;

  .item {
    display: inline-block;
    justify-content: flex-start;
    width: 220px;
    color: #29323d;
    font-size: 30rpx;
  }

  .picker {
    display: inline-block;
    width: 100%;
  }

  .itemName {
    display: inline-block;
    height: 42rpx;
    color: #5a6067;
    font-weight: 400;
    font-size: 30rpx;
    font-family: PingFangSC-Regular, 'PingFang SC';
    line-height: 42rpx;
  }
}
</style>
