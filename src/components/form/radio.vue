<template>
  <!-- radio -->
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
        <uni-data-checkbox v-else v-model="model[field.code]" :disabled="field.disabled || false" :localdata="fieldOptions" @change="handleInput" />
      </uni-forms-item>
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
    },
    fieldOptions() {
      return (this.field.options || []).map(i => {
        i.text = i.text || i.label
        return i
      })
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
    setDefaultValue() {},

    // 校验规则
    setFieldRule() {
      // const props = this.field.props || {}
      const rules = getCommonRules(this.field)

      // emit到父组件 - 更新校验规则
      this.$emit('updateRules', this.field.code, rules)
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
