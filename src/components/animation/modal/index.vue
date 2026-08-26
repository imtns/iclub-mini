<template>
    <view>
        <view class="mask" v-if="visible"></view>
        <view class="modal" v-if="visible">
            <view class="title" v-if="title">
                {{ title }}
                <image @tap="close" class="close" src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/takePhoto/close.png" v-if="!noClose"></image>
            </view>
            <view class="body">
                <slot></slot>
            </view>
            <slot name="footer"></slot>
        </view>
    </view>
</template>

<script>
// import modal from "./index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// import navigation from "../navigation/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// compponents/modal/index.ts
export default {
    components: {},
    data() {
        return {};
    },
    options: {
        multipleSlots: true
    },
    /**
     * 组件的属性列表
     */
    props: {
        title: String,
        visible: Boolean,
        noClose: Boolean
    },
    /**
     * 组件的方法列表
     */
    methods: {
        close: function close() {
            this.$emit('close');
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
