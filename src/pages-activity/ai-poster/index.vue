<template>
  <div class="container">
    <!-- 页面头部 -->
    <ik-custom-header theme="light" system-text-color extra-holder :transparent="transparentBar" title="AI海报" />

    <!-- 加载状态 -->
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>数据加载中...</p>
    </div>

    <!-- 空数据状态 -->
    <div v-else-if="!infoList.length" class="empty-container">
      <p>暂无数据</p>
    </div>

    <!-- 数据展示区域 -->
    <div v-else class="data-container">
      <!-- 接口数据概览 -->
      <div class="data-overview">
        <h3>接口数据概览</h3>
        <div class="overview-grid">
          <div class="overview-item">
            <span class="label">总数据量：</span>
            <span class="value">{{ totalCount }}</span>
          </div>
          <div class="overview-item">
            <span class="label">当前页码：</span>
            <span class="value">{{ currPage }}</span>
          </div>
          <div class="overview-item">
            <span class="label">每页条数：</span>
            <span class="value">{{ pageSize }}</span>
          </div>
          <div class="overview-item">
            <span class="label">总页数：</span>
            <span class="value">{{ totalPage }}</span>
          </div>
        </div>
      </div>

      <!-- 列表数据展示 -->
      <div class="list-container">
        <h3>列表数据</h3>
        <div class="card-grid">
          <div v-for="(item, index) in infoList" :key="item.objectCode || index" class="data-card">
            <!-- 图片展示 -->
            <div class="card-img">
              <img :src="item.coverImage" :alt="item.authorName" />
            </div>

            <!-- 信息展示 -->
            <div class="card-info">
              <div class="info-row">
                <span class="info-label">作者：</span>
                <span class="info-value">{{ item.authorName || '未知' }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">编号：</span>
                <span class="info-value">{{ item.objectCode || '无' }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">投票数：</span>
                <span class="info-value">{{ item.voteCount || 0 }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">媒体类型：</span>
                <span class="info-value">{{ item.mediaType || '未知' }}</span>
              </div>
              <div class="info-row">
                <span class="info-label">是否投票：</span>
                <span class="info-value">{{ item.hasVoted ? '是' : '否' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 原始JSON数据（可折叠） -->
      <div class="raw-data-container">
        <div class="raw-data-header" @click="showRawData = !showRawData">
          <h3>原始JSON数据</h3>
          <span>{{ showRawData ? '收起' : '展开' }}</span>
        </div>
        <div v-if="showRawData" class="raw-data-content">
          <pre>{{ JSON.stringify(rawData, null, 2) }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apiGetDoctorList } from './api/index'

export default {
  data() {
    return {
      // 加载状态
      loading: false,
      // 原始数据
      rawData: {},
      // 列表数据
      infoList: [],
      // 分页信息
      currPage: 0,
      pageSize: 0,
      totalCount: 0,
      totalPage: 0,
      // 是否显示原始JSON数据
      showRawData: false
    }
  },
  mounted() {
    this.getInfo()
  },
  methods: {
    async getInfo() {
      try {
        // 显示加载状态
        this.loading = true

        // 调用接口
        const { data } = await apiGetDoctorList()

        // 保存原始数据
        this.rawData = data

        // 解析数据
        this.infoList = data.list || []
        this.currPage = data.currPage || 0
        this.pageSize = data.pageSize || 0
        this.totalCount = data.totalCount || 0
        this.totalPage = data.totalPage || 0
      } catch (error) {
        // 错误处理
        console.error('接口调用失败：', error)
        this.infoList = []
        alert('数据加载失败，请稍后重试')
      } finally {
        // 隐藏加载状态
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  min-height: 100vh;
  padding: 20px;
  background: pink;
}

// 加载状态样式
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: #666;

  .loading-spinner {
    width: 40px;
    height: 40px;
    margin-bottom: 10px;
    border: 4px solid #e0e0e0;
    border-top: 4px solid #409eff;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

// 空数据样式
.empty-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
  color: #999;
  font-size: 16px;
}

// 数据概览样式
.data-overview {
  margin-bottom: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 5%);

  h3 {
    margin: 0 0 15px;
    color: #333;
    font-weight: 600;
    font-size: 18px;
  }

  .overview-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;

    .overview-item {
      display: flex;
      align-items: center;
      padding: 10px;
      background: #f8f9fa;
      border-radius: 6px;

      .label {
        margin-right: 8px;
        color: #666;
        font-size: 14px;
      }

      .value {
        color: #333;
        font-weight: 600;
        font-size: 16px;
      }
    }
  }
}

// 列表容器样式
.list-container {
  margin-bottom: 20px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 5%);

  h3 {
    margin: 0 0 15px;
    color: #333;
    font-weight: 600;
    font-size: 18px;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
  }

  .data-card {
    overflow: hidden;
    border: 1px solid #e5e6eb;
    border-radius: 8px;
    transition: all 0.3s ease;

    &:hover {
      box-shadow: 0 4px 16px 0 rgba(0, 0, 0, 8%);
      transform: translateY(-2px);
    }

    .card-img {
      width: 100%;
      height: 180px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }

      &:hover img {
        transform: scale(1.05);
      }
    }

    .card-info {
      padding: 15px;

      .info-row {
        display: flex;
        margin-bottom: 8px;
        font-size: 14px;

        &:last-child {
          margin-bottom: 0;
        }

        .info-label {
          min-width: 60px;
          color: #666;
        }

        .info-value {
          flex: 1;
          color: #333;
          word-break: break-all;
        }
      }
    }
  }
}

// 原始数据样式
.raw-data-container {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 5%);

  .raw-data-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;

    h3 {
      margin: 0;
      color: #333;
      font-weight: 600;
      font-size: 18px;
    }

    span {
      color: #409eff;
      font-size: 14px;
    }
  }

  .raw-data-content {
    margin-top: 15px;
    padding: 15px;
    overflow-x: auto;
    background: #f8f9fa;
    border-radius: 6px;

    pre {
      margin: 0;
      color: #333;
      font-size: 14px;
      line-height: 1.6;
    }
  }
}

// 动画
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

// 响应式调整
@media (max-width: 768px) {
  .container {
    padding: 10px;
  }

  .list-container .card-grid {
    grid-template-columns: 1fr;
  }

  .data-overview .overview-grid {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
