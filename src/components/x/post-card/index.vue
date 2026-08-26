<template>
  <view
    class="post-card"
    :class="[
      `post-card__${type}`,
      {
        'post-card--illegal': post.approveStatus === '2',
        'post-card--is-pinned': !hidePin && (post.topFlag === '1' || post.userTopFlag === '1')
      }
    ]"
    @tap="handleCardTap"
    @longtap="handleLongTap"
  >
    <view v-if="!hidePin && (post.topFlag === '1' || post.userTopFlag === '1')" class="pin-flag">置顶</view>
    <!-- 作者信息 -->
    <view class="author-row">
      <view class="author-avatar-wrap">
        <image class="author-avatar" @click.stop="handleAvatarClick" :src="getOssSrc(post.headUrl, 200)" mode="aspectFill" />
        <image v-if="isOfficial(post.accountType)" class="avatar-v-flag" src="https://udstatic.imeik.com/pcUploads/1784011819586/v.png" />
      </view>
      <view class="author-info">
        <view class="author-name-wrap">
          <text
            class="author-name"
            :class="{
              'author-name--max': isOfficial(post.accountType) && post.approveStatus === '2'
            }"
          >
            {{ post.nickName || '爱+用户' }}
          </text>
          <official-flag v-if="isOfficial(post.accountType)" class="official-flag" />
        </view>
        <text class="post-date">{{ formatCommentTime(post.createTime) }}</text>
      </view>
      <template v-if="post.approveStatus === '2'">
        <image class="flag-icon" src="https://udstatic.imeik.com/pcUploads/1778669819762/flag.png" />
      </template>
      <image v-if="type === 'my'" class="delete-icon" src="https://udstatic.imeik.com/pcUploads/1778669819495/delete.png" @click.stop="handleDelete" />
    </view>

    <view class="post-content-wrapper">
      <!-- 标题 -->
      <text class="post-title">{{ post.title }}</text>

      <!-- 正文，最多展示 50 字 -->
      <div class="post-content">
        <mp-html :content="post.mainBody" scroll-table />
      </div>
      <div class="topic-list">
        <text v-for="(topic, idx) in post.topicList" :key="idx" class="topic-list-item" @click.stop="handleTopicClick(topic)">#{{ topic }}</text>
      </div>

      <!-- 图片区域：1张全宽，2张各半，3张及以上三列 -->
      <view v-if="post.contentType === '2'" class="image-grid">
        <view class="grid-image-video">
          <image class="play" src="https://udstatic.imeik.com/pcUploads/1705632630868/play-icon.png" />
          <image :src="displayImages[0]" mode="aspectFill" />
        </view>
      </view>

      <view v-else-if="displayImages.length" class="image-grid">
        <image v-for="(img, idx) in displayImages" :key="idx" class="grid-image" :src="img" mode="aspectFill" @tap.stop="handleImageTap(idx)" />
      </view>
      <!-- 评论预览区 -->
      <view v-if="post.commentList && post.commentList.length && showComment" class="comment-section">
        <view class="comment-box">
          <view v-for="(comment, idx) in post.commentList" :key="idx" class="comment-item">
            <!-- 头像 -->
            <view class="comment-avatar-wrap">
              <image class="comment-avatar" :src="getOssSrc(comment.headUrl, 200)" mode="aspectFill" />
              <image v-if="isOfficial(comment.accountType)" class="avatar-v-flag" src="https://udstatic.imeik.com/pcUploads/1784011819586/v.png" />
            </view>

            <!-- 右侧主体 -->
            <view class="comment-main">
              <view class="comment-name-wrap">
                <text class="comment-name">{{ comment.nickName }}</text>
                <official-flag v-if="isOfficial(comment.accountType)" class="official-flag" />
              </view>
              <text class="comment-content">{{ comment.comment }}</text>
              <div v-if="comment.pictureList && getPicutres(comment.pictureList).length" class="picture-grid">
                <image
                  v-for="(pic, pi) in getPicutres(comment.pictureList)"
                  :key="pi"
                  :src="getOssSrc(pic, 200)"
                  class="picture-item"
                  mode="aspectFill"
                  @click="previewPicture(getPicutres(comment.pictures), pi)"
                />
              </div>
              <view class="comment-meta">
                <text class="comment-time">{{ formatCommentTime(comment.createTime) }}</text>
                <view class="comment-like" v-if="comment.status !== '3'">
                  <image class="comment-like-icon" :src="getLikeIcon(comment.upvoteFlag === '1')" mode="aspectFit" />
                  <text class="comment-like-count">{{ comment.upvoteCount }}</text>
                </view>
              </view>
              <div class="pin-tag" v-if="comment.pinnedFlag === '1'">置顶评论</div>
            </view>
          </view>
        </view>
      </view>

      <!-- 底部操作栏 -->
      <view v-if="showFooter" class="post-footer">
        <text v-if="type !== 'comment'" class="location">{{ post.publishIpDesc || '' }}</text>
        <view class="action-list">
          <view class="action-item">
            <image class="action-icon" :src="icons.like" mode="aspectFit" />
            <text class="action-count">{{ post.upvoteCount }}</text>
          </view>
          <view class="action-item">
            <image class="action-icon" :src="icons.shoucang" mode="aspectFit" />
            <text class="action-count">{{ post.collectCount }}</text>
          </view>
          <view class="action-item">
            <image class="action-icon" src="https://udstatic.imeik.com/compressed/1776667676445_icon_pinglun%20%402x.png" mode="aspectFit" />
            <text class="action-count">{{ post.commentCount }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import CommentItem from './CommentItem.vue'
import mpHtml from '@/uni_modules/mp-html/components/mp-html/mp-html.vue'
import { getOssSrc, formatCommentTime } from '@/utils/tools'
import { mapState } from 'vuex'
import OfficialFlag from '@/components/common/official-flag.vue'
import { AccountTypeEnum } from '@/constant/index'
export default {
  name: 'PostCard',
  components: { OfficialFlag, CommentItem, mpHtml },
  props: {
    post: {
      type: Object,
      default: () => ({})
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    showComment: {
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'default' // 'comment' | 'default' | 'my'
    },
    hidePin: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formatCommentTime
    }
  },
  computed: {
    hasCollected() {
      return this.post.collectFlag === '1'
    },
    hasLiked() {
      return this.post.upvoteFlag === '1'
    },
    icons() {
      return {
        like: this.getLikeIcon(this.hasLiked),
        shoucang: this.hasCollected
          ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABMlJREFUaEPtWF1sFFUU/s7cbUtFogkaCf4C0cQUNEQTI0SgO0UCD00oMwR4Mvpo1Ciixt9CwgNEiBIfTXwS0ZmFxAeQn5m2BNEHeECoxAAxJBoVMBFTLKV77ydLLLZlu/dud7JAwrye73zn+86ZvefuCG7yR25y/bhloNwE+VWo9GSsEsF8wIAG3cqftVWk02Q98cwn0Lev/Z5madxFYPZwsQIc9gZksSyJzmZpIlMD7HpugjF9hwi0lBMpIke8i31PyZJdA1mZyNSAToP1JN6uJO5ywU7lx2tvOAPs6rhPG+8kgCaLuP6Lnky/vTX6PQsTmU1Ap8EnJF50ESXCzSpfWO2CtWEyMcAkvNeAJwlMsBW8Eif/Uc1mmszdccYJXwGUiYFiEmwB8FI1YgT4UPnxmmpyyh4MtRJc2NM+tUk1noJr9/8veEE1yDSZV9uxWvMEBpNlHwnklfE0QgQbVT5+czy5Qzk1GeCB9ql6oLF08jSPU0SfKuoZsmj8v4VxGeDBsBmX+CQ1PjajNm7VRohDpLyam4jDMifqrza/ogGy00PX8VkQPdMQLSRaBNJCchoEXrXFLAtOQ/CzAL3a4MecQi+ojmH/l0elE2PeocoaYNLxoIb3AYB2AJOzFFotl4icI/j1IM26Zn/76dH51xhgd7BYaxRqeK+r1eiK71eedEhr9M3whBEGSgtJgyduQPFDmvsV5GHxo1/LnkI6DdeSfN+1JdcDR+G6hnyh9HpfeUZMQKfBVhIrr4ewKmpuy/nxVY2jDISbSL5WBVndoSKyWeWjqxfBEQYGkzAvYFJ3VVUUJMRv8KN0zE1cTMIegPOq4Kwb1BPp8fLRgjFPoVLgvx3wPYApdVPmUoj4bVDM06N3QdlFNtC1dKYyqjSmu12464A5o4X5pnyh17rIhgDsCWcZzYS87ibOak/nm1p3HCvXqMp3oX3LHjMiCYG76tDla0qI4KynxJf50dGx6ltvo0yXPq6pSidTXe9EApzzSF/aCj9Uap7VQCn5Us+y2aooKYE76zMJ/qXELJD8jiO2ek4GSiQ6Dd4jsc5GmEVcwHeVX1jvwuVsoJiGq0B+7kJaM4ZYmWuLt7nwOBvQabiRZM1fERxFbVB+/JYj1gUGFJPgWwBz3NA1ogQHcvn4GRcWpwlw5+Im3XTbeUBsnw1darpgLqopcoe0RJdsYCcDg2nHXKF3wEaWZZyUOQ1t0Xc2TicDOg3XkNxoI8syLh5eV63xJhunkwGTBNsNsNRGlmmcUsi1RYGN08mATsKTBGfYyLKMC3BC+fEjNk4nA8Uk+BvAJBvZ6LiAxwEPBB+tNhfA+ZwfWze/kwGdBKcJPOAqQoCfPOBl8eM9pRymyxcZcgtBa0eH1Tid8+OHbDWdDBT3hXshbLORAegTyHrvT2yW5SOPQPaGjeYPribxDoCJDlx7c378rA3naCBYAcEXY5GJgJc/O0bKM6uldfsvlYpy94r7mStuMkBYUZyHlblW+3XCyQAB0WnwKYjnRxclcBiQN4b/0bZ1rRQfTAPfAzaQeKIM/jPlxy8IQBuXk4EhEnaHC41hSGKSQE554E7x44O2IhUnknbMLRpviQimC9BnDOOGhYXdrpxVGXAlrSfuloF6drtcrX8BdbesQEl+fIsAAAAASUVORK5CYII='
          : 'https://udstatic.imeik.com/compressed/1776667676210_icon_shoucang%402x.png'
      }
    },

    // 图片最多展示 3 张
    displayImages() {
      const images = (this.post.fileList.slice(0, 3) || []).map((url) => {
        const path = url.split('?')[0]
        const ext = path.split('.').pop().toLowerCase()
        // 1:图文  2:视频
        if (this.post.contentType === '2') {
          return url + '?x-oss-process=video/snapshot,t_1000,f_jpg,w_0,h_0,m_fast,ar_auto'
        }
        return getOssSrc(url, 300)
      })
      console.log('displayImages', images)
      return images
    }
  },
  methods: {
    getOssSrc,
    isOfficial(accountType) {
      return accountType === AccountTypeEnum.OFFICIAL
    },
    /**
     * 点击守卫：长按后阻止紧随的 tap 事件
     * @returns {boolean} true 表示应阻止本次点击
     */
    _guardClick() {
      if (this.preventClick) {
        this.preventClick = false
        return true
      }
      return false
    },
    getLikeIcon(value) {
      return value
        ? 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAABHRJREFUaEPtmV1oW2Ucxp/nJO2mdG6iHZ0M7Jq0G2XeTGW61TYf2oEXu2ilF8IQGYyJTPR6oILeK9MLQaiCIqizFyKidec0q+xDUQTRydqTtpM5bVV0VO2HyXk0pxaTNE1OcpJ0hb13yfn/n//zez/Oed9ziHXeuM794zrAWo+g5xFQW+QuGIE+SF0idhK4GUAKwrSgb0nDAtLv0E5cLgal1kgLGgIDkOKC7gDYQiAI4DdQY454xjAwxDHrcy+dUxJAHfG74egFAftLCgppEm8j5RznVGIqO17h+5qBxmcAHRHQUEqL4BeAjtO2hovFrgog3NmA0OYTIo4AMEoVzLku/EXiKG3rjcz/CkcHBL4K4KaydDK5wGtG409HeeHCYqHcggDauX8T0htOCugtt2BWvCQ+DzrzBvicyu2ELCECFhyjjxOnrub7WQGgzs5G/L3NlNTlw3zVUwmeRyod5VRiPlt8JUB77ISEY1V3UAVBCq8waT22KoDao3shnvUz3FXwWfQmRqGLSevsclDOCCgc+9jnvK+xf1feMmwrvgJAoUhYNMaAa/7pLDrcxQkz4/V/swrHHxf0cj260G8NCk8wab2UBxB7V8BDfsXrki8MGUmrPwfACccyQ9JeFwM+ixAcp2125I/AjIBmn9p1SSfwM21raz7AvIANdXHgswiBBdrWxtwpFIpeAbnNp3Z90qUfjeTIbflr4DyAvfVx4K9KZltB27w3fwoNCnjUn3R9sgkO0jYP5wK0Rftk8L36WPBXhY76OTEylAvQHGnSZmMGwA3+5GuePcfZYDOnh//MAcj8UDiWOXk9WXMLPgoQeJG29dSyRO5mLtS7VUwlATT5qFGzVAJ/QMEQk8OZmeK2leeBa3hPROEYk1bOfq3wkbI9/rqkR2rWlRUIC3gzYFuH8lMLA7RGNipofASgp4JaVU+h8CkW5g7w8rk5TwDugu6MNGHRGBbgPjDWqhH4DIGFB3jxzGwhD0XfC6k1sgVBwxSwZ40AvmLKiXEq8ftq9Uu/2NoVvwUpJQTsricEgW9gOFGOJX4pVrckgDudWiMtChinQbh78Fo3ChfhsIeT5nSpWp4AXIhwZLvAUYA7Son6vD5BA90cs37wouMZwIW4vXuHGoKjALZ7Ea8g5num0c1J65LX3LIAXIi2eIeozHRq8VrEY9wVyulhMmF7jHfDygZwIUKR3aIxAuDWcooViZ0hjQjHT31Xrl5FAEtrIrZHgAlgS7lFs+MJ/Io0Y5w0v65Ep2KAJYj77xGczPv7TZUUB3CVUpzJkS8rzK9sCmUXUzjaI/FDEDeWY4LALMADtM1z5eTlx/oagWUxhWO9/z6t34fXtxruBxA9SHvktB/zFS/iQkUVjh4UeBIlPh8RmAd5kOPmJ37NVxVgaU1EByS+BSJQyByBRZD9HDc/qIb5qgP8d3c6JGAQS18es9sCqYc5vnQYr1aryhrIN6NQbJ/Ipwntk/udDqOUnvVzt1kNuCYA1epdLzrXAbz0Ui1j1v0I/AOVFnhAQalhyAAAAABJRU5ErkJggg=='
        : 'https://udstatic.imeik.com/compressed/1776667652325_icon_dianzan%402x.png'
    },
    handleAvatarClick() {
      if (this.type === 'my') return
      if (this._guardClick()) return
      wx.navigateTo({
        url: '/pages/mine/community/index?userCode=' + this.post.userCode
      })
    },
    handleLongTap() {
      this.preventClick = true
      this.$emit('longtouch', this.post)
    },
    handleCardTap() {
      if (this._guardClick() || this.post.approveStatus === '2') return
      wx.navigateTo({
        url: `/pages-sub/detail/index?objectCode=${this.post.objectCode}&contentType=${this.post.contentType}${this.type === 'comment' ? '&comment=true' : ''}`
      })
    },
    handleImageTap(idx) {
      if (this._guardClick()) return
      // 预览图片
      uni.previewImage({
        current: this.displayImages[idx],
        urls: this.displayImages
      })
    },
    getPicutres(pictures) {
      if (!pictures) return []
      try {
        // 先统一转成数组
        let arr = typeof pictures === 'string' ? JSON.parse(pictures) : pictures
        if (!Array.isArray(arr)) return []
        // 再对每个 url 清洗
        return arr.map((url) => this.cleanOssUrl(url)).filter(Boolean)
      } catch (e) {
        console.error('getPicutres parse error:', e, pictures)
        return []
      }
    },
    cleanOssUrl(url) {
      if (!url) return url
      // 截取到最后一个图片扩展名为止，去掉后面所有参数
      return url.replace(/(\.jpg|\.jpeg|\.png|\.webp|\.gif).*/i, '$1')
    },
    previewPicture(urls, current) {
      if (this._guardClick()) return
      uni.previewImage({ current: urls[current], urls })
    },
    handleTopicClick(topic) {
      if (this._guardClick()) return
      this.go({
        url: `/pages-community/home/topic?topicName=${topic}`
      })
    },
    handleDelete() {
      if (this._guardClick()) return
      this.$emit('delete', this.post)
    }
  }
}
</script>

<style scoped lang="scss">
.post-card {
  position: relative;
  z-index: 0;
  padding: 32rpx;
  padding-bottom: 36rpx;
  border-radius: 12rpx;
  &__default,
  &__my {
    margin-bottom: 24rpx;
    background-color: #fff;
    box-shadow: 0rpx 16rpx 42rpx 0rpx rgba(0, 0, 0, 8%);
  }

  &__comment {
    background-color: #f5f7f9;
  }

  &--illegal {
    .post-content-wrapper {
      position: relative;

      &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 4;
        background: rgba(255, 255, 255, 80%);
        border-radius: 12rpx;
        backdrop-filter: blur(8px);
        content: '';
      }
    }
  }

  &--is-pinned {
    .delete-icon {
      top: 36rpx;
      right: 70rpx;
    }
  }
}

/* 作者行 */
.author-row {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20rpx;
}

.author-avatar {
  display: block;
  width: 84rpx;
  height: 84rpx;
  background-color: #f0f0f0;
  border-radius: 50%;

  &-wrap {
    position: relative;
    flex-shrink: 0;
  }
}

.author-info {
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20rpx;
}

.author-name {
  color: #333;
  font-weight: 600;
  font-size: 28rpx;
  line-height: 40rpx;

  &--max {
    max-width: 140rpx;
    @include text-overflow();
  }

  &-wrap {
    display: flex;
    align-items: center;
  }
}

.post-date {
  margin-top: 2rpx;
  color: #999;
  font-size: 24rpx;
  line-height: 32rpx;
}

/* 标题 */
.post-title {
  display: block;
  margin-bottom: 2rpx;
  color: #1a1a1a;
  font-weight: 500;
  font-size: 30rpx;
  line-height: 44rpx;
  word-break: break-all;
}

/* 正文 */
.post-content {
  display: block;
  color: #666;
  font-size: 26rpx;
  line-height: 40rpx;
  text-align: justify;
  word-break: break-all;
}
.topic-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8rpx 16rpx;
  margin-top: 6rpx;
  &-item {
    color: #3f70ad;
    font-size: 26rpx;
  }
}
/* 图片网格 */
.image-grid {
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 16rpx;
  margin-top: 20rpx;
  .grid-image-video {
    position: relative;
    width: 196rpx;
    height: 196rpx;
  }
  image {
    width: 196rpx;
    height: 196rpx;
    border-radius: 12rpx;
  }
  .play {
    @include position-center;

    z-index: 2;
    width: 36rpx;
    height: 36rpx;
  }
}

/* 评论区 */
.comment-section {
  padding: 0rpx 26rpx 24rpx 16rpx;
  background: #f5f7f9;
  border-radius: 12rpx;
}

/* 底部操作栏 */
.post-footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 28rpx;
}

.location {
  color: #97a3ad;
  font-size: 24rpx;
}

.action-list {
  display: flex;
  flex-direction: row;
  gap: 32rpx;
  align-items: center;
  margin-left: auto;
}

.action-item {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.action-icon {
  width: 40rpx;
  height: 40rpx;
}

.action-count {
  margin-left: 4rpx;
  color: #97a3ad;
  font-size: 26rpx;
}
.comment-section {
  margin-top: 20rpx;
}
.pin-tag {
  width: 104rpx;
  height: 34rpx;
  margin-top: 10rpx;
  color: #366bd5;
  font-weight: 500;
  font-size: 20rpx;
  line-height: 34rpx;
  text-align: center;
  background: rgba(54, 107, 213, 10%);
  border-radius: 20rpx;
}
.comment-item {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 24rpx 0 0;
}

.comment-avatar {
  display: block;
  flex-shrink: 0;
  width: 64rpx;
  height: 64rpx;
  background-color: #f0f0f0;
  border-radius: 32rpx;

  &-wrap {
    position: relative;
    margin-right: 8rpx;

    .avatar-v-flag {
      width: 28rpx;
      height: 28rpx;
    }
  }
}

.comment-main {
  flex: 1;
  min-width: 0;
}

.comment-name {
  display: block;
  margin-top: 12rpx;
  margin-bottom: 8rpx;
  color: #1a1a1a;
  font-weight: 500;
  font-size: 28rpx;

  &-wrap {
    display: flex;
    align-items: center;
  }
}

.comment-content {
  display: block;
  margin-top: 6rpx;
  color: #333;
  font-size: 28rpx;
  line-height: 40rpx;
}

.comment-footer {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.comment-time {
  color: #999;
  font-size: 22rpx;
}

.comment-like {
  display: flex;
  flex-direction: row;
  gap: 6rpx;
  align-items: center;
}

.comment-like-icon {
  width: 40rpx;
  height: 40rpx;
}

.comment-like-count {
  color: #999;
  font-size: 24rpx;
}
.comment-meta {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-top: 10rpx;
}
.picture-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12rpx;
  margin-top: 16rpx;

  .picture-item {
    width: 148rpx;
    height: 148rpx;
    object-fit: cover;
    border-radius: 12rpx;
  }
}

.flag-icon {
  position: absolute;
  top: 38rpx;
  right: 118rpx;
  width: 136rpx;
  height: 50rpx;
}

.delete-icon {
  position: absolute;
  top: 36rpx;
  right: 30rpx;
  width: 48rpx;
  height: 48rpx;
}

.official-flag {
  margin-left: 6rpx;
}

.pin-flag {
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 68rpx;
  height: 38rpx;
  background: #5d88dc;
  border-radius: 0 12rpx 0 12rpx;
  font-family: PingFangSC, PingFang SC;
  font-weight: 500;
  font-size: 20rpx;
  color: #ffffff;
  line-height: 1;
}
</style>
