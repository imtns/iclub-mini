<template name="regionPicker">
  <view class="region-list" :class="{ 'region-list--flat': flat }">
    <view v-if="!onlySlot" class="item">所在城市</view>

    <picker class="picker" mode="multiSelector" :range="range" :value="dataValue" :disabled="disabled" @change="regionChange" @columnchange="regionChangeCol" @cancel="regionCancel">
      <slot></slot>
      <view v-if="!onlySlot" class="itemName">{{ address ? address : disabled ? '' : '请选择' }}</view>
    </picker>

    <view v-if="!onlySlot"><image v-if="!disabled" style="width: 32rpx; height: 32rpx" src="https://udstatic.imeik.com/pcUploads/1651050347935_wode_icon_right%402x" /></view>
  </view>
</template>

<script>
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
    onlySlot: Boolean,
    // 扁平模式：去掉自带下划线/行高/内边距，由外层容器控制布局
    flat: Boolean
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
    ...mapState({
      cityTree: state => state.location.cityTree
    })
  },
  watch: {
    inputValue: {
      handler(nv, ov) {
        console.log('🚀 ~ handler ~ nv:', nv)
        if (JSON.stringify(nv) !== JSON.stringify(ov) && nv) {
          this.valueFormat()
          this.rangeSet()
          this.regionChange({ detail: { value: this.dataValue } })
        }
      },
      immediate: true
    },
    cityTree: {
      handler(value) {
        console.log('city-tree-value:', value)
        if (Object.keys(value).length > 0) {
          const treeCopy = JSON.parse(JSON.stringify(value))
          if (this.allowEmpty) {
            treeCopy.unshift({
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
          this.zonesTree = treeCopy
          this.valueFormat()
          this.rangeSet()
          if (this.dataValue.length && !this.allowEmpty) {
            this.regionChange({ detail: { value: this.dataValue } })
          }
        }
      },
      immediate: true
    }
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
      // dataValue 可能为空数组，兜底取 0，保证首次打开就渲染出市/区子列
      const d0 = this.dataValue[0] || 0
      const d1 = this.dataValue[1] || 0
      this.zonesTree.forEach((sv, si) => {
        zonesAry[0].push(sv.name)
        if (si === d0) {
          sv.subRegin.forEach((cv, ci) => {
            zonesAry[1].push(cv.name)
            if (this.depth === 3) {
              if (ci === d1) {
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

      const safeV = [v[0], this.dataValue[0] !== v[0] ? 0 : v[1], this.dataValue[0] !== v[0] || this.dataValue[1] !== v[1] ? 0 : v[2]]

      const value = []
      const code = []
      let data = {}

      const sv = this.zonesTree[safeV[0]]
      if (sv) {
        value.push(sv?.name)
        code.push(sv?.code)
        data = JSON.parse(JSON.stringify(sv))
        let cv
        if (sv?.subRegin.length) {
          cv = sv.subRegin[safeV[1]]
          value.push(cv?.name)
          code.push(cv?.code)
          data = JSON.parse(JSON.stringify(cv))
        }

        if (this.depth === 3 && cv?.subRegin?.length && cv?.subRegin[safeV[2]]) {
          const zv = cv.subRegin[safeV[2]]
          value.push(zv?.name)
          code.push(zv?.code)
          data = JSON.parse(JSON.stringify(zv))
        }

        e.detail = { code, value, data }
        this.address = sv.name + ',' + data.name
        this.addressCode = data.code

        // 关键：用 safeV 更新 dataValue 并刷新 range
        this.dataValue = [...safeV]
        this.rangeSet()
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
.region-list.region-list--flat {
  display: block;
  padding-bottom: 0;
  line-height: normal;
  border-bottom: none;

  .picker {
    display: block;
    width: 100%;
  }
}

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
