<template>
    <view class="i-sticky i-class">
        <view class="header">
            <tabs @change="onTabsChange" color="rgba(255, 122, 151, 1)" :current="currentTab" iClass="custom-sticky-tabs" :scroll="scrollTab">
                <tab
                    :iClass="'custom-sticky-tab ' + (index === 0 ? 'first' : index === tabList.length - 1 ? 'end' : '')"
                    iClassTabBar="custom-sticky-tab-bar"
                    iClassTitle="custom-sticky-tab-title"
                    :key="index"
                    :title="item.label"
                    v-for="(item, index) in tabList"
                ></tab>
            </tabs>
        </view>
        <slot></slot>
    </view>
</template>

<script>
import tabs from '../tabs/index';
import tab from '../tab/index';
// import modal from "../../modal/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// import navigation from "../../navigation/index"; // PS: 此组件与全局组件重名，已注释（可能误判，请开发者根据实际情况处理）。
// components/sticky/index.js
var windowHeight = uni.getSystemInfoSync().windowHeight;

// 页面高度
export default {
    components: {
        tabs,
        tab
    },
    unicomGroup: ['sticky-item'],
    data() {
        return {
            top: 0,
            // 距离顶部的距离
            timer: null,
            currentTab: 0,
            boxTopArr: [],
            // 存放子组件高度的数组
            scrollLock: false,
            // 点击tab时对滚动加锁
            offset: 0,
            // 偏移量
            lastChildBottom: 0,
            // 最后一个sticky-item的bottom
            childLength: 0
        };
    },
    /**
     * 组件的属性列表
     */
    options: {},
    relations: {
        '../sticky-item/index': {
            type: 'child',
            linked: function linked() {
                this.updateDataChangeFun();
            },
            linkChanged: function linkChanged() {
                this.updateDataChangeFun();
            },
            unlinked: function unlinked() {
                this.updateDataChangeFun();
            }
        }
    },
    props: {
        scrollTab: {
            type: Boolean
        },
        anchorPosition: {
            type: Number,
            default: 0
        },
        scrollTop: {
            type: Number
        },
        tabList: Array,
        sync: {
            // sticky-item中是否会存在容器高度改变的情况
            type: Boolean,
            default: false
        },
        init: {
            // 重新计算sticky-item中的容器高度的
            type: Boolean,

            default: false
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        // 点击tab
        onTabsChange: function onTabsChange(_ref) {
            var detail = _ref.detail;
            var that = this;
            this.setData({
                currentTab: detail.key
            });
            this.scrollLock = true;
            var boxTopArr = this.boxTopArr;
            uni.pageScrollTo({
                scrollTop: boxTopArr[detail.key] - this.anchorPosition + 1,
                duration: 400
            });
            // 解锁
            setTimeout(function () {
                that.scrollLock = false;
            }, 450);
        },
        addChildHeightToArr: function addChildHeightToArr(item) {
            if (this.boxTopArr.length > this.childLength) {
                this.boxTopArr = [];
            }
            var boxTopArr = this.boxTopArr;
            if (!boxTopArr.length) {
                boxTopArr.push(this.top);
            }
            // 因为只需要取得最后一个sticky-item的bottom，所以直接覆盖，如有需要后期再优化
            this.lastChildBottom = item.bottom + this.offset;
            var top = boxTopArr[boxTopArr.length - 1] + item.height;
            boxTopArr.push(top);
            this.boxTopArr = boxTopArr;
        },
        // 监听到页面滚动
        updateScrollTopChangeFun: function _updateScrollTopChange(scrollTop) {
            if (this.scrollLock) {
                return;
            }
            var boxTopArr = this.boxTopArr;
            var currentTab = this.currentTab;
            var length = boxTopArr.length;
            for (var i = 1; i < boxTopArr.length; i++) {
                if (scrollTop < boxTopArr[i]) {
                    if (this.lastChildBottom - scrollTop - windowHeight <= 0) {
                        currentTab = length - 2;
                    } else {
                        currentTab = i - 1;
                    }
                    this.setData({
                        currentTab: currentTab
                    });
                    return;
                }
            }
        },
        updateDataChangeFun: function _updateDataChange() {
            var that = this;
            // 此处设置计时器的目的是可以让所有的linked均执行完毕之后再执行下面逻辑
            clearTimeout(this.timer);
            var items = this.getRelationNodes('sticky-item');
            this.childLength = items.length;
            var timer = setTimeout(function () {
                var query = uni.createSelectorQuery().in(that);
                query
                    .select('.i-sticky')
                    .boundingClientRect(function (res) {
                        if (!res) {
                            return;
                        }
                        var top = res.top;
                        if (top > 0) {
                            // 此处是为了避免当sticky中的tabs处于吸顶效果时，res.top为0会影响高度计算的问题
                            that.top = top;
                        } else {
                            // 当处于吸顶效果时，为了避免所有的top计算有偏差，需要通过offset进行修订
                            that.offset = Math.abs(top) + that.top;
                        }
                        items.forEach(function (item, index) {
                            item.updateDataChange(index);
                        });
                    })
                    .exec();
            }, 0);
            this.timer = timer;
        }
    },
    created: function () {},
    watch: {
        scrollTop: {
            handler: function observer(val) {
                this.updateScrollTopChangeFun(val + this.anchorPosition);
            },

            immediate: true
        },

        init: {
            handler: function observer(val) {
                if (this.sync) {
                    this.updateDataChangeFun();
                }
            },

            immediate: true
        }
    }
};
</script>
<style>
@import './index.css';
</style>
