<template>
  <view class="address-manage">
    <uni-transition :show="!loading">
      <scroll-view class="list-wrap" :enable-back-to-top="true" :scroll-y="true" :show-scrollbar="false">
        <view class="address-form">
          <form-index ref="bf" :input-value="inputAddress" :model.sync="address" :fields="fields" :label-width="100"></form-index>
        </view>

        <view class="default-set">
          <view>设置为默认地址</view>
          <image
            :src="isDefault ? 'https://udstatic.imeik.com/pcUploads/1705054702308/address_radio_checked.png' : 'https://udstatic.imeik.com/pcUploads/1693996521726/address_radio.png'"
            @click="isDefault = !isDefault"
          ></image>
        </view>
      </scroll-view>

      <x-footer>
        <x-btn radius="32rpx" :disabled="submitting" @click="submitFn">保存</x-btn>
      </x-footer>
    </uni-transition>
    <x-toast ref="toast" />
  </view>
</template>

<script>
import { iclubApiUserReceiveAddressAdd, iclubApiUserReceiveAddressGet, iclubApiUserReceiveAddressEdit } from '@/http/mine'
import { isMobile } from '@/utils/validate'

export default {
  data() {
    return {
      loading: true,
      address: {
        receiver: '', // 收货人名
        phone: '', // 手机号
        areaCodes: [], // 省市区codes
        fullname: '', // 省市区
        detailAddress: '' // 详细地址
      },
      isDefault: false,
      submitting: false,
      inputAddress: {},
      fields: [
        {
          code: 'receiver',
          label: '收货人',
          required: true,
          type: 'form-input',
          props: {
            showWordLimit: true,
            max: 10,
            min: 1
          }
        },
        {
          code: 'phone',
          label: '手机号',
          required: true,
          type: 'form-input',
          inputType: 'number',
          props: {
            max: 11,
            min: 1
          }
        },
        {
          code: 'areaCodes',
          label: '所在地区',
          required: true,
          type: 'form-address',
          nameKey: 'fullname',
          props: {
            depth: 3
          }
        },
        {
          code: 'detailAddress',
          label: '详细地址',
          required: true,
          type: 'form-input',
          inputType: 'textarea',
          props: {
            max: 40,
            min: 1
          }
        }
      ],
      objectCode: ''
    }
  },
  onLoad(options) {
    wx.hideShareMenu({})
    this.objectCode = options.objectCode

    if (this.objectCode) {
      this.getDetail()
    }
    setTimeout(() => {
      this.loading = false
    }, 600)
  },
  methods: {
    // 表单提交
    submitFn() {
      this.$refs.bf.handleSubmit().then((res) => {
        console.log('44444')
        const data = { ...res }

        if (!isMobile(data.phone)) {
          this.$refs.toast.show({
            message: '请填写正确的手机号'
          })
          return
        }
        if (this.submitting) return

        this.submitting = true
        data.provinceCode = data.areaCodes[0] || ''
        data.cityCode = data.areaCodes[1] || ''
        data.areaCode = data.areaCodes[2] || ''
        const parts = this.address.fullname.split(' ')
        // 此时parts数组包含前两个部分，我们需要获取第三个部分
        const thirdPart = this.address.fullname.substring(parts[0].length + parts[1].length + 2) // 加2是为了跳过两个空格

        data.provinceName = parts[0]
        data.cityName = parts[1]
        data.areaName = thirdPart
        data.fullname = this.address.fullname || ''
        data.defaultFlag = this.isDefault ? '1' : '2'
        delete data.areaCodes
        let api = iclubApiUserReceiveAddressAdd
        if (this.objectCode) {
          api = iclubApiUserReceiveAddressEdit
          data.objectCode = this.objectCode
        }
        api(data)
          .then((res) => {
            if (res.code === 200) {
              this.$refs.toast.show({
                message: '保存成功',
                complete() {
                  uni.navigateBack()
                }
              })
            }
            // this.submitting = false
          })
          .catch((e) => {
            this.submitting = false
            this.$refs.toast.show({
              message: e.message || '保存失败'
            })
          })
      })
    },

    // 获取详情
    getDetail() {
      iclubApiUserReceiveAddressGet({ objectCode: this.objectCode })
        .then((res) => {
          const data = res || {}
          const info = {
            areaCodes: [data.provinceCode, data.cityCode, data.areaCode].filter((i) => !!i),
            detailAddress: data.detailAddress,
            fullname: data.fullname,
            receiver: data.receiver,
            phone: data.phone
          }

          this.address = { ...info }
          this.inputAddress = { ...info }
          this.isDefault = data.defaultFlag === '1'
        })
        .catch((err) => {
          this.$refs.toast.show({
            message: err.message || '获取地址失败'
          })
        })
    }
  }
}
</script>

<style lang="scss">
@import '@/components/form/style.scss';
</style>
<style lang="scss" scoped>
::v-deep .uni-forms-item__inner {
  align-items: start !important;
}

::v-deep .ik-form-wrap textarea {
  height: 120rpx;
  margin-top: 12rpx;
}

.address-manage {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  font-family: PingFangSC-Regular, 'PingFang SC';
  background: #f7f7f9;

  .list-wrap {
    width: 702rpx;
    height: 100%;
    margin: 24rpx;
    overflow: hidden;
    border-radius: 16rpx;

    .address-form {
      padding: 8rpx 32rpx 0;
      background: #fff;
      border-radius: 32rpx;
    }

    .default-set {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 144rpx;
      margin-top: 24rpx;
      padding: 0 32rpx;
      font-size: 30rpx;
      background: #fff;
      border-radius: 32rpx;

      image {
        width: 32rpx;
        height: 32rpx;
        margin-right: 8rpx;
        margin-bottom: 8rpx;
        vertical-align: middle;
      }
    }
  }
}
</style>
