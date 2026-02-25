<template>
    <view @tap="onClick" class="button">
        <slot></slot>
    </view>
</template>

<script>
// import modal from "../../modal/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// import navigation from "../../navigation/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// compponents/skinResult/button/index.ts
export default {
    components: {},
    data() {
        return {};
    },
    /**
     * 组件的属性列表
     */
    props: {},
    /**
     * 组件的方法列表
     */
    methods: {
        onClick: function onClick() {
            this.$emit('click');
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
