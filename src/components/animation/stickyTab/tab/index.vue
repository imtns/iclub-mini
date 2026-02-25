<template>
    <view
        @tap="handleClickItem"
        :class="'i-class i-tabs-tab ' + (scroll ? 'i-tabs-tab-scroll' : '') + ' ' + (current ? 'i-tabs-tab-current' : '')"
        :style="!scroll ? 'width:' + width : ''"
    >
        <view>
            <view :class="'i-tabs-tab-title ' + (current ? 'i-tabs-tab-title-current' : '')" :style="'color: ' + currentColor" v-if="current && currentColor">{{ title }}</view>
            <view :class="'i-tabs-tab-title  i-class-title ' + (current ? 'i-tabs-tab-title-current' : '')" v-else>{{ title }}</view>
        </view>
        <view class="i-tabs-tab-bar i-class-tab-bar" :style="'background: ' + currentColor" v-if="current"></view>
    </view>
</template>

<script>
// import modal from "../../modal/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// import navigation from "../../navigation/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
export default {
    components: {},
    unicomGroup: ['tabs'],
    data() {
        return {
            current: false,
            currentColor: '',
            width: 0,
            scroll: false,
            scrollLeft: ''
        };
    },
    externalClasses: ['i-class', 'i-class-title', 'i-class-tab-bar'],
    relations: {
        '../tabs/index': {
            type: 'parent'
        }
    },
    props: {
        key: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        }
    },
    mounted() {
        // 处理小程序 ready 生命周期
        this.$nextTick(() => this.ready());
    },
    methods: {
        ready: function ready() {},

        changeCurrent: function changeCurrent(current) {
            this.setData({
                current: current
            });
        },

        changeCurrentColor: function changeCurrentColor(currentColor) {
            this.setData({
                currentColor: currentColor
            });
        },

        changeScroll: function changeScroll(scroll) {
            this.setData({
                scroll: scroll
            });
        },

        changeWidth: function changeWidth(width) {
            this.setData({
                width: width
            });
        },

        handleClickItem: function handleClickItem(e) {
            var parent = this.getRelationNodes('tabs')[0];
            parent.emitEvent(this.key);
        },

        scrollTo: function scrollTo() {
            var itemWidth = 0;
            var parent = this.getRelationNodes('tabs')[0];
            var query = uni.createSelectorQuery().in(this);
            query
                .select('.i-tabs-tab')
                .boundingClientRect(function (res) {
                    if (!res) {
                        return;
                    }
                    itemWidth = res.width;
                    var windowWidth = uni.getSystemInfoSync().windowWidth;
                    var scrollLeft = 0;
                    scrollLeft = res.left - windowWidth / 2;
                    var scrollDistance = parent.data.scrollDistance;
                    parent.setData({
                        scrollLeft: scrollLeft + scrollDistance + itemWidth / 2
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
