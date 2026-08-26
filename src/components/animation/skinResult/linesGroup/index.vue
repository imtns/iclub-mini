<template>
    <view class="linesGroup">
        <view class="group">
            <view class="item" v-for="(item, index) in list" :key="index">
                <view class="title">{{ item.title }}</view>

                <view class="line" :style="'background-color: ' + colorBackgroundLine + '; width: ' + lineWidth + '%;'">
                    <view class="strong" :style="'background-color: ' + color + '; width: ' + item.score + '%'"></view>
                </view>
            </view>
            <view class="labels" :style="'width: ' + lineWidth + '%;'">
                <view class="dashed1">
                    <text class="text">轻度</text>
                </view>
                <view class="dashed2">
                    <text class="text">中度</text>
                </view>
                <view class="dashed3">
                    <text class="text">重度</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
// import modal from "../../modal/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// import navigation from "../../navigation/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// compponents/skinResult/linesGroup/index.ts
export default {
    components: {},
    data() {
        return {};
    },
    /**
     * 组件的属性列表
     */
    props: {
        colorBackgroundLine: {
            type: String,
            default: 'rgba(255, 122, 151, .1)'
        },
        color: {
            type: String,
            default: '#FF7A97'
        },
        list: Array,
        lineWidth: {
            type: Number,
            default: 85
        }
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
