export default {
  data() {
    return {
      list: [],
      finish: false,
      loading: true,
      page: 1,
      filter: {
        limit: 20,
        page: 1
      },
      confirmFilter: null,
      loadmore: false
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      if (this.filter.page === 1) {
        this.list = []
        this.loadmore = false
        this.loading = true
      }
      try {
        const { data } = await this.api({ ...this.filter })
        this.list = [...this.list, ...data.list]

        this.finish = this.list.length === data.totalCount
      } finally {
        setTimeout(() => {
          this.loadmore = false
          this.loading = false
        }, 300)
      }
    }
  },

  onReachBottom() {
    if (this.finish) return
    this.filter.page++
    this.loadmore = true
    setTimeout(() => {
      this.getList()
    }, 300)
  }
}
