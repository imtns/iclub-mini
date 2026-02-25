<template>
    <view class="faceArea">
        <image class="base" src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/skinFaceDegree/base-face.jpeg"></image>
        <image class="mask" :src="'https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/skinFaceDegree/' + image + '.png'" v-if="image.length"></image>
        <image
            class="mask"
            :src="'https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/result/skinFaceDegree/' + item + '.png'"
            v-if="item.length"
            v-for="(item, index) in images"
            :key="index"
        ></image>
    </view>
</template>

<script>
// import modal from "../../modal/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// import navigation from "../../navigation/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// compponents/skinResult/baseFaceImage/index.ts
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
