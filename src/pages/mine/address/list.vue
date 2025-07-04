<template>
  <x-content :loading="loading">
    <view class="address-list" @tap.native.stop="$elementTracker">
      <view v-if="addressList && addressList.length && !loading" class="top" :class="isManage ? 'active' : ''" @click="changeManage">
        <image :src="manageUrl"></image>
        <text>{{ isManage ? '完成' : '管理' }}</text>
      </view>

      <view v-if="(!addressList || !addressList.length) && !loading" class="list-status">
        <x-empty :img-width="352" type="dizhi">暂无地址~</x-empty>
      </view>
      <scroll-view v-if="addressList && addressList.length && !loading" class="list-wrap" :enable-back-to-top="true" :scroll-y="true" :show-scrollbar="false">
        <uni-transition :show="!loading" mode="fade" :duration="800">
          <view v-for="(add, index) in addressList" :key="index" class="address-item" :class="isManage ? 'active' : ''">
            <view class="flex" :class="[isManage ? '' : 'address-item-border']">
              <view class="tag">{{ (add.receiver && add.receiver.substr(-2)) || '' }}</view>
              <view class="info" @click="goOrder(add)">
                <view class="basic">
                  <text class="name">{{ add.receiver }}</text>
                  <text>{{ add.phone }}</text>
                  <view v-if="add.defaultFlag === '1'" class="default-tag">默认</view>
                </view>
                <view class="addressText">{{ add.fullname }} {{ add.detailAddress }}</view>
              </view>
              <view class="edit" @click="editAddress(add)">
                <image src="https://udstatic.imeik.com/pcUploads/1693994382435/address_edit.png"></image>
              </view>
            </view>
            <view v-if="isManage" class="operate flex">
              <view style="color: #696f77" class="default-set">
                <image
                  :src="
                    add.defaultFlag === '1' ? 'https://udstatic.imeik.com/pcUploads/1705054702308/address_radio_checked.png' : 'https://udstatic.imeik.com/pcUploads/1693996521726/address_radio.png'
                  "
                  @click="setDefaultAddress(add)"
                ></image>
                默认地址
              </view>
              <view style="color: #696f77" @click="deleteAddress(add)">删除</view>
            </view>
          </view>
        </uni-transition>
      </scroll-view>
      <x-footer v-if="!isManage">
        <view class="submitBtn" type="default" @click="addAddress">
          <image class="image" src="https://udstatic.imeik.com/pcUploads/1695296574059/wode.png" />
          <view>添加收货地址</view>
        </view>
      </x-footer>
      <x-pop v-model="showReviewPop" cancel @confirm="submit(true)"> 确认删除该地址吗? </x-pop>
    </view>
    <x-toast ref="toast"></x-toast>
  </x-content>
</template>

<script>
import { iclubApiUserReceiveAddressList, iclubApiUserReceiveAddressDelete, iclubApiUserReceiveAddressManage } from '@/http/mine'
import { ls } from '@/utils/util'

export default {
  data() {
    return {
      addressList: [],
      loading: true,
      submiting: false,
      showReviewPop: false,
      isManage: false,
      type: undefined,
      code: ''
    }
  },
  computed: {
    manageUrl() {
      return this.isManage ? 'https://udstatic.imeik.com/pcUploads/1706495900199/icon_wode_guanlixuanzhong%402x.png' : 'https://udstatic.imeik.com/pcUploads/1693994584947/address_manage.png'
    }
  },
  onLoad(options) {
    wx.hideShareMenu({})
    this.type = options.type
  },
  onShow() {
    this.isManage = false
    this.getList()
  },
  methods: {
    // 添加地址
    addAddress() {
      uni.navigateTo({
        url: '/pages/mine/address/manage'
      })
    },
    goOrder(row) {
      if (this.type === '1') {
        return
      }
      console.log('row', row)

      ls('address', row)
      ls('addressId', row.objectCode)
      this.$store.commit('setAddressId', row.objectCode)
      uni.navigateBack()
    },
    // 编辑地址
    editAddress(row) {
      uni.navigateTo({
        url: '/pages/mine/address/manage?objectCode=' + row.objectCode
      })
    },

    // 删除地址
    deleteAddress(row) {
      this.showReviewPop = true
      this.code = row.objectCode

      ls('address', '')
    },
    submit() {
      this.showReviewPop = false
      iclubApiUserReceiveAddressDelete({
        objectCode: this.code
      })
        .then((_) => {
          this.$refs.toast.show({
            message: '删除成功'
          })
          this.isManage = false
          this.getList()
        })
        .catch((e) => {
          this.$refs.toast.show({
            message: e.message
          })
        })
    },

    // 设置默认地址
    setDefaultAddress(row) {
      const def = row.defaultFlag
      this.addressList.forEach((i) => {
        i.defaultFlag = '2'
      })

      row.defaultFlag = def === '1' ? '2' : '1'
    },

    // 管理 - 完成
    changeManage() {
      if (this.submiting) {
        return
      }

      if (this.isManage) {
        this.submiting = true
        const item = this.addressList.find((i) => i.defaultFlag === '1')

        iclubApiUserReceiveAddressManage({
          objectCode: (item && item.objectCode) || ''
        })
          .then((_) => {
            this.isManage = false
            this.submiting = false
            this.getList()
          })
          .catch((e) => {
            this.submiting = false
            this.$refs.toast.show({
              message: e.message
            })
          })
      } else {
        this.isManage = true
      }
    },

    // 获取列表
    getList() {
      iclubApiUserReceiveAddressList()
        .then((data) => {
          this.addressList = data || []
          setTimeout(() => {
            this.loading = false
          }, 300)
        })
        .catch((e) => {
          setTimeout(() => {
            this.loading = false
            this.$refs.toast.show({
              message: e.message
            })
          }, 300)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.address-list {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  font-family: PingFangSC-Regular, 'PingFang SC';
  background: #f7f7f9;

  .flex {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .top {
    display: flex;
    align-items: center;
    width: 124rpx;
    height: 48rpx;
    margin: 24rpx 24rpx 0;
    color: #29323d;
    font-weight: 400;
    font-size: 26rpx;
    line-height: 48rpx;
    background: #fff;
    border: 2rpx solid #979797;
    border-radius: 24rpx;

    &.active {
      color: #366bd5;
      border: 2rpx solid #366bd5;
    }

    image {
      width: 32rpx;
      height: 32rpx;
      margin: 8rpx 8rpx 8rpx 16rpx;
    }
  }

  .list-wrap {
    width: 702rpx;
    height: 100%;
    margin: 24rpx 24rpx 48rpx;
    overflow: hidden;
    border-radius: 32rpx;

    .address-item {
      padding: 36rpx 24rpx 0rpx;
      background: #fff;
      .address-item-border {
        padding-bottom: 26rpx;
        border-bottom: 2rpx solid #eee;
      }
      &.address-item-border:last-child {
        border-bottom: none;
      }
      &.active {
        margin-bottom: 24rpx;
        border-bottom: none;
        border-radius: 16rpx !important;
      }

      &:first-child {
        border-radius: 32rpx 32rpx 0 0;
      }

      &:last-child {
        border-bottom: none;
        border-radius: 0 0 32rpx 32rpx;
      }

      .tag {
        width: 64rpx;
        height: 64rpx;
        margin-right: 16rpx;
        color: #fff;
        font-weight: 500;
        font-size: 22rpx;
        line-height: 64rpx;
        text-align: center;
        background: #366bd5;
        border-radius: 50%;
      }

      .info {
        flex: 1;
        margin-right: 48rpx;
        color: #29323d;
        font-size: 24rpx;
        line-height: 34rpx;

        .basic {
          display: flex;
          align-items: center;
          margin: 0 16rpx 8rpx 0;
        }

        .addressText {
          color: #696f77;
          font-size: 26rpx;
        }

        .name {
          display: -webkit-box;
          margin-right: 16rpx;
          overflow: hidden;
          color: #29323d;
          font-weight: 600;
          font-size: 30rpx;
          line-height: 42rpx;
          text-overflow: -o-ellipsis-lastline;
          text-overflow: ellipsis;
          -webkit-line-clamp: 1;
          line-clamp: 1;
          -webkit-box-orient: vertical;
        }

        .default-tag {
          display: inline-block;
          height: 36rpx;
          margin-left: 16rpx;
          padding: 0 8rpx;
          color: #366bd5;
          font-weight: 800;
          font-size: 20rpx;
          line-height: 36rpx;
          text-align: center;
          word-break: keep-all;
          background: #e1eaff;
          border-radius: 8rpx;
        }
      }

      .edit {
        position: absolute;
        top: 8rpx;
        right: 0;
        image {
          width: 32rpx;
          height: 32rpx;
        }
      }

      .operate {
        margin-top: 24rpx;
        margin-left: 80rpx;
        padding-top: 24rpx;
        padding-bottom: 18rpx;
        color: #29323d;
        font-weight: 400;
        font-size: 26rpx;
        line-height: 36rpx;
        border-top: 2rpx solid #eee;

        .default-set {
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
    .address-item:last-of-type > .address-item-border {
      border-bottom: none;
    }
  }

  .list-status {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    vertical-align: middle;

    .list-empty {
      width: 300rpx;
      height: 232rpx;
    }

    .no-data {
      color: #7f7f7f;
      font-weight: 400;
      font-size: 28rpx;
      line-height: 40rpx;
      text-align: center;
    }
  }

  .submitBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 88rpx;
    color: #fff;
    font-size: 28rpx;
    font-family: PingFangSC, 'PingFang SC';
    background-color: #366bd5;
    border-radius: 32rpx;

    .image {
      width: 32rpx;
      min-width: 32rpx;
      height: 32rpx;
      margin-right: 16rpx;
    }
  }
}
</style>
