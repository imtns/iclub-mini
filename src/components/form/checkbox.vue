<template>
  <!-- checkbox -->
  <view class="ik-form-item" :class="'ik-form-pos-'+(field.labelPosition||'left')">
    <view class="ik-form-row">
      <uni-forms-item class="ik-form-wrap" :name="field.code">
        <!-- label插槽-->
        <view slot="label" class="label-text">
          <!-- 可以在form-item最顶部自己插入数据 -->
          <slot name="top"></slot>
          <view>{{ field.label }}</view>
          <!-- 提示信息 -->
          <view v-if="extra==='top'" class="extraClass">
            {{ field.props.extra }}
          </view>
        </view>

        <!-- 查看状态 -->
        <form-view-item v-if="field.isView" :format-value="formatValue" :model="model" :field="field"></form-view-item>

        <!-- 编辑状态 -->
        <uni-data-checkbox v-model="model[field.code]" :disabled="field.disabled || false" multiple :min="field.props.min || 0" :max="field.props.max || 999" :localdata="field.options || []" @change="handleInput" />
      </uni-forms-item>

      <!-- <image v-if="!field.isView && field.labelPosition!=='top'" class="narrow" src="https://udstatic.imeik.com/pcUploads/1651050347935_wode_icon_right%402x"></image>-->
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
  name: 'radio',
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
  computed: {
    extra() {
      return getExtraPosition(this.field)
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
    // 设置默认值
    setDefaultValue(val) {},

    // 校验规则
    setFieldRule() {
      const props = this.field.props || {}
      const rules = getCommonRules(this.field)

      if (props.min) {
        rules.push({ validateFunction: this.countRangeValidate })
      }

      // emit到父组件 - 更新校验规则
      this.$emit('updateRules', this.field.code, rules, true)
    },

    // 个数范围限制
    countRangeValidate(rule, value, data, callback) {
      const props = this.field.props || {}
      const min = props.min
      if (value.length < min) {
        // eslint-disable-next-line node/no-callback-literal
        callback(`请至少选择${min}个`)
      }
      return true
    },

    // 输入事件 - 需要通过emit来更新父组件的值
    handleInput() {
      this.$emit('update:model', this.model)
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
</style>
