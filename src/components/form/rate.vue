<template>
  <!-- 评分 -->
  <view class="ik-form-item" :class="'ik-form-pos-'+(field.labelPosition||'left')">
    <view class="ik-form-row">
      <uni-forms-item ref="rfi" class="ik-form-wrap" :name="field.code">
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

        <!-- 查看状态/编辑状态 - 查看状态时 readonly 为true -->
        <uni-rate active-color="#FFBB1C" :margin="6" :size="20" :max="10" :readonly="field.isView" :value="rate" :disabled="field.disabled || false" @change="handleChange" />
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
// model[field.code]
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
      rate: 0
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
    setDefaultValue(val) {
      this.rate = val || this.model[this.field.code] || 0
    },

    // 校验规则
    setFieldRule() {
      // const props = this.field.props || {}
      const rules = getCommonRules(this.field)

      // emit到父组件 - 更新校验规则
      this.$emit('updateRules', this.field.code, rules)
    },

    // 输入事件 - 需要通过emit来更新父组件的值
    handleChange(e) {
      const model = this.deepClone(this.model)
      model[this.field.code] = e.value

      this.$emit('update:model', model)
      this.$refs.rfi.clearValidate()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
