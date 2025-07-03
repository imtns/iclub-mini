<template>
  <!-- date -->
  <view class="ik-form-item" :class="'ik-form-pos-'+(field.labelPosition||'left')">
    <view class="ik-form-row">
      <uni-forms-item ref="dfi" class="ik-form-wrap" :name="field.code">
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
        <picker
          v-else
          :placeholder="`请输入${field.label}`"
          :disabled="field.disabled || false"
          mode="date"
          :value="date"
          :start="startDate"
          :end="endDate"
          @change="bindDateChange"
        >
          <view class="uni-input">{{ date || '请选择' }}</view>
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
      date: ''
    }
  },
  computed: {
    extra() {
      return getExtraPosition(this.field)
    },
    // 最小日期
    startDate() {
      return this.field.props && this.field.props.min || '1970-01-01'
    },
    // 最大日期
    endDate() {
      return this.field.props && this.field.props.max || '2050-12-31'
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
    setDefaultValue(val) {
      this.date = val || this.model[this.field.code] || ''
    },

    // 校验规则
    setFieldRule() {
      // const props = this.field.props || {}
      const rules = getCommonRules(this.field)

      // emit到父组件 - 更新校验规则
      this.$emit('updateRules', this.field.code, rules)
    },

    // 选择事件 - 需要通过emit来更新父组件的值
    bindDateChange(e) {
      this.date = e.detail.value
      const model = this.deepClone(this.model)
      model[this.field.code] = this.date

      this.$emit('update:model', model)
      this.$refs.dfi.clearValidate()
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
  @import "./style.scss";
</style>
