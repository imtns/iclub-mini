<template>
  <view class="comment-item">
    <image class="avatar" :src="comment.avatar" mode="aspectFill" />
    <view class="comment-content">
      <text class="nickname">{{ comment.nickname }}</text>
      <text class="content">{{ comment.content }}</text>
      <view class="comment-footer">
        <text class="time">{{ comment.time }}</text>
        <view class="like-wrap" @tap="handleLike">
          <image class="like-icon" :src="icons.like" mode="aspectFit" />
          <text class="like-count">{{ comment.likeCount }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  name: 'CommentItem',
  props: {
    comment: {
      type: Object,
      default: () => ({
        avatar: '',
        nickname: '',
        content: '',
        time: '',
        likeCount: 0,
        upvoteFlag: '1'
      })
    }
  },
  data() {
    return {}
  },
  computed: {
    hasLiked() {
      return this.comment.upvoteFlag === '1'
    },
    icons() {
      return {
        like: this.hasLiked
          ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABHRJREFUaEPtmV1oW2Ucxp/nJO2mdG6iHZ0M7Jq0G2XeTGW61TYf2oEXu2ilF8IQGYyJTPR6oILeK9MLQaiCIqizFyKidec0q+xDUQTRydqTtpM5bVV0VO2HyXk0pxaTNE1OcpJ0hb13yfn/n//zez/Oed9ziHXeuM794zrAWo+g5xFQW+QuGIE+SF0idhK4GUAKwrSgb0nDAtLv0E5cLgal1kgLGgIDkOKC7gDYQiAI4DdQY454xjAwxDHrcy+dUxJAHfG74egFAftLCgppEm8j5RznVGIqO17h+5qBxmcAHRHQUEqL4BeAjtO2hovFrgog3NmA0OYTIo4AMEoVzLku/EXiKG3rjcz/CkcHBL4K4KaydDK5wGtG409HeeHCYqHcggDauX8T0htOCugtt2BWvCQ+DzrzBvicyu2ELCECFhyjjxOnrub7WQGgzs5G/L3NlNTlw3zVUwmeRyod5VRiPlt8JUB77ISEY1V3UAVBCq8waT22KoDao3shnvUz3FXwWfQmRqGLSevsclDOCCgc+9jnvK+xf1feMmwrvgJAoUhYNMaAa/7pLDrcxQkz4/V/swrHHxf0cj260G8NCk8wab2UBxB7V8BDfsXrki8MGUmrPwfACccyQ9JeFwM+ixAcp2125I/AjIBmn9p1SSfwM21raz7AvIANdXHgswiBBdrWxtwpFIpeAbnNp3Z90qUfjeTIbflr4DyAvfVx4K9KZltB27w3fwoNCnjUn3R9sgkO0jYP5wK0Rftk8L36WPBXhY76OTEylAvQHGnSZmMGwA3+5GuePcfZYDOnh//MAcj8UDiWOXk9WXMLPgoQeJG29dSyRO5mLtS7VUwlATT5qFGzVAJ/QMEQk8OZmeK2leeBa3hPROEYk1bOfq3wkbI9/rqkR2rWlRUIC3gzYFuH8lMLA7RGNipofASgp4JaVU+h8CkW5g7w8rk5TwDugu6MNGHRGBbgPjDWqhH4DIGFB3jxzGwhD0XfC6k1sgVBwxSwZ40AvmLKiXEq8ftq9Uu/2NoVvwUpJQTsricEgW9gOFGOJX4pVrckgDudWiMtChinQbh78Fo3ChfhsIeT5nSpWp4AXIhwZLvAUYA7Son6vD5BA90cs37wouMZwIW4vXuHGoKjALZ7Ea8g5num0c1J65LX3LIAXIi2eIeozHRq8VrEY9wVyulhMmF7jHfDygZwIUKR3aIxAuDWcooViZ0hjQjHT31Xrl5FAEtrIrZHgAlgS7lFs+MJ/Io0Y5w0v65Ep2KAJYj77xGczPv7TZUUB3CVUpzJkS8rzK9sCmUXUzjaI/FDEDeWY4LALMADtM1z5eTlx/oagWUxhWO9/z6t34fXtxruBxA9SHvktB/zFS/iQkUVjh4UeBIlPh8RmAd5kOPmJ37NVxVgaU1EByS+BSJQyByBRZD9HDc/qIb5qgP8d3c6JGAQS18es9sCqYc5vnQYr1aryhrIN6NQbJ/Ipwntk/udDqOUnvVzt1kNuCYA1epdLzrXAbz0Ui1j1v0I/AOVFnhAQalhyAAAAABJRU5ErkJggg=='
          : 'https://udstatic.imeik.com/compressed/1776667652325_icon_dianzan%402x.png'
      }
    }
  },
  methods: {
    handleLike() {
      this.$emit('like', this.comment)
    }
  }
}
</script>

<style scoped>
.comment-item {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 20rpx 0;
}

.avatar {
  flex-shrink: 0;
  width: 64rpx;
  height: 64rpx;
  background-color: #f0f0f0;
  border-radius: 32rpx;
}

.comment-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  margin-left: 16rpx;
}

.nickname {
  color: #333;
  font-weight: 600;
  font-size: 26rpx;
  line-height: 36rpx;
}

.content {
  margin-top: 4rpx;
  color: #333;
  font-size: 26rpx;
  line-height: 40rpx;
  word-break: break-all;
}

.comment-footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 8rpx;
}

.time {
  color: #999;
  font-size: 22rpx;
}

.like-wrap {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.like-icon {
  width: 32rpx;
  height: 32rpx;
}

.like-count {
  margin-left: 6rpx;
  color: #999;
  font-size: 22rpx;
}
</style>
