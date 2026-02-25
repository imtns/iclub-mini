import AliOss from '@/utils/aliOssSts.js'

export default {
  data() {
    return {
      pictures: [],
      uploading: false,
      showUpload: false
    }
  },
  methods: {
    afterDelete(index) {
      let _fileList = this.pictures
      _fileList = _fileList.filter((_, idx) => {
        return idx !== index
      })
      _fileList.forEach((item, index) => {
        item.index = index + 1
      })
      this.pictures = _fileList
    },

    clear() {
      this.fileList = []
    },
    handleFileEntityByName(status, result, idx, uploadedLength, fileList) {
      // 根据文件名key找到当前数组实体
      const fileEntity = fileList.find((f) => f.filename === result.name)
      fileEntity.index = uploadedLength + idx + 1
      if (status === 'ok') {
        fileEntity.url = result.url
        fileEntity.name = result.name
        fileEntity.message = ''
        fileEntity.status = 'success'
      } else {
        fileEntity.message = '上传失败'
        fileEntity.status = 'failed'
      }
    },
    async afterRead(event) {
      let fileList = this.pictures

      const { file } = event
      const tokenData = await AliOss.getUploadTokenAsync()
      const uploadTasks = (Array.isArray(file) ? file : [file]).map((file, idx) => {
        const filename = file.name
        const uploadData = {
          ...tokenData,
          filePath: file.url,
          filename
        }
        fileList.forEach((f) => (f.deletable = false))
        fileList = [
          ...fileList,
          {
            status: 'uploading',
            message: '上传中',
            name: '',
            url: '',
            filename,
            deletable: false // 上传中不可删除
          }
        ]
        this.pictures = [...fileList]
        return uploadData
      })

      // 获取已经上传成功的长度
      const uploadedLength = fileList.filter((f) => f.status === 'success').length
      this.showUpload = false
      let uploadFinishCount = 0
      this.uploading = true
      uploadTasks.forEach((data, index) => {
        AliOss.aliUpload(data.filePath, data, (url, name) => {
          if (url) {
            this.handleFileEntityByName('ok', { url, name }, index, uploadedLength, fileList)
          } else {
            this.handleFileEntityByName('error', '', index, uploadedLength, fileList)
          }
          uploadFinishCount++
          if (uploadTasks.length === uploadFinishCount) {
            fileList.forEach((d) => {
              d.deletable = true
            })
            this.showUpload = true
            this.uploading = false
          }
        })
      })
    }
  }
}
