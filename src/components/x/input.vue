<template>
  <view class="x-input" :class="{ limit: showLimit }">
    <uni-easyinput
      :prefix-icon="prefixIcon"
      :suffix-icon="suffixIcon"
      :readonly="readonly"
      :disabled="disabled"
      :value="inputValue"
      :type="type"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :placeholder-style="placeholderStyle"
      :clearable="!showLimit && clearable"
      :adjust-position="adjustPosition"
      :cursor-spacing="cursorSpacing"
      :styles="styles"
      @blur="onBlur"
      @focus="onFocus"
      @input="onInput"
      @confirm="onConfirm"
      @clear="onClear"
      @tap="$emit('click')"
    >
      <slot />
      <template #right>
        <slot name="right" />
      </template>
    </uni-easyinput>
    <div v-if="showLimit" style="position: absolute; right: 22rpx; bottom: 14rpx">
      <span style="color: #c5cad4; font-size: 24rpx">
        <span style="color: #111e36; font-size: 32rpx">{{ inputValue.length }}</span>
        /{{ maxlength }}
      </span>
    </div>
  </view>
</template>

<script>
const MONEY_MAX = 999999999
export default {
  props: {
    styles: {
      type: Object,
      default() {
        return {
          color: '#333',
          backgroundColor: '#fff',
          disableColor: '#F7F6F6',
          borderColor: '#e5e5e5'
        }
      }
    },
    showLimit: Boolean,
    adjustPosition: {
      type: Boolean,
      default: true
    },
    readonly: Boolean,
    disabled: Boolean,
    prefixIcon: {
      type: String,
      default: ''
    },
    suffixIcon: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    placeholderStyle: {
      type: String,
      default: 'font-size:30rpx'
    },
    maxlength: {
      type: [String, Number],
      default: 20
    },
    value: {
      type: String,
      default: ''
    },
    clearable: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'text'
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: null
    },
    cursorSpacing: {
      type: Number,
      default: 0
    },
    money: Boolean
  },
  data() {
    return {}
  },
  computed: {
    inputValue: {
      get() {
        return this.value
      },
      set(e) {
        this.$emit('input', e)
      }
    }
  },
  watch: {},
  mounted() {},
  created() {},
  methods: {
    onFocus() {
      this.$emit('focus')
    },
    onBlur(e) {
      console.log('blur')
      this.$emit('blur', e)
      if (this.money) {
        let money = this.inputValue.replace(/,/g, '')
        if (+money > MONEY_MAX) {
          money = MONEY_MAX
        }
        if (!money || isNaN(money)) {
          this.inputValue = ''
          return
        }
        this.inputValue = Number(money).toFixed(2)
      } else if (this.type === 'number' && this.max && +this.inputValue > this.max) {
        console.log('this.max', this.max)

        this.inputValue = this.max
      } else if (this.type === 'number' && this.min && +this.inputValue < this.min) {
        this.inputValue = this.min
      }
    },
    onInput(v) {
      if (this.type === 'number') {
        this.inputValue = v.replace(/\D/g, '').replace(/\s+/g, '')
      } else {
        this.inputValue = v
      }
      this.$emit('change')
    },
    onConfirm() {
      this.$emit('confirm')
    },
    onClear() {
      this.inputValue = ''
      this.$emit('clear')
    }
  }
}
</script>
<style lang="scss">
.x-input.limit {
  input {
    padding-right: 100rpx !important;
  }
}
</style>
<style lang="scss" scoped>
.placeholder {
  font-size: 30rpx;
}
.x-input {
  position: relative;
}
</style>
