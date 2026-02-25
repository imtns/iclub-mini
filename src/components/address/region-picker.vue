<template name="regionPicker">
  <view class="region-list">
    <view v-if="!onlySlot" class="item">所在城市</view>

    <picker class="picker" mode="multiSelector" :range="range" :value="dataValue" :disabled="disabled" @change="regionChange" @columnchange="regionChangeCol" @cancel="regionCancel">
      <slot></slot>
      <view v-if="!onlySlot" class="itemName">{{ address ? address : disabled ? '' : '请选择' }}</view>
    </picker>

    <view v-if="!onlySlot"><image v-if="!disabled" style="width: 32rpx; height: 32rpx" src="https://udstatic.imeik.com/pcUploads/1651050347935_wode_icon_right%402x" /></view>
  </view>
</template>

<script>
// import { cityTree } from './region-picker.js'
import { mapState } from 'vuex'
export default {
  name: 'regionPicker',
  behaviors: ['uni://form-field'], // 目前仅支持 微信小程序、QQ小程序、百度小程序、h5。
  props: {
    inputValue: {
      type: [Array, String, Number],
      default: () => [0, 0, 0]
    },
    allowEmpty: Boolean,
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
      zonesTree: [],
      address: ''
    }
  },
  computed: {
    ...mapState(['cityTree'])
  },
  watch: {
    inputValue: {
      handler(nv, ov) {
        console.log('🚀 ~ handler ~ nv:', nv)
        if (JSON.stringify(nv) !== JSON.stringify(ov)) {
          this.valueFormat()
          this.rangeSet()
          this.regionChange({ detail: { value: this.dataValue } })
        }
      },
      immediate: true
    }
  },
  mounted() {
    // cityTree().then((res) => {
    const res = this.cityTree
    console.log('res', res)
    if (this.allowEmpty) {
      res.unshift({
        fullname: '全国',
        name: '全国',
        code: '',
        subRegin: [
          {
            fullname: '',
            name: '',
            code: '',
            subRegin: []
          }
        ]
      })
    }
    this.zonesTree = res
    this.valueFormat()
    this.rangeSet()
    this.regionChange({ detail: { value: this.dataValue } })
    // })
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
      let ck = 0
      let zk = 0
      if (typeof value == 'string') {
        this.zonesTree.forEach((sv, si) => {
          sv.subRegin.forEach((cv, ci) => {
            cv.subRegin.forEach((zv, zi) => {
              if (zv.code === value) {
                sk = si
                ck = ci
                zk = zi
              }
            })
          })
        })

        this.dataValue = [sk, ck, zk]
      } else if (typeof value[0] == 'string' || value[0] > 999) {
        this.zonesTree.forEach((sv, si) => {
          if (sv.code === value[0]) {
            sk = si
            sv.subRegin.forEach((cv, ci) => {
              if (cv.code === value[1]) {
                ck = ci
                cv.subRegin.forEach((zv, zi) => {
                  if (zv.code === value[2]) {
                    zk = zi
                  }
                })
              }
            })
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
        zonesAry[0].push(sv.name)
        if (si === this.dataValue[0]) {
          sv.subRegin.forEach((cv, ci) => {
            zonesAry[1].push(cv.name)
            if (this.depth === 3) {
              if (ci === this.dataValue[1]) {
                cv.subRegin.forEach((zv, zi) => {
                  zonesAry[2].push(zv.name)
                })
              }
            }
          })
        }
      })

      this.range = zonesAry
    },

    regionChange(e) {
      const v = e.detail.value
      const value = []
      const code = []
      let data = {}

      // 省
      const sv = this.zonesTree[v[0]]
      if (sv) {
        value.push(sv?.name)
        code.push(sv?.code)
        data = JSON.parse(JSON.stringify(sv))
        let cv
        // 市
        if (sv?.subRegin.length) {
          cv = sv.subRegin[v[1]]
          value.push(cv?.name)
          code.push(cv?.code)
          data = JSON.parse(JSON.stringify(cv))
        }

        // 区
        if (this.depth === 3 && cv?.subRegin?.length && cv?.subRegin[v[2]]) {
          const zv = cv.subRegin[v[2]]
          value.push(zv?.name)
          code.push(zv?.code)
          data = JSON.parse(JSON.stringify(zv))
        }
        e.detail = { code: code, value: value, data: data }
        this.address = sv.name + ',' + data.name
        this.addressCode = data.code
      }
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
