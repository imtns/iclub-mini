<template>
  <!-- input -->
  <view v-if="field.code!='input'" :data-attr="field.dataAttr||''" class="ik-form-item" :class="'ik-form-pos-'+(field.labelPosition||'left')">
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
        <template v-else>
          <textarea v-if="field.inputType==='textarea'" v-model="model[field.code]" :maxlength="field.props && field.props.max || -1" disable-default-padding placeholder-style="color:#CCCCCC" :auto-blur="true" :placeholder="field.placeholder || `请输入`" :disabled="field.disabled || false" @input="handleInput" />
          <input v-else v-model="model[field.code]" :maxlength="field.props && field.props.max || -1" :type="field.inputType || 'text'" placeholder-style="color:#CCCCCC" :auto-blur="true" :placeholder="field.placeholder || `请输入`" :disabled="field.disabled || false" @input="handleInput" />
          <view v-if="field.inputType==='textarea' && field.props && field.props.showWordLimit && field.props.max" class="wordlimitStyle">
            {{ textLength }}/{{ field.props.max }}
          </view>
        </template>
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
  name: 'inputComp',
  props: {
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
    textLength() {
      return this.model[this.field.code].length || 0
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
      const props = this.field.props || {}
      const rules = getCommonRules(this.field)

      /**
       * 在小程序中，json 中不能使用正则对象，如：/^\S+?@\S+?\.\S+?$/，使用正则对象会被微信序列化，导致正则失效
       * 所以建议统一使用字符串的方式来使用正则 ，如'^\\S+?@\\S+?\\.\\S+?$' ，需要注意 \ 需要使用 \\ 来转译
       * 如验证邮箱：/^\S+?@\S+?.\S+?$/ （注意不带引号）,或使用 "^\S+?@\S+?\.\S+?$"（注意带引号需要使用 \ 转义）
       */
      // 字数范围校验
      if (typeof props.min !== 'undefined' && typeof props.max !== 'undefined') {
        const m = props.min
        const n = props.max
        if (m < n) {
          rules.push({
            pattern: `^[\\s\\S]{${m},${n}}$`,
            errorMessage: `请输入${m}到${n}个字符`
          })
        } else if (m === n) {
          rules.push({
            pattern: `^[\\s\\S]${m},${n}}$`,
            errorMessage: `请输入${m}个字符`
          })
        }
      }

      // emit到父组件 - 更新校验规则
      this.$emit('updateRules', this.field.code, rules)
    },

    // 输入事件 - 需要通过emit来更新父组件的值
    handleInput(e) {
      /**
       * 不知道为啥，input不能跟其他组件一样，通过update:model更新父组件里的model，表现为：
       *    正常输入没问题，当删除输入框里最后一个字符时，model上的值清空了，但是更新不到uni-form上去，导致form.validate不对
       * 快被这个问题整emo了，后来无意中发现了form.setValue方法，所以这里加上emit input事件到父组件，然后有父组件里的uni-form的setValue方法更新绑定
       */
      this.$emit('update:model', this.model) // 更新model
      this.$emit('input', this.field.code, e.detail.value) // 更新uni-form-item
    },

    // 详情展示
    formatValue(model, field) {
      const val = model[field.code]

      return `${val || ''}`
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./style.scss";
  textarea {
    width: 100%;
    height: 200rpx;
  }

  .wordlimitStyle {
    position: absolute;
    right: 0;
    bottom: -16rpx;
    color: #CCC;
    font-size: 24rpx;
    text-align: right;
  }
</style>
