<template>
  <uni-popup ref="popRef" type="center" background-color="transparent" :is-mask-click="false" @change="onPopupChange">
    <view class="address-popup">
      <text class="address-popup-title">{{ edit ? '确认收货地址' : '收货地址' }}</text>
      <view class="address-fields">
        <view class="address-field">
          <text class="field-label">收货人姓名</text>
          <text class="field-text-readonly">{{ form.receiverName || '-' }}</text>
        </view>
        <view class="address-field">
          <text class="field-label">联系电话</text>
          <text class="field-text-readonly">{{ form.phone || '-' }}</text>
        </view>
        <view class="address-field">
          <text class="field-label">详细地址</text>
          <text class="field-text-readonly field-detail-readonly">{{ form.detail || form.detailAddress || '-' }}</text>
        </view>
      </view>
      <text class="address-popup-hint">{{ edit ? '奖励将在7个工作日内发货。请确保地址信息准确无误' : '奖励将在7个工作日内发货。' }}</text>
      <!-- 填写模式：取消 + 提交 -->
      <view v-if="edit" class="address-popup-actions">
        <button class="addr-btn addr-btn-cancel" @tap="onCancel">取消</button>
        <button class="addr-btn addr-btn-submit" :loading="loading" @tap="onSubmit">提交</button>
      </view>
      <!-- 展示模式：居中关闭按钮 -->
      <view v-else class="address-popup-actions address-popup-actions--single">
        <button class="addr-btn addr-btn-submit addr-btn-close" @tap="onClose">关闭</button>
      </view>
    </view>
  </uni-popup>
</template>

<script>
export default {
  name: 'AddressPopup',
  props: {
    /** 是否显示弹窗 */
    visible: {
      type: Boolean,
      default: false
    },
    /** 是否编辑模式：true=填写收货地址，false=展示收货地址 */
    edit: {
      type: Boolean,
      default: true
    },
    /** 表单数据：{ receiverName, phone, detailAddress } */
    form: {
      type: Object,
      default: () => ({ receiverName: '', phone: '', detailAddress: '' })
    },
    /** 提交按钮 loading 状态（仅 edit 模式） */
    loading: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible: {
      handler(val) {
        this.$nextTick(() => {
          const ref = this.$refs.popRef
          if (ref) (val ? ref.open() : ref.close())
        })
      },
      immediate: true
    }
  },
  methods: {
    onCancel() {
      this.$emit('cancel')
    },
    onSubmit() {
      this.$emit('submit')
    },
    onClose() {
      this.$emit('close')
    },
    onPopupChange(e) {
      if (e && e.show === false) {
        this.$emit('change', false)
      }
    },
    open() {
      this.$refs.popRef && this.$refs.popRef.open()
    },
    close() {
      this.$refs.popRef && this.$refs.popRef.close()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/pages-activity/315-scan/assets/common.scss';

.address-popup {
  width: 603rpx;
  min-height: 400rpx;
  padding: 50rpx 61rpx 40rpx;
  background: linear-gradient(180deg, #d8f0ff 0%, #ffffff 22%, #ffffff 86%, #d8f0ff 100%);
  border-radius: 107rpx;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  font-family: 'SourceHanSans-Regular', sans-serif;
}

.address-popup-title {
  display: block;
  margin-bottom: 46rpx;
  color: #333333;
  font-weight: 700;
  font-size: 36rpx;
  text-align: center;
  font-family: 'SourceHanSans-Regular', sans-serif;
}

.address-fields {
  display: flex;
  flex-direction: column;
  gap: 22rpx;
  margin-bottom: 16rpx;
}

.address-field {
  display: flex;
  flex-direction: column;
}

.field-label {
  font-size: 26rpx;
  font-weight: 500;
  color: rgba(51, 51, 51, 0.82);
  line-height: 38rpx;
  margin-bottom: 12rpx;
  font-family: 'SourceHanSans-Regular', sans-serif;
}

.field-text-readonly {
  min-height: 84rpx;
  line-height: 84rpx;
  background: #f3f2f2;
  border-radius: 64rpx;
  padding: 0 30rpx 0 44rpx;
  font-size: 26rpx;
  color: #333333;
  font-family: 'SourceHanSans-Regular', sans-serif;

  &.field-detail-readonly {
    min-height: 120rpx;
    height: auto;
    line-height: 1.5;
    padding: 24rpx 30rpx 24rpx 44rpx;
    border-radius: 46rpx;
  }
}

.address-popup-hint {
  display: block;
  margin-bottom: 32rpx;
  color: #ff6903;
  font-size: 24rpx;
  line-height: 1.48;
  font-family: 'SourceHanSans-Regular', sans-serif;
}

.address-popup-actions {
  display: flex;
  gap: 13rpx;

  &--single {
    justify-content: center;
  }

  .addr-btn {
    flex: 1;
    height: 92rpx;
    line-height: 92rpx;
    border-radius: 63rpx;
    font-size: 32rpx;
    font-family: 'SourceHanSans-Regular', sans-serif;
    border: none;
    padding: 0;
    text-align: center;
    box-sizing: border-box;
  }

  .addr-btn-cancel {
    flex: 165;
    background: #f3f2f2;
    color: #999999;
  }

  .addr-btn-submit {
    flex: 304;
    background: #2b9de7;
    color: #ffffff;
    font-weight: 700;
  }

  .addr-btn-close {
    flex: none;
    width: 398rpx;
  }
}
</style>
