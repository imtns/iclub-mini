<template>
  <!-- 选择省市区 -->
  <view v-show="loadding" class="ik-form-item" :class="'ik-form-pos-' + (field.labelPosition || 'left')">
    <view class="flex-box">
      <view class="ik-form-row">
        <uni-forms-item ref="dfi" class="ik-form-wrap" :name="field.code">
          <!-- label插槽-->
          <view slot="label" class="label-text">
            <!-- 可以在form-item最顶部自己插入数据 -->
            <slot name="top"></slot>
            <view>{{ field.label }}</view>
            <!-- 提示信息 -->
            <view v-if="extra === 'top'" class="extraClass">
              {{ field.props.extra }}
            </view>
          </view>

          <!-- 查看状态 -->
          <form-view-item v-if="field.isView" :format-value="formatValue" :model="model" :field="field"></form-view-item>

          <!-- 编辑状态 -->
          <picker
            class="picker"
            mode="multiSelector"
            :placeholder="`请选择${field.label}`"
            :disabled="field.disabled || false"
            :range="range"
            :value="indexArray"
            @change="regionChange"
            @columnchange="regionChangeCol"
          >
            <slot></slot>
            <view class="itemName" :class="address ? '' : 'placeholder'" :style="{ fontSize: address && address.length > 10 ? '24rpx' : '30grpx' }">{{ address || '请选择' }}</view>
          </picker>
        </uni-forms-item>
      </view>
      <image v-if="!field.isView && field.labelPosition !== 'top'" class="narrow" src="https://udstatic.imeik.com/pcUploads/1695304988366/icon_jiantou%402x.png"></image>
    </view>

    <!-- 提示信息 -->
    <view v-if="extra === 'bottom'" class="extraClass">
      {{ field.props.extra }}
    </view>
  </view>
</template>

<script>
import { getCommonRules, getExtraPosition } from './util'
// import { cityTree } from '../address/region-picker.js'
import { mapState } from 'vuex'
export default {
  props: {
    // 初始值
    inputValue: {
      type: [Array, Number, String],
      default: () => []
    },
    // 配置项
    field: {
      type: Object,
      default: () => {}
    },
    // 绑定的model
    model: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      loadding: false,
      range: [], // 下拉框数据源
      zonesTree: [], // 省市区数据
      indexArray: [], // 选择的下表
      address: '' // 选择的地址
    }
  },
  computed: {
    ...mapState(['cityTree']),
    // 层级，默认为2，只到省市
    depth() {
      return (this.field.props && this.field.props.depth) || 2
    },

    extra() {
      return getExtraPosition(this.field)
    }
  },
  watch: {
    // 初始值监听
    inputValue: {
      handler(nv, ov) {
        if (JSON.stringify(nv) !== JSON.stringify(ov)) {
          this.getSelectedIndex()
          this.regionChange({
            detail: { value: this.indexArray }
          })
        }
      },
      immediate: true
    }
  },
  created() {
    this.setFieldRule()
  },
  mounted() {
    this.getTreeData()
  },
  methods: {
    // 校验规则
    setFieldRule() {
      const rules = getCommonRules(this.field)

      // emit到父组件 - 更新校验规则
      this.$emit('updateRules', this.field.code, rules)
    },

    // 获取省市区数据
    getTreeData() {
      // cityTree()
      //   .then((res) => {
      // console.error('🚀 ~ .then ~ res:', res)

      this.zonesTree = this.formatData(this.cityTree, 1)

      this.getSelectedIndex()
      this.rangeSet()

      this.regionChange({
        detail: { value: this.indexArray }
      })
      // })
      // .finally(() => {
      this.loadding = true
      // })
    },

    // 数据格式化
    formatData(tree, level) {
      for (let i = 0; i < tree.length; i++) {
        const item = tree[i]
        if (this.depth && this.depth === level) {
          delete item.subRegin
          continue
        }

        if (item.subRegin && item.subRegin.length === 0) {
          delete item.subRegin
        }

        if (item.subRegin && item.subRegin.length > 0) {
          this.formatData(item.subRegin, level + 1)
        }
      }

      return tree
    },

    // 格式化 indexArray
    getSelectedIndex() {
      let value = this.inputValue || []
      // let value = '340300'

      // 只传入最后一级
      if (typeof value === 'number') {
        value = [value + '']
      }

      // 如果传入的字符串，拆分成数组
      if (typeof value == 'string') {
        value = value.split(',')
      }

      // 找value里的最后一个元素对应的位置
      const lastCode = value[value.length - 1]
      if (lastCode && this.zonesTree.length) {
        let result = []

        const loop = (list, arr, step) => {
          for (let index = 0; index < list.length; index++) {
            const item = list[index]
            arr[step] = index
            if (item.code === lastCode) {
              result = [].concat(arr)
              return
            }
            if (item.subRegin && item.subRegin.length) {
              loop(item.subRegin, arr, step + 1)
            }
          }
        }
        loop(this.zonesTree, [], 0)

        this.indexArray = result
      }
    },

    // 根据层级展示picker的下拉数据
    rangeSet() {
      const zonesAry = Array.from({ length: this.depth }, () => [])
      zonesAry[0] = this.zonesTree.map((i) => i.name)

      const loop = (list, level) => {
        const index = this.indexArray[level - 1] || 0

        if (list[index] && list[index].subRegin) {
          zonesAry[level] = list[index].subRegin.map((i) => i.name)
          loop(list[index].subRegin, level + 1)
        }
      }
      loop(this.zonesTree, 1)

      this.range = zonesAry
    },

    // 选择
    regionChange(e) {
      let v = e.detail.value
      if (!v || !v.length) {
        return
      }

      const names = []
      const codes = []
      // 有时候会出现null的值，处理成0
      v = v.map((i) => i || 0)

      const loop = (list, level) => {
        const item = list[v[level]]
        names[level] = item.name
        codes[level] = item.code

        if (item && item.subRegin) {
          loop(item.subRegin, level + 1)
        }
      }
      loop(this.zonesTree, 0)

      this.address = names.join(' ')

      // 选择事件 - 需要通过emit来更新父组件的值
      const model = this.deepClone(this.model)

      model[this.field.code] = codes
      // 把地址对应的中文也返回去
      const key = this.field.nameKey || `${this.field.code}_fullname`
      model[key] = names.join(' ')

      this.$emit('update:model', model)
      this.$refs.dfi.clearValidate()
    },

    // 选择列
    regionChangeCol(e) {
      const column = e.detail.column

      // 清空下级选项
      this.indexArray.forEach((item, index) => {
        if (index > column) {
          this.indexArray[index] = 0
        }
      })

      this.indexArray[column] = e.detail.value

      this.rangeSet()
    },

    // 详情展示
    formatValue(model, field) {
      const val = model[field.code]

      return `${val}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
.flex-box {
  display: flex;
  align-items: center;
  border-bottom: 2rpx solid #eee;

  .ik-form-row {
    flex: 1;
    border: none;
  }
  .narrow {
    margin-bottom: 24rpx;
    margin-left: auto;
  }
}
.uni-input {
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.placeholder {
  color: #ccc;
}
.narrow {
  width: 24rpx;
  height: 26rpx;
}
</style>
