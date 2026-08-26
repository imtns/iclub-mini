<template>
  <uni-popup ref="popup" type="bottom" background-color="#fff">
    <view class="dp">
      <!-- 头部：上/下月 + 年月 + 关闭 -->
      <view class="dp__header">
        <view class="dp__nav" @click="prevMonth"><uni-icons type="left" size="18" color="#29323d" /></view>
        <text class="dp__title">{{ monthLabel }}</text>
        <view class="dp__nav" @click="nextMonth"><uni-icons type="right" size="18" color="#29323d" /></view>
        <view class="dp__close" @click="close"><uni-icons type="closeempty" size="20" color="#8e9296" /></view>
      </view>

      <!-- 星期 -->
      <view class="dp__week">
        <text v-for="w in weekLabels" :key="w" class="dp__week-cell">{{ w }}</text>
      </view>

      <!-- 日期网格 -->
      <view class="dp__grid">
        <view
          v-for="(cell, i) in cells"
          :key="i"
          class="dp__cell"
          :class="{
            'is-range-fill': cell.isRangeFill,
            'is-range-start': cell.isRangeStart,
            'is-range-end': cell.isRangeEnd
          }"
          @click="onSelect(cell)"
        >
          <view
            class="dp__day"
            :class="{
              'is-out': !cell.inMonth,
              'is-disabled': cell.isDisabled,
              'is-range': cell.isRangeFill && !cell.isSel,
              'is-sel': cell.isSel,
              'is-range-point': range && cell.rangeLabel,
              'is-today': cell.isToday && !cell.isSel
            }"
          >
            {{ cell.day }}
            <text v-if="range && cell.rangeLabel" class="dp__range-label">{{ cell.rangeLabel }}</text>
          </view>
        </view>
      </view>

      <view v-if="showTime && !range" class="dp__time">
        <text class="dp__time-label">选择时间</text>
        <picker-view class="dp__time-picker" indicator-style="height: 72rpx" :value="timeValue" @change="onTimeChange">
          <picker-view-column>
            <view v-for="item in hours" :key="item" class="dp__time-item">{{ item }} 时</view>
          </picker-view-column>
          <picker-view-column>
            <view v-for="item in minutes" :key="item" class="dp__time-item">{{ item }} 分</view>
          </picker-view-column>
          <picker-view-column>
            <view v-for="item in seconds" :key="item" class="dp__time-item">{{ item }} 秒</view>
          </picker-view-column>
        </picker-view>
      </view>

      <!-- 确认 -->
      <view class="dp__footer">
        <view class="dp__confirm" @click="confirm">确认</view>
      </view>
    </view>
  </uni-popup>
</template>

<script>
import { clampTime, formatDateTime, getRangeCellState, getTimePickerOptions, normalizeDate, normalizeRange, normalizeTime } from './datepicker-utils'

/**
 * x-datepicker 全局日期选择弹窗（底部弹层，纯 JS 生成日历，无第三方依赖）
 *
 * 用法：
 *   <x-datepicker ref="datePop" :value="date" @confirm="v => (date = v)" />
 *   this.$refs.datePop.open()   // 打开
 * 也支持 v-model：<x-datepicker v-model="date" ref="datePop" />（确认时回填）
 *
 * @property {String|Array} value 当前值，范围模式为 [startDate, endDate]
 * @property {Boolean} range 是否选择日期范围
 * @property {Boolean} showTime 单选模式下是否选择时分秒
 * @event {Function} confirm 点击确认，回调选中的日期或日期范围
 * @method open 打开弹窗
 * @method close 关闭弹窗
 */
export default {
  name: 'XDatepicker',
  props: {
    value: { type: [String, Array], default: '' },
    range: { type: Boolean, default: false },
    showTime: { type: Boolean, default: false },
    start: { type: String, default: '' },
    end: { type: String, default: '' }
  },
  data() {
    const now = new Date()
    return {
      weekLabels: ['日', '一', '二', '三', '四', '五', '六'],
      viewY: now.getFullYear(),
      viewM: now.getMonth() + 1, // 1-12
      sel: '',
      rangeStart: '',
      rangeEnd: '',
      timeValue: [0, 0, 0],
      hours: Array.from({ length: 24 }, (_, index) => this.pad(index)),
      minutes: Array.from({ length: 60 }, (_, index) => this.pad(index)),
      seconds: Array.from({ length: 60 }, (_, index) => this.pad(index))
    }
  },
  computed: {
    monthLabel() {
      return `${this.viewY} 年 ${this.pad(this.viewM)} 月`
    },
    todayStr() {
      const n = new Date()
      return this.fmt(n.getFullYear(), n.getMonth() + 1, n.getDate())
    },
    cells() {
      const startWeekday = new Date(this.viewY, this.viewM - 1, 1).getDay() // 0=周日
      const daysInMonth = new Date(this.viewY, this.viewM, 0).getDate()
      const prevDays = new Date(this.viewY, this.viewM - 1, 0).getDate()
      const arr = []
      // 上月补位
      for (let i = startWeekday - 1; i >= 0; i--) arr.push({ day: prevDays - i, inMonth: false })
      // 本月
      for (let d = 1; d <= daysInMonth; d++) {
        const dateStr = this.fmt(this.viewY, this.viewM, d)
        const rangeState = this.range ? getRangeCellState(dateStr, this.rangeStart, this.rangeEnd) : {}
        arr.push({
          day: d,
          inMonth: true,
          dateStr,
          isDisabled: this.isDateDisabled(dateStr),
          isToday: dateStr === this.todayStr,
          isSel: this.range ? rangeState.start || rangeState.end : dateStr === this.sel,
          isRangeStart: rangeState.start,
          isRangeEnd: rangeState.end,
          isRangeFill: rangeState.fill,
          rangeLabel: rangeState.label
        })
      }
      // 下月补位到固定 6 行（42 格），保证不同月份高度一致，切月时箭头不跳动
      let nd = 1
      while (arr.length < 42) arr.push({ day: nd++, inMonth: false })
      return arr
    }
  },
  methods: {
    pad(n) {
      return n < 10 ? '0' + n : '' + n
    },
    fmt(y, m, d) {
      return `${y}-${this.pad(m)}-${this.pad(d)}`
    },
    open() {
      if (this.range) {
        const value = Array.isArray(this.value) ? this.value : []
        const range = normalizeRange(value[0], value[1])
        this.rangeStart = range[0]
        this.rangeEnd = normalizeDate(value[1]) ? range[1] : ''
      } else {
        this.sel = normalizeDate(this.value)
        this.syncTimePicker(normalizeTime(this.value).split(':').map(Number))
      }
      const base = (this.range ? this.rangeStart : this.sel) || this.todayStr
      const [y, m] = base.split('-').map(Number)
      this.viewY = y
      this.viewM = m
      this.$refs.popup.open()
      this.$emit('show', true)
    },
    close() {
      this.$refs.popup.close()
      this.$emit('show', false)
    },
    prevMonth() {
      if (this.viewM === 1) {
        this.viewM = 12
        this.viewY -= 1
      } else {
        this.viewM -= 1
      }
    },
    nextMonth() {
      if (this.viewM === 12) {
        this.viewM = 1
        this.viewY += 1
      } else {
        this.viewM += 1
      }
    },
    onSelect(cell) {
      if (!cell.inMonth || cell.isDisabled) return
      if (!this.range) {
        const time = this.getSelectedTime()
        this.sel = cell.dateStr
        this.syncTimePicker(time)
        return
      }
      if (!this.rangeStart || this.rangeEnd) {
        this.rangeStart = cell.dateStr
        this.rangeEnd = ''
      } else {
        const range = normalizeRange(this.rangeStart, cell.dateStr)
        this.rangeStart = range[0]
        this.rangeEnd = range[1]
      }
    },
    confirm() {
      const date = this.sel || this.todayStr
      const time = clampTime(date, this.getSelectedTime(), this.start, this.end)
      const v = this.range ? normalizeRange(this.rangeStart, this.rangeEnd) : this.showTime ? formatDateTime(date, time) : date
      if (this.range && !v[0]) return
      this.$emit('input', v) // 支持 v-model
      this.$emit('change', v)
      this.$emit('confirm', v)
      this.close()
    },
    onTimeChange(e) {
      this.syncTimePicker(this.getSelectedTime(e.detail.value))
    },
    getSelectedTime(value = this.timeValue) {
      return [this.hours[value[0]], this.minutes[value[1]], this.seconds[value[2]]].map(Number)
    },
    syncTimePicker(time) {
      const options = getTimePickerOptions(this.sel || this.todayStr, time, this.start, this.end)
      this.hours = options.hours
      this.minutes = options.minutes
      this.seconds = options.seconds
      this.timeValue = options.value
    },
    isDateDisabled(date) {
      const start = normalizeDate(this.start)
      const end = normalizeDate(this.end)
      return Boolean((start && date < start) || (end && date > end))
    }
  }
}
</script>

<style lang="scss" scoped>
.dp {
  padding: 24rpx 24rpx;

  &__header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 48rpx;
    height: 88rpx;
  }

  &__title {
    color: #29323d;
    font-weight: 600;
    font-size: 34rpx;
  }

  &__nav {
    padding: 8rpx;
  }

  &__close {
    position: absolute;
    right: 8rpx;
    top: 50%;
    transform: translateY(-50%);
    padding: 8rpx;
  }

  &__week {
    display: flex;
    padding: 16rpx 0;
  }

  &__week-cell {
    flex: 1;
    text-align: center;
    color: #8e9296;
    font-size: 26rpx;
  }

  &__grid {
    display: flex;
    flex-wrap: wrap;
  }

  &__time {
    display: flex;
    align-items: center;
    padding: 8rpx 24rpx 20rpx;
  }

  &__time-label {
    width: 140rpx;
    color: #29323d;
    font-size: 28rpx;
  }

  &__time-picker {
    flex: 1;
    height: 160rpx;
  }

  &__time-item {
    height: 72rpx;
    color: #29323d;
    font-size: 28rpx;
    line-height: 72rpx;
    text-align: center;
  }

  &__cell {
    position: relative;
    width: calc(100% / 7);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 92rpx;

    &.is-range-fill::before {
      position: absolute;
      top: 50%;
      left: 0;
      right: 0;
      height: 72rpx;
      background: rgba(54, 107, 213, 0.12);
      transform: translateY(-50%);
      content: '';
    }

    &.is-range-start::before {
      left: 50%;
    }

    &.is-range-end::before {
      right: 50%;
    }

    &.is-range-start.is-range-end::before {
      display: none;
    }
  }

  &__day {
    position: relative;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 72rpx;
    height: 72rpx;
    border-radius: 50%;
    color: #29323d;
    font-size: 30rpx;

    &.is-out {
      color: #c5cad4;
    }

    // 今天：浅蓝底 + 蓝字（未选中时）
    &.is-today {
      background: rgba(54, 107, 213, 0.15);
      color: #366bd5;
    }

    &.is-range {
      background: transparent;
      color: #366bd5;
    }

    &.is-disabled {
      color: #c5cad4;
      opacity: 0.5;
    }

    &.is-sel {
      background: #366bd5;
      color: #fff;
      font-weight: 600;
    }

    &.is-range-point {
      flex-direction: column;
      width: 80rpx;
      height: 80rpx;
      line-height: 1;
    }
  }

  &__range-label {
    margin-top: 6rpx;
    font-size: 20rpx;
    font-weight: 400;
  }

  // 通栏白色 footer + 顶部阴影（与首页一致）；负外边距抵消 .dp 左右内边距
  // clip-path 只保留顶部阴影，裁掉左右/下方外溢
  &__footer {
    margin: 24rpx -24rpx 0;
    padding: 20rpx 24rpx 0;
    background: #fff;
    box-shadow: 0rpx -2rpx 16rpx 0rpx rgba(41, 50, 61, 0.06);
    clip-path: inset(-16rpx 0 0 0);
  }

  &__confirm {
    height: 96rpx;
    line-height: 96rpx;
    text-align: center;
    background: #366bd5;
    border-radius: 48rpx;
    color: #fff;
    font-weight: 500;
    font-size: 32rpx;
  }
}
</style>
