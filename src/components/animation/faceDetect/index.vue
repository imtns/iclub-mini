<template>
    <view class="content">
        <image
            class="faceArea"
            :src="'https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/takePhoto/' + faceDirection + '-normal.png'"
            v-if="faceState === 0"
        ></image>
        <image
            class="faceArea"
            :src="'https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/takePhoto/' + faceDirection + '-error.png'"
            v-else-if="faceState === 1"
        ></image>
        <image
            class="faceArea"
            :src="'https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/takePhoto/' + faceDirection + '-success.png'"
            v-else-if="faceState === 2"
        ></image>
        <view class="tips">{{ faceDesc }}</view>
    </view>
</template>

<script>
// import modal from "../modal/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// import navigation from "../navigation/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
var _faceVerify = require('../../utils/faceVerify');
export default {
    components: {},
    data() {
        return {
            faceDesc: ''
        };
    },
    options: {
        pureDataPattern: /^_/
    },
    props: {
        faceState: Number,
        voiceType: String,
        faceDirection: String
    },
    watch: {
        voiceType: function voiceType(_voiceType) {
            this.setData({
                faceDesc: _faceVerify.voiceSourceMap[_voiceType]
            });
        }
    },
    methods: {},
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
