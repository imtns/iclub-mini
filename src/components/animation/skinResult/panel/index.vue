<template>
    <view class="panel">
        <view class="header">
            <view class="msg">
                <image class="icon" :src="'https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/skinicon/' + icon + '.jpeg'"></image>
                <view class="content">
                    <view class="title">{{ title }}</view>
                    <view class="desc" v-if="Boolean">
                        <view class="score">{{ score }}</view>
                        分
                    </view>
                </view>
            </view>
            <block v-if="!noTag">
                <image class="tag" src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/skinicon/4.png" v-if="score < 50"></image>
                <image class="tag" src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/skinicon/3.png" v-else-if="score < 70"></image>
                <image class="tag" src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/skinicon/2.png" v-else-if="score < 90"></image>
                <image class="tag" src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/skinicon/1.png" v-else></image>
            </block>
        </view>
        <slot></slot>
    </view>
</template>

<script>
import panel from '../panel/index';
// import modal from "../../modal/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// import navigation from "../../navigation/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// compponents/result/panel/index.ts
export default {
    components: {
        panel
    },
    data() {
        return {
            Boolean: ''
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        icon: String,
        score: Number,
        tag: String,
        title: String,
        showScore: {
            type: Boolean,
            default: true
        },
        noTag: Boolean
    },
    /**
     * 组件的方法列表
     */
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
