<template>
  <!-- select -->
  <view class="ik-form-item" :data-attr="field.dataAttr||''" :class="'ik-form-pos-'+(field.labelPosition||'left')">
    <view class="ik-form-row">
      <uni-forms-item ref="fsi" class="ik-form-wrap" :name="field.code">
        <!-- label插槽-->
        <view slot="label" class="label-text">
          <!-- 可以在form-item最顶部自己插入数据 -->
          <slot name="top"></slot>
          <view>{{ field.label }}<span v-if="field.label=='职务'" class="nore">（非必填）</span></view>
          <!-- 提示信息 -->
          <view v-if="extra==='top'" class="extraClass">
            {{ field.props.extra }}
          </view>
        </view>

        <!-- 查看状态 -->
        <form-view-item v-if="field.isView" :format-value="formatValue" :model="model" :field="field"></form-view-item>

        <!-- 编辑状态 -->
        <picker
          v-else
          :placeholder="`请选择`"
          range-key="label"
          :disabled="field.disabled || false"
          :value="selectIndex"
          :range="pickerArray"
          @change="bindPickerChange"
        >
          <view v-if="pickerArray[selectIndex].label" class="uni-input">{{ pickerArray[selectIndex].label }}</view>
          <view v-else class="uni-input placeholder">{{ field.placeholder || '请选择' }}</view>
        </picker>
      </uni-forms-item>

      <image v-if="!field.isView && field.labelPosition!=='top'" class="narrow" src="https://udstatic.imeik.com/pcUploads/1651050347935_wode_icon_right%402x"></image>
    </view>

    <!-- 提示信息 -->
    <view v-if="extra==='bottom'" class="extraClass">
      {{ field.props.extra }}
    </view>
  </view>
</template>

<script>
import { getCommonRules, getExtraPosition } from './util'
export default {
  name: '',
  props: {
    // 初始值
    inputValue: {
      type: [Number, String],
      default: ''
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
      selectIndex: -1
    }
  },
  computed: {
    extra() {
      return getExtraPosition(this.field)
    },
    pickerArray() {
      return this.field.options || []
    }
  },
  watch: {
    // 初始值监听
    inputValue: {
      handler(val) {
        this.setDefaultValue(val)
      },
      immediate: true
    }
  },
  created() {
    this.setDefaultValue()
    this.setFieldRule()
  },
  methods: {
    // 设置选中值
    setDefaultValue(val) {
      val = val || this.model[this.field.code]
      const options = this.field.options || []

      this.selectIndex = options.findIndex(i => i.value === val)
    },

    // 校验规则
    setFieldRule() {
      // const props = this.field.props || {}
      const rules = getCommonRules(this.field)

      // emit到父组件 - 更新校验规则
      this.$emit('updateRules', this.field.code, rules)
    },

    // 选中事件 - 需要通过emit来更新父组件的值
    bindPickerChange(e) {
      const options = this.field.options || []
      const index = e.detail.value
      this.selectIndex = index
      const model = this.deepClone(this.model)
      model[this.field.code] = options[index] && options[index].value || ''

      this.$emit('update:model', model)
      this.$refs.fsi.clearValidate()
    },

    // 详情展示
    formatValue(model, field) {
      const val = model[field.code] || ''
      const options = this.field.options || []
      const item = options.find(i => i.value === val)

      return `${item && item.label || val}`
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./style.scss";

  .nore{
    display: inline-block;
    height: 34rpx;
    color: #8E9296;
    font-weight: 400;
    font-size: 24rpx;
    font-family: PingFangSC-Regular, "PingFang SC";
    line-height: 34rpx;
  }

  .uni-input {
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .placeholder {
    color: #CCC;
  }
</style>
