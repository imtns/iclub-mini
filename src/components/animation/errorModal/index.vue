<template>
    <view>
        <modal noClose :visible="visible">
            <view @tap="fresh" class="tips">{{ error }}</view>
            <view class="footer" slot="footer">
                <view @tap="onCancel" class="button primary">确定</view>
            </view>
        </modal>
    </view>
</template>

<script>
// import modal from "../modal/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// import navigation from "../navigation/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
export default {
    components: {},
    data() {
        return {};
    },
    /**
     * 组件的属性列表
     */
    props: {
        visible: Boolean,
        error: String
    },
    methods: {
        onCancel: function onCancel() {
            this.$emit('cancel');
        },

        fresh() {
            console.log('占位：函数 fresh 未声明');
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
