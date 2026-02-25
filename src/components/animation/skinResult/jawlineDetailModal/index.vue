<template>
    <view catchtouchmove class="mask">
        <scroll-view class="modal" :scrollY="true">
            <view class="tabs" :style="'margin-top: ' + (styleTop + 12) + 'px'">
                <view :class="'tab-item ' + (activeTab === item.label ? 'active' : '')" :data-key="item.label" v-for="(item, index) in tabs" :key="index">{{ item.label }}</view>
            </view>
            <view class="body">
                <view class="wrap">
                    <image
                        class="top-left"
                        mode="aspectFill"
                        src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/modal/AnimationTipTL.png"
                    ></image>
                    <image
                        class="top-right"
                        mode="aspectFill"
                        src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/modal/AnimationTipBL.png"
                    ></image>
                    <image
                        class="bottom-left"
                        mode="aspectFill"
                        src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/modal/AnimationTipBL.png"
                    ></image>
                    <image
                        class="bottom-right"
                        mode="aspectFill"
                        src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/modal/AnimationTipTL.png"
                    ></image>
                    <view class="border1">
                        <view class="border2">
                            <view class="border3">
                                <swiper @change="swiperChange" class="swiper" :current="activeDot">
                                    <swiper-item class="image-wrap">
                                        <view class="image" style=" top: 0; left: 0;width: 100%; height: 100%">
                                            <image class="img" mode="aspectFill" :src="showLeft ? images[0] : images[1]"></image>
                                        </view>
                                    </swiper-item>
                                </swiper>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="paginations">
                    <view class="pagination">
                        <view class="dot active"></view>
                    </view>
                    <view class="checkout" v-if="activeTab === '脸颊'">
                        <text class="text">{{ showLeft ? '左' : '右' }}</text>
                        <image @tap="checkout" class="icon" src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/checkout.png"></image>
                    </view>
                </view>
                <view class="overview">
                    <view class="item">
                        <view class="label">下颌线程度</view>
                        <view class="text">{{ score > 90 ? '优秀' : '轻度' }}</view>
                    </view>
                    <view class="item">
                        <view class="label">下颌线角度</view>
                        <view class="text">{{ showLeft ? '左' : '右' }}脸颊{{ angles[showLeft ? 'left' : 'right'] }}度</view>
                    </view>
                </view>
            </view>
            <view @tap="close" class="close"></view>
        </scroll-view>
    </view>
</template>

<script>
import detailModalImage from '../detailModalImage/index';
// import modal from "../../modal/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// import navigation from "../../navigation/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
var app = getApp();
var defaultTabs = [
    {
        label: '脸颊'
    }
];
export default {
    components: {
        detailModalImage
    },
    data() {
        return {
            activeTab: defaultTabs[0].label,
            tabs: [
                {
                    label: '脸颊'
                }
            ],
            activeDot: 0,
            showLeft: true,
            styleTop: app.globalData.MenuButtonBottom
        };
    },
    props: {
        angles: Object,
        score: Number,
        images: Array
    },
    /**
     * 组件的方法列表
     */
    methods: {
        close: function close() {
            this.$emit('cancel');
        },
        swiperChange: function swiperChange(e) {
            this.setData({
                activeDot: e.detail.current
            });
        },
        checkout: function checkout() {
            var showLeft = !this.showLeft;
            this.setData({
                showLeft: showLeft
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
