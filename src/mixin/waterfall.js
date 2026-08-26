import { mapState } from 'vuex'
export default {
  data() {
    return {
      imageProperty: 'coverImage',
      loading: true,
      newList: []
    }
  },
  props: {
    // 瀑布流列表
    list: {
      type: Array,
      require: true
    }
  },

  watch: {
    list: {
      handler(v) {
        if (v.length) {
          this.initializeLists()
        } else {
          this.loading = false
        }
      },
      deep: true,
      immediate: true
    }
  },
  computed: {
    ...mapState({
      commonConfig: state => state.config.commonConfig
    })
  },
  methods: {
    async initializeLists() {
      this.loading = true

      // const targetWidth = 334
      const list = JSON.parse(JSON.stringify(this.list))
      // const processedList = await Promise.all(
      //   list.map(async (item) => {
      //     let newHeight
      //     if (item.coverImageHeight) {
      //       const ratio = targetWidth / Number(item.coverImageWidth)
      //       newHeight = Math.round(Number(item.coverImageHeight) * ratio)
      //     } else {
      //       const info = await this.loadImage(item[this.imageProperty])
      //       const ratio = targetWidth / info.ImageWidth.value
      //       newHeight = Math.round(info.ImageHeight.value * ratio)
      //     }
      //     return { ...item, coverImageHeight: newHeight }
      //   })
      // )
      // 审核状态时隐藏视频，有的时候有视频会拒绝审核通过
      this.newList = list.filter((item) => (this.commonConfig.isShenHe && item.contentType !== '2') || !this.commonConfig.isShenHe)
      console.log('🚀 ~ initializeLists ~!!!! newList:', this.newList)
      setTimeout(() => {
        this.loading = false
      }, 100)
    }

    // loadImage(cover) {
    //   return new Promise((resolve, reject) => {
    //     wx.request({
    //       url: `${cover}?x-oss-process=image/info`,
    //       success({ data }) {
    //         resolve(data)
    //       },
    //       fail() {
    //         reject()
    //       }
    //     })
    //   })
    // }
  }
}
