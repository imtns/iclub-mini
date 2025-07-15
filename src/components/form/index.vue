<template>
  <!-- 表单组件 -->
  <view class="form-content">
    <uni-forms ref="form" :validate-trigger="validateTrigger" :model-value="formModel" :label-width="labelPosition === 'left' ? labelWidth : ''" :label-position="labelPosition">
      <template v-for="(field, index) in fields">
        <!-- 每个表单项顶部自定义slot -->
        <slot name="field-top" :field="field"></slot>
        <!-- 基础组件 -->
        <form-input
          v-if="field.type === 'form-input'"
          :key="index"
          :class="[itemClass(index, field)]"
          :input-value="inputValue[field.code]"
          :field="field"
          :model.sync="formModel"
          @updateRules="updateRules"
          @input="handleInput"
        />
        <form-radio
          v-else-if="field.type === 'form-radio'"
          :key="index"
          :class="[itemClass(index, field)]"
          :input-value="inputValue[field.code]"
          :field="field"
          :model.sync="formModel"
          @updateRules="updateRules"
        />
        <form-checkbox
          v-else-if="field.type === 'form-checkbox'"
          :key="index"
          :class="[itemClass(index, field)]"
          :input-value="inputValue[field.code]"
          :field="field"
          :model.sync="formModel"
          @updateRules="updateRules"
        />
        <form-select
          v-else-if="field.type === 'form-select'"
          :key="index"
          :class="[itemClass(index, field)]"
          :input-value="inputValue[field.code]"
          :field="field"
          :model.sync="formModel"
          @updateRules="updateRules"
        />
        <form-date
          v-else-if="field.type === 'form-date'"
          :key="index"
          :class="[itemClass(index, field)]"
          :input-value="inputValue[field.code]"
          :field="field"
          :model.sync="formModel"
          @updateRules="updateRules"
        />
        <form-rate
          v-else-if="field.type === 'form-rate'"
          :key="index"
          :class="[itemClass(index, field)]"
          :input-value="inputValue[field.code]"
          :field="field"
          :model.sync="formModel"
          @updateRules="updateRules"
        />
        <form-upload
          v-else-if="field.type === 'form-image'"
          :key="index"
          :class="[itemClass(index, field)]"
          :input-value="inputValue[field.code]"
          :field="field"
          :model.sync="formModel"
          @updateRules="updateRules"
        />
        <form-upload
          v-else-if="field.type === 'form-video'"
          :key="index"
          :class="[itemClass(index, field)]"
          :input-value="inputValue[field.code]"
          :field="field"
          :model.sync="formModel"
          @updateRules="updateRules"
        />
        <form-upload
          v-else-if="field.type === 'form-file'"
          :key="index"
          :class="[itemClass(index, field)]"
          :input-value="inputValue[field.code]"
          :field="field"
          :model.sync="formModel"
          @updateRules="updateRules"
        />
        <form-address
          v-else-if="field.type === 'form-address'"
          :key="index"
          :class="[itemClass(index, field)]"
          :input-value="inputValue[field.code]"
          :field="field"
          :model.sync="formModel"
          @updateRules="updateRules"
        />
        <!-- 业务组件 -->
        <form-department-select
          v-else-if="field.type === 'form-department-select'"
          :key="index"
          :class="[itemClass(index, field)]"
          :input-value="inputValue[field.code]"
          :field="field"
          :model.sync="formModel"
          @updateRules="updateRules"
        />
        <form-departmentAll-select
          v-else-if="field.type === 'form-departmentAll-select'"
          :key="index"
          :class="[itemClass(index, field)]"
          :input-value="inputValue[field.code]"
          :field="field"
          :model.sync="formModel"
          @updateRules="updateRules"
        />

        <slot name="tips" :field="field"></slot>
      </template>
    </uni-forms>
  </view>
</template>

<script>
import { getCommonRules } from './util'
export default {
  /**
   * 话说uni-forms的奇葩之处：
   *  0、不支持vue的component :is动态加载组件 - 全量判断
   *  1、model不支持父子组件双向绑定，只能用.sync和$emit('update:model, xxx)的方式从子组件更新父组件的model
   *  2、不支持在子组件里的uni-forms-item上设置rules，所以只能子组件$emit('updateRules')方法
   *  3、uni-forms-item的name属性不支持有中划线，也就是下面的fields里的code不能有中划线
   *  4、model里有默认值的时候不自动填充到uni-easyinput - 改用input
   *  5、rules里pattern有限制，见form-input组件（这个锅其实是微信小程序的）
   *  6、clearValidate方法，必须传入具体的field名
   *  7、:class不支持方法返回，需要这样写:class="[itemClass()]"
   *  8、在v-for里面使用slot(如：field-top)，slot里元素只支持单个标签，否则只会渲染一次
   *     所以复杂的slot只能封装成单个组件再slot，见'pages/mine/product/exam'页面的questionDesc组件
   */
  props: {
    // 初始值需要单独声明一个变量，如果用model的话，会进入监听死循环
    inputValue: {
      type: Object,
      default: () => {}
    },
    model: {
      type: Object,
      default: () => {}
    },
    fields: {
      type: Array,
      default: () => []
    },
    labelWidth: {
      type: Number,
      default: 90
    },
    labelPosition: {
      type: String,
      default: 'left' // left top
    },
    validateTrigger: {
      type: String,
      default: 'submit' // bind/submit
    }
  },
  data() {
    return {
      rules: {},
      formModel: {}
    }
  },
  computed: {
    fieldsLength() {
      return this.fields.length
    }
  },
  watch: {
    // 监听变化 emit到父组件
    formModel(val) {
      this.$emit('update:model', val)
    },

    // 初始值监听
    inputValue: {
      handler(val) {
        if (val) {
          this.initModel(val)
        }
      },
      immediate: true
    },

    // 当表单项数量发生变化时
    fieldsLength(value) {
      this.updateAllFields()
    }
  },
  created() {
    this.initModel(this.model)
  },
  methods: {
    removeEmoji(text) {
      const reg =
        // eslint-disable-next-line no-misleading-character-class
        /[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF][\u200D|\uFE0F]|[\uD83C|\uD83D|\uD83E][\uDC00-\uDFFF]|[0-9|*|#]\uFE0F\u20E3|[0-9|#]\u20E3|[\u203C-\u3299]\uFE0F\u200D|[\u203C-\u3299]\uFE0F|[\u2122-\u2B55]|\u303D|[\A9|\AE]\u3030|\uA9|\uAE|\u3030/gi
      if (text.match(reg)) {
        text = text.replace(reg, '')
      }
      return text
    },
    // 对model进行初始化
    initModel(model, clear) {
      const ml = model || {} // 为null兼容
      for (let i = 0; i < this.fields.length; i++) {
        // eslint-disable-next-line vue/no-mutating-props
        this.fields[i].labelPosition = this.labelPosition
        const code = this.fields[i].code
        this.$set(this.formModel, code, clear ? '' : ml[code] || '')
      }
      this.$emit('update:model', this.formModel)
    },

    // model-item的class
    itemClass(index, field) {
      const last = index === this.fields.length - 1 ? 'last' : ''
      // label独占一行：当label太长时
      const onelinelabel = field.labelInOneLine || false

      return `ik-form-element ${last} ${onelinelabel ? 'label-one-line' : ''}`
    },

    // 当表单数据数量发上变化时,更新字段,只更新不存在的key和rule
    updateAllFields() {
      // 如果formModel中没有字段,那么需要加上,同时设置rules
      const formModelKeys = Object.keys(this.formModel)
      this.fields.forEach((field) => {
        const key = field.code
        if (!formModelKeys.includes(key)) {
          this.$set(this.formModel, key, '')
          const rules = getCommonRules(field)
          this.updateRules(key, rules)
        }
      })
    },

    // 更新rules
    updateRules(code, rule) {
      this.$set(this.rules, code, { rules: rule })
      /**
       * 需要注意，如果需要使用 validateFunction 自定义校验规则
       * 则不能采用 uni-forms 的 rules 属性来配置校验规则，这时候需要通过ref
       * 在onReady生命周期调用组件的setRules方法绑定验证规则 无法通过props传递变量
       * 是因为微信小程序会过滤掉对象中的方法，导致自定义验证规则无效
       */
      this.$refs.form.setRules(this.rules)
    },

    // 监听input输入变化
    handleInput(code, value) {
      const text = this.removeEmoji(value)
      console.log('🚀 ~ handleInput ~ text:', text)
      this.$set(this.formModel, code, text)
      this.$refs.form.setValue(code, text)
    },

    // 重置
    handleReset() {
      this.clearValidate()
      this.initModel({}, true)
      this.$refs.form.resetFields()
    },

    // 清除校验
    clearValidate() {
      this.$refs.form.clearValidate(this.fields.map((i) => i.code))
    },

    // 提交
    async handleSubmit() {
      return new Promise((resolve, reject) => {
        this.$refs.form
          .validate()
          .then((res) => {
            console.log('handleSubmit', res, this.formModel)
            resolve(res)
          })
          .catch((err) => {
            reject(err)
          })
      })
    }
  }
}
</script>
