<template>
  <!-- upload -->
  <view :data-attr="field.dataAttr||''" class="ik-form-item" :class="'ik-form-pos-'+(field.labelPosition||'left')">
    <view class="ik-form-row">
      <uni-forms-item ref="ufi" class="ik-form-wrap" :name="field.code">
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
        <template v-if="field.isView">
          <form-view-item :format-value="formatValue" :model="model" :field="field"></form-view-item>
        </template>

        <!-- 编辑状态 -->
        <template v-else>
          <ik-upload v-model="myValue" :upload-type="getUploadType(field)" :max="prop.max || 5" :placeholder="prop.placeholder" :disabled="field.disabled || false" :input-value="myValue" @change="handleChange" />
        </template>
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
  name: 'inputComp',
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
      myValue: []
    }
  },
  computed: {
    prop() {
      return this.field.props || {}
    },
    extra() {
      return getExtraPosition(this.field)
    }
  },
  watch: {
    inputValue: {
      handler(val) {
        if (val) {
          this.setDefaultValue(val)
        }
      },
      immediate: true
    }
  },
  created() {
    this.setDefaultValue()
    this.setFieldRule()
  },
  methods: {
    getUploadType(field) {
      if (field.type === 'form-file') {
        return 'file'
      } else if (field.type === 'form-video') {
        return 'video'
      } else {
        return 'image'
      }
    },

    // 设置默认值
    setDefaultValue(val) {
      this.myValue = [].concat(val || this.model[this.field.code] || [])
    },

    // 校验规则
    setFieldRule() {
      // const props = this.field.props || {}
      const rules = getCommonRules(this.field)

      // emit到父组件 - 更新校验规则
      this.$emit('updateRules', this.field.code, rules)
    },

    // 变化时，绑定到model上
    handleChange() {
      const model = this.deepClone(this.model)

      model[this.field.code] = [].concat(this.myValue)

      this.$emit('update:model', model)
      this.$refs.ufi.clearValidate()
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
