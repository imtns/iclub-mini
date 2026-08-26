<template>
    <view class="section">
        <view class="header">
            <view class="title">{{ title }}</view>
            <block v-if="showLabel">
                <view class="score" v-if="label.length">{{ label }}</view>
                <view class="score" v-else>
                    {{ score }}分
                    <text v-if="score < 50">重度</text>
                    <text v-else-if="score < 70">中度</text>
                    <text v-else-if="score < 90">轻度</text>
                    <text v-else></text>
                </view>
            </block>
        </view>
        <slot></slot>
        <view class="desc-wrap">
            <view class="title">{{ desc.result }}</view>
            <view class="text">{{ desc.copywriting }}</view>
        </view>
    </view>
</template>

<script>
// import modal from "../../modal/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// import navigation from "../../navigation/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// compponents/result/section/index.ts
export default {
    components: {},
    data() {
        return {};
    },
    /**
     * 组件的属性列表
     */
    props: {
        title: String,
        score: Number,
        label: String,
        showLabel: {
            type: Boolean,
            default: true
        },
        desc: {
            type: Object,
            default: () => ({})
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
