<template>
    <view>
        <scroll-view scrollWithAnimation scrollX @scroll="onScroll" :class="'i-class i-tabs i-tabs-scroll ' + (fixed ? 'i-tabs-fixed' : '')" :scrollLeft="scrollLeft" v-if="scroll">
            <slot></slot>
        </scroll-view>
        <view :class="'i-class i-tabs ' + (fixed ? 'i-tabs-fixed' : '')" v-else>
            <slot></slot>
        </view>
    </view>
</template>

<script>
// import modal from "../../modal/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// import navigation from "../../navigation/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
export default {
    components: {},
    unicomGroup: ['tab'],
    data() {
        return {
            scrollLeft: 0,
            scrollDistance: 0,
            // scroll-view滚动的距离
            timer: null
        };
    },
    externalClasses: ['i-class'],
    relations: {
        '../tab/index': {
            type: 'child',
            linked: function linked() {
                this.changeCurrent();
            },
            linkChanged: function linkChanged() {
                this.changeCurrent();
            },
            unlinked: function unlinked() {
                this.changeCurrent();
            }
        }
    },
    props: {
        current: {
            type: String,
            default: ''
        },
        color: {
            type: String,
            default: ''
        },
        scroll: {
            type: Boolean,
            default: false
        },
        fixed: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        changeCurrent: function changeCurrent(val) {
            var that = this;
            // 此处设置计时器的目的是可以让所有的linked均执行完毕之后再执行下面逻辑
            val = val || this.current;
            clearTimeout(this.timer);
            var timer = setTimeout(function () {
                var items = that.getRelationNodes('tab');
                var len = items.length;
                var width = 100 / len + '%';
                if (len > 0) {
                    items.forEach(function (item) {
                        item.changeScroll(that.scroll);
                        item.changeCurrent(item.data.key === val);
                        if (item.data.key === val) {
                            item.scrollTo();
                        }
                        item.changeCurrentColor(that.color);
                        item.changeWidth(width);
                    });
                }
            }, 0);
            this.timer = timer;
        },
        emitEvent: function emitEvent(key) {
            this.$emit('change', {
                detail: {
                    key: key
                }
            });
        },
        onScroll: function onScroll(e) {
            var that = this;
            clearTimeout(this.timer);
            var timer = setTimeout(function () {
                var scrollDistance = e.detail.scrollLeft;
                that.scrollDistance = scrollDistance;
            }, 100);
            this.timer = timer;
        }
    },
    created: function () {},
    watch: {
        current: {
            handler: function observer(val) {
                this.changeCurrent();
            },

            immediate: true
        }
    }
};
</script>
<style>
@import './index.css';
</style>
