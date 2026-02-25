<template>
    <view>
        <modal @close="close" title="拍摄教程" :visible="visible">
            <view class="body">
                <view class="item">
                    <view class="text">
                        <view class="index">1</view>
                        脸部无遮挡，无眼镜
                    </view>
                    <image class="pic" src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/takePhoto/tipsModal-1.jpeg"></image>
                </view>
                <view class="item">
                    <view class="text">
                        <view class="index">2</view>
                        平视摄像头
                    </view>
                    <image class="pic" src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/takePhoto/tipsModal-2.jpeg"></image>
                </view>
                <view class="item">
                    <view class="text">
                        <view class="index">3</view>
                        面部光线充足
                    </view>
                    <image class="pic" src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/takePhoto/tipsModal-3.jpeg"></image>
                </view>
                <view class="item">
                    <view class="text">
                        <view class="index">4</view>
                        打开闪光灯
                    </view>
                    <image class="pic" src="https://cdn.faceplusplus.com.cn/wechat-miniprogram-skin-demo/assets/images/takePhoto/tipsModal-4.jpeg"></image>
                </view>
                <view class="timeout">{{ timeout }}秒后关闭</view>
            </view>
        </modal>
    </view>
</template>

<script>
// import modal from "../modal/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// import navigation from "../navigation/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// compponents/tipsModal/index.ts
export default {
    components: {},
    data() {
        return {
            timeout: 3,
            timer_var: null
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        visible: Boolean
    },
    watch: {
        visible: function visible(_visible) {
            if (_visible) {
                this.setData({
                    timeout: 3
                });
                this.setTimer();
            } else if (this._timer) {
                clearTimeout(this._timer);
            }
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        close: function close() {
            this.$emit('cancel');
        },
        setTimer: function setTimer() {
            var that = this;
            var _timer = setTimeout(function () {
                that.setData(
                    {
                        timeout: that.timeout - 1
                    },
                    function () {
                        if (!that.visible) {
                            return;
                        }
                        if (that.timeout >= 1) {
                            that.setTimer();
                            return;
                        }
                        that.close();
                    }
                );
            }, 1000);
            this.setData({
                timer_var: _timer
            });
        }
    },
    created: function () {}
};
</script>
<style>
@import './index.css';
</style>
