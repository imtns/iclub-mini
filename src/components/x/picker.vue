<template>
  <view class="x-picker">
    <view v-if="readonly">
      <uni-easyinput v-if="!$slots.default" :styles="styles" readonly disabled placeholder-style="font-size:30rpx" :placeholder="placeholder" :value="inputLabel" />
    </view>
    <view v-else-if="!isPicker" @click="$emit('click')">
      <slot />
      <uni-easyinput v-if="!$slots.default" :styles="styles" readonly disabled placeholder-style="font-size:30rpx" :placeholder="placeholder" :value="inputValue">
        <template #right>
          <uni-icons :type="icon" color="#8E9296" style="position: relative; right: 20rpx" />
        </template>
      </uni-easyinput>
    </view>
    <picker v-else mode="selector" :range="pickerList" :value="pickerIndex" @change="onPickerChange">
      <uni-easyinput :styles="styles" readonly disabled :placeholder="placeholder" placeholder-style="font-size:30rpx" :value="inputLabel">
        <template #right>
          <uni-icons :type="icon" color="#8E9296" style="position: relative; right: 20rpx" />
        </template>
        <slot />
      </uni-easyinput>
    </picker>
  </view>
</template>

<script>
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
    icon: {
      type: String,
      default: 'forward'
    },
    originRange: {
      type: Array,
      default() {
        return []
      }
    },
    range: {
      type: Array,
      default() {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    },
    readonly: Boolean,
    isPicker: Boolean,
    pickerKey: {
      type: String,
      default: ''
    },
    pickerValue: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    value: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      pickerIndex: 0,
      originPickerData: []
    }
  },
  computed: {
    pickerList() {
      return this.range.map((d) => d[this.pickerKey])
    },
    inputLabel() {
      const pickerList = this.originRange.length ? this.originRange : this.range
      const findPicker = pickerList.find((d) => d[this.pickerValue] === this.value)
      console.log('find', findPicker)
      if (findPicker) {
        return findPicker[this.pickerKey]
      }
      return ''
    },
    inputValue: {
      get() {
        const findPicker = this.range.find((d) => d[this.pickerValue] === this.value)
        if (findPicker) {
          return findPicker[this.pickerKey]
        }

        return this.value
      },
      set(e) {
        this.$emit('input', e)
      }
    }
  },

  created() {},
  methods: {
    onPickerChange(e) {
      this.pickerIndex = +e.detail.value
      this.inputValue = this.range[this.pickerIndex][this.pickerValue]
      this.$emit('change', this.inputValue)
    }
  }
}
</script>
<style lang="scss" scoped>
.x-picker {
  position: relative;
  .popup-wrapper {
    box-sizing: border-box;
    width: 100%;
    padding: 36rpx 32rpx;
    border-radius: 16rpx 16rpx 0rpx 0rpx;

    .header {
      width: 100%;
      margin-bottom: 48rpx;
      .title {
        color: #29323d;
        font-weight: bold;
        font-size: 32rpx;
      }
      @include flex-spacebetween;
    }
  }
}
</style>
