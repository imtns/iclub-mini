<template>
    <view>
        <modal noClose title="请按图形输入正确字符" :visible="visible">
            <view class="body">
                <image class="capcha" :src="src"></image>
                <view @tap="fresh" class="tips">看不清晰？点击刷新</view>
                <input @input="input" class="input" maxlength="6" placeholder="输入图中字符" :value="code" />
                <view class="errorTip">{{ showErrorTips ? '字符不正确，请重新输入' : '' }}</view>
            </view>
            <view class="footer" slot="footer">
                <view @tap="onCancel" class="button">取消</view>
                <view @tap="onOk" :class="'button primary ' + (!code.length ? 'disabled' : '')">确认</view>
            </view>
        </modal>
    </view>
</template>

<script>
// import modal from "../modal/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// import navigation from "../navigation/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
var app = getApp();
export default {
    components: {},
    data() {
        return {
            showErrorTips: false,
            code: '',
            src: ''.concat(app.globalData.apiOrigin, '/official/captcha/get?uid=').concat(app.globalData.uid, '&ts=').concat(+new Date())
        };
    },
    /**
     * 组件的属性列表
     */
    props: {
        visible: {
            type: Boolean
        },
        error: {
            type: Boolean
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        input: function input(e) {
            this.setData({
                code: e.detail.value,
                showErrorTips: false
            });
        },
        fresh: function fresh() {
            var that = this;
            this.need().then(function () {
                that.setData({
                    showErrorTips: false,
                    code: '',
                    src: ''.concat(app.globalData.apiOrigin, '/official/wechat/captcha/get?uid=').concat(app.globalData.uid, '&ts=').concat(+new Date())
                });
            });
        },
        onCancel: function onCancel() {
            this.$emit('cancel');
        },
        onOk: function onOk() {
            this.$emit('ok', {
                detail: {
                    code: this.code
                }
            });
        },
        need: function need() {
            return app.globalData.request({
                url: '/official/wechat/captcha/need'
            });
        }
    },
    created: function () {},
    watch: {
        visible: {
            handler: function observer(visible) {
                if (visible) {
                    this.fresh();
                }
            },

            immediate: true
        },

        error: {
            handler: function observer(error) {
                this.setData({
                    showErrorTips: error
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
