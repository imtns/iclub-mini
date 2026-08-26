<template>
    <view class="radarContainer">
        <canvas class="radarCanvas" id="radarCanvas" type="2d"></canvas>
    </view>
</template>

<script>
// import modal from "../../modal/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// import navigation from "../../navigation/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
var _radar = require('./radar');
export default {
    components: {},
    data() {
        return {};
    },
    /**
     * 组件的属性列表
     */
    props: {
        data: {
            type: Array
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        draw: function draw(data) {
            if (!data || !data.length) {
                return;
            }
            //获取指定的Canvas
            uni.createSelectorQuery()
                .in(this)
                .select('#radarCanvas')
                .fields({
                    node: true,
                    size: true
                })
                .exec(function (res) {
                    var canvas = res[0].node;
                    var ctx = canvas.getContext('2d');
                    var dpr = uni.getSystemInfoSync().pixelRatio;
                    var size = parseInt(res[0].width);
                    canvas.width = res[0].width * dpr;
                    canvas.height = res[0].height * dpr;
                    ctx.clearRect(0, 0, canvas.width, canvas.heihgt);
                    ctx.scale(dpr, dpr);
                    (0, _radar.drawRadar)(ctx, data, size);
                });
        }
    },
    created: function () {},
    watch: {
        data: {
            handler: function observer(data) {
                this.draw(data);
            },

            immediate: true,
            deep: true
        }
    }
};
</script>
<style>
@import './index.css';
</style>
