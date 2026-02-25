<template>
    <view class="colors">
        <view :class="'item ' + (active === item.title ? 'active' : '')" v-for="(item, index) in colors" :key="index">
            <view class="color" :style="'background-color: ' + item.color + '; border-color: ' + item.color + '; '"></view>

            <view class="text">{{ item.title }}</view>
        </view>
    </view>
</template>

<script>
// import modal from "../../modal/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// import navigation from "../../navigation/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// compponents/skinResult/colorsExample/index.ts
export default {
    components: {},
    data() {
        return {};
    },
    /**
     * 组件的属性列表
     */
    props: {
        colors: Array,
        active: String
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
