<template>
  <view class="block">

    <view class="muster">
      <picker
        class="pickerList"
        mode="selector"
        :range="provinceList"
        range-key="label"
        :value="provinceIndex"
        @change="pickerChange">
        <view class="select-city">
          <view class="input" v-if="selectedProvince !== ''">{{ selectedProvince }}<text class="iplus icon-arrow-down" /></view>
          <slot v-else></slot>
          <text class="iconfont icon-xiangyou"></text>
        </view>
      </picker>
    </view>
  </view>
</template>

<script>
  import { regionData } from 'element-china-area-data';

  export default {
    data() {
      return {
        provinceList: [],
        provinceIndex: 0,
        selectedProvince: '',
      };
    },
    mounted() {
      this.initializeProvinces();
    },
    methods: {
      initializeProvinces() {
        this.provinceList = [{ label: '全国', value: 'all' }];
        this.provinceList.push(...regionData.map(province => ({
          label: province.label,
          value: province.value
        })));
      },
      pickerChange(e) {
        console.log(e)
        this.provinceIndex = e.detail.value;
        this.provinceList=this.provinceList.map((item)=>{
          item.label = item.label==='全国'?'全部':item.label
          return item
        })
        this.$emit('change',this.provinceList[e.detail.value].label)

        this.selectedProvince = this.provinceList[e.detail.value].label;
      },
    },
  };
</script>

<style lang="scss" scoped>
  /* Add your styles here */
  .select-city {
    padding-right: 10px;
  }
  .iplus {
    margin-left: 8rpx;
    color: #6c7770;
    font-size: 24rpx;
  }
</style>
