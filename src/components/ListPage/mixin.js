// TODO 使用 ListPage 组件时，需要在页面引入该文件，
// TODO 使用 ScrollViewListPage 组件时，不需要引入该文件
export default {
  // onPullDownRefresh() {
  //   this.refresh()
  // },
  // onReachBottom() {
  //   this.nextPage()
  // },
  methods: {
    // 手动刷新
    refresh() {
      this.$refs.listPage?.refresh(...arguments)
    },
    // 加载下一页
    nextPage() {
      this.$refs.listPage?.nextPage()
    },
    // onShow 时刷新列表，调用此方法
    handleOnShowRefresh() {
      if (this.$refs.listPage?.isReady) {
        this.refresh(...arguments)
      }
    }
  }
}
