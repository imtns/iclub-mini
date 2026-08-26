<template>
    <view class="wrap" :style="rectStyle">
        <view class="top-left"></view>
        <view class="top-right"></view>
        <view class="bottom-left"></view>
        <view class="bottom-right"></view>
        <view class="border1">
            <view class="border2">
                <view class="border3">
                    <image class="img" :src="originImage"></image>
                    <image class="img" :src="image"></image>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// import modal from "../../modal/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// import navigation from "../../navigation/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// compponents/skinResult/detailModalImage/index.ts
export default {
    components: {},
    data() {
        return {};
    },
    /**
     * 组件的属性列表
     */
    props: {
        rectStyle: Object,
        originImage: String,
        image: String
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
