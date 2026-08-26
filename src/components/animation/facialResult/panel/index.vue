<template>
    <view class="panel">
        <view class="image-wrap">
            <image
                class="image"
                :src="'https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/facial/' + item + '.png'"
                v-for="(item, index) in images"
                :key="index"
            ></image>
        </view>
        <view class="section" v-for="(item, index) in copywritings" :key="index">
            <view class="title">{{ item.title }}</view>

            <view class="desc">{{ item.desc }}</view>
        </view>
    </view>
</template>

<script>
// import modal from "../../modal/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// import navigation from "../../navigation/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// compponents/facialResult/panel/index.ts
export default {
    components: {},
    data() {
        return {};
    },
    /**
     * 组件的属性列表
     */
    props: {
        images: Array,
        copywritings: Array
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
