<template>
    <view class="i-sticky-item">
        <slot></slot>
    </view>
</template>

<script>
// import modal from "../../modal/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// import navigation from "../../navigation/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// components/sticky-item/index.js
export default {
    components: {},
    unicomGroup: ['sticky'],
    data() {
        return {};
    },
    /**
     * 组件的属性列表
     */
    relations: {
        '../sticky/index': {
            type: 'parent'
        }
    },
    props: {},
    /**
     * 组件的方法列表
     */
    methods: {
        updateDataChange: function updateDataChange(index) {
            var className = '.i-sticky-item';
            var query = uni.createSelectorQuery().in(this);
            var parent = this.getRelationNodes('sticky')[0];
            var boxTopArr = parent.data.boxTopArr;
            var length = boxTopArr.length;
            query
                .select(className)
                .boundingClientRect(function (res) {
                    parent.addChildHeightToArr({
                        height: res.height,
                        bottom: res.bottom
                    });
                })
                .exec();
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
