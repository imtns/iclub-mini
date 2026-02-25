<template>
    <view class="ringWrap">
        <view class="ring" :style="'border-color: ' + color + ';'">
            <view class="ringLeft" :style="'border-top-color: ' + strongColor + '; border-left-color: ' + strongColor + '; transform: rotateZ(' + angle + 'deg);'"></view>
            <view class="ringHalf" :style="'border-top-color: ' + color + '; border-left-color: ' + color + ';'"></view>
            <view
                class="ringRight"
                :style="'border-top-color: ' + strongColor + '; border-left-color: ' + strongColor + '; transform: rotateZ(' + (degree === 2 ? 180 : -45) + 'deg);'"
                v-if="degree > 1"
            ></view>
            <view class="text">{{ text }}</view>
        </view>
        <view class="title">{{ title }}</view>
    </view>
</template>

<script>
// import modal from "../../modal/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// import navigation from "../../navigation/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// compponents/skinResult/ring/index.ts
export default {
    components: {},
    data() {
        return {
            text: '无',
            angle: -45
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        title: String,
        degree: {
            type: Number
        },
        color: String,
        strongColor: String
    },
    /**
     * 组件的方法列表
     */
    methods: {},
    created: function () {},
    watch: {
        degree: {
            handler: function observer(degree) {
                var text = '无';
                var angle = -45;
                if (degree === 1) {
                    text = '轻度';
                    angle = 90;
                } else if (degree === 2) {
                    text = '中度';
                    angle = 135;
                } else if (degree === 3) {
                    text = '重度';
                    angle = 135;
                }
                this.setData({
                    text: text,
                    angle: angle
                });
            },

            immediate: true
        }
    }
};
</script>
<style>
@import './index.css';
</style>
