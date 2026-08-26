<template>
    <view class="navigation" :style="'height: ' + MenuButtonBottom + 'px;'">
        <view class="mask"></view>
        <view class="title" :style="'top: ' + (menuButtonCenter - 11) + 'px; color: ' + (returnIcon !== 'dark' ? '#fff' : '#000')">{{ title }}</view>
        <image
            @tap="returnFun"
            class="return"
            :src="'https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/return' + (returnIcon === 'dark' ? '-dark' : '') + '.png'"
            :style="'top: ' + (menuButtonCenter - 9) + 'px;'"
        ></image>
    </view>
</template>

<script>
// import modal from "../modal/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// import navigation from "./index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
var app = getApp();
export default {
    components: {},
    data() {
        return {
            menuButtonCenter: app.globalData.menuButtonCenter,
            MenuButtonBottom: app.globalData.MenuButtonBottom
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        title: String,
        returnIcon: String
    },
    /**
     * 组件的方法列表
     */
    methods: {
        returnFun: function _return() {
            this.$emit('return');
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
