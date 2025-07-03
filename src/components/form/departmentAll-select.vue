<template>
  <!-- 业务组件 - 选择科室 -->
  <view class="ik-form-item" :class="'ik-form-pos-'+(field.labelPosition||'left')">
    <view class="ik-form-row">
      <uni-forms-item ref="dsfi" class="ik-form-wrap" :name="field.code">
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
        <view
          v-else
          v-model="selectedDepartment"
          class="sel-dep"
          :placeholder="`请选择`"
          :disabled="field.disabled || false"
          @click="goDepSelect"
        >
          {{ selectedDepartment || `请选择` }}
        </view>
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
      selectedDepartment: ''
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
    // this.setDefaultValue()
    this.setFieldRule()
  },
  methods: {
    // 设置默认值
    setDefaultValue(val) {
      if (val) {
        this.selectedDepartment = this.formatValue(this.model, this.field)
      }
    },

    // 校验规则
    setFieldRule() {
      // const props = this.field.props || {}
      const rules = getCommonRules(this.field)

      // emit到父组件 - 更新校验规则
      this.$emit('updateRules', this.field.code, rules)
    },

    // 选择科室
    goDepSelect() {
      console.log('selectedDepartment')
      // 这里只能监听一次，不然会导致多个机构选择的时候互相混
      uni.$once('selectDepartment', this.onDepChoose)
      uni.navigateTo({
        url: '/pages/choose/departmentAll'
      })
    },

    // 选择事件 - 选择科室页面调用
    onDepChoose(item) {
      this.selectedDepartment = item.name
      const model = this.deepClone(this.model)
      // model[this.field.code] = item.objectCode
      model[this.field.code] = item.hospitalCode

      this.$emit('update:model', model)
      this.$refs.dsfi.clearValidate()
    },

    // 详情展示
    formatValue(model, field) {
      const val = model[field.code]

      const dic = getApp().globalData.dictionaryTree || {}
      const list = (dic.realDepartment.options || []).concat(dic.otherRealDepartment.options || [])
      const item = list.find(i => i.sign === val)
      return item ? item.name : ''
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "./style.scss";

  .sel-dep {
    display: -webkit-box;
    height: 40px;
    overflow: hidden;
    color: #5A6067;
    font-weight: 400;
    font-size: 30rpx;
    font-family: PingFangSC-Regular, "PingFang SC";
    line-height: 40px;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
</style>
