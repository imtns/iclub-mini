<template>
  <!-- 业务组件 - 选择机构 -->
  <view>
    <Address v-if="!field.isView" :input-value="initialAddress" :disabled="field.isView" @GetKye="GetCon"></Address>

    <view class="ik-form-item" :class="'ik-form-pos-' + (field.labelPosition || 'left')">
      <view class="ik-form-row">
        <uni-forms-item ref="dsfi" class="ik-form-wrap" :name="field.code">
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
          <form-view-item v-if="field.isView" :format-value="formatValue" :model="model" :field="field">
          </form-view-item>

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

        <image
          v-if="!field.isView && field.labelPosition !== 'top'"
          class="narrow"
          src="https://udstatic.imeik.com/pcUploads/1651050347935_wode_icon_right%402x"
        ></image>
      </view>

      <!-- 提示信息 -->
      <view v-if="extra === 'bottom'" class="extraClass">
        {{ field.props.extra }}
      </view>
    </view>
  </view>
</template>

<script>
import Address from '../../components/address/region-picker.vue'
import { getCommonRules, getExtraPosition } from './util'
export default {
  name: '',
  components: {
    // eslint-disable-next-line vue/no-reserved-component-names
    Address
  },
  props: {
    // 初始值
    inputValue: {
      type: [Number, String],
      default: ''
    },
    // 配置项
    field: {
      type: Object,
      default: () => { }
    },
    // 绑定的model
    model: {
      type: Object,
      default: () => { }
    }
  },
  data() {
    return {
      selectedDepartment: '',
      initialAddress: '',
      searchName: '',
      code: ''
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
    GetCon(value) {
      console.log(value)
      // 选择地区
      this.code = value || ''
    },

    // 设置默认值
    setDefaultValue(val) {
      // 这里会是对象形式
      // {"name":"xxx","objectCode":"xxx"}
      if (val) {
        try {
          val = JSON.parse(val)
        } catch (e) { }

        this.selectedDepartment = val.name || ''
        this.initialAddress = val.address || ''
      }
    },

    // 校验规则
    setFieldRule() {
      // const props = this.field.props || {}
      const rules = getCommonRules(this.field)

      // emit到父组件 - 更新校验规则
      this.$emit('updateRules', this.field.code, rules)
    },

    // 选择机构
    goDepSelect() {
      // 这里只能监听一次，不然会导致多个机构选择的时候互相混
      uni.$once('chooseDepartment', this.onDepChoose)
      // 当没有搜索到机构时，是否展示输入框（目前仅医生注册的时候展示）
      const showCustom = this.field.props && this.field.props.showCustom || false
      uni.navigateTo({
        url: `/pages/choose/department?name=${this.searchName || ''}&code=${this.code || ''}&showCustom=${showCustom ? 1 : 0}`
      })
    },

    // 选择事件 - 选择机构页面调用
    onDepChoose(item) {
      this.selectedDepartment = item.name
      const model = this.deepClone(this.model)
      // model[this.field.code] = item.objectCode
      model[this.field.code] = JSON.stringify(item)

      this.$emit('update:model', model)
      this.$refs.dsfi.clearValidate()
    },

    // 详情展示
    formatValue(model, field) {
      let val = model[field.code]
      // 这里会是对象形式
      // {"name":"xxx","objectCode":"xxx"}
      try {
        val = JSON.parse(val)
      } catch (e) { }

      return val.name || ''
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
