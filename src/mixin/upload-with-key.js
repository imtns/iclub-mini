import AliOss from '@/utils/aliOssSts.js'

export default function createUploadMixin(defaultPicturesKey = 'pictures') {
  return {
    data() {
      return {
        pictures: [],
        uploadStates: {},
        uploading: false,
        showUpload: false
      }
    },
    watch: {
      pictures: {
        handler(newVal) {
          this.$set(this.form, defaultPicturesKey, newVal)
        },
        deep: true
      }
    },
    methods: {
      setPicturesKey(picturesKey) {
        if (!this.form[picturesKey]) {
          this.$set(this.form, picturesKey, [])
        }
        this.getUploadState(picturesKey)
      },
      getUploadState(picturesKey) {
        if (!this.uploadStates[picturesKey]) {
          this.$set(this.uploadStates, picturesKey, {
            uploading: false,
            showUpload: false
          })
        }
        return this.uploadStates[picturesKey]
      },
      afterDelete(picturesKey = defaultPicturesKey, index) {
        const pictures = picturesKey === defaultPicturesKey ? this.pictures : this.form[picturesKey] || []
        const updatedPictures = pictures.filter((_, idx) => idx !== index).map((item, idx) => ({ ...item, index: idx + 1 }))

        if (picturesKey === defaultPicturesKey) {
          this.pictures = updatedPictures
        } else {
          this.$set(this.form, picturesKey, updatedPictures)
        }
      },
      clear(picturesKey = defaultPicturesKey) {
        if (picturesKey === defaultPicturesKey) {
          this.pictures = []
        } else {
          this.$set(this.form, picturesKey, [])
        }
      },
      handleFileEntityByName(picturesKey = defaultPicturesKey, status, result, idx, uploadedLength, fileList) {
        const fileEntity = fileList.find((f) => f.filename === result.name)
        if (fileEntity) {
          fileEntity.index = uploadedLength + idx + 1
          fileEntity.status = status === 'ok' ? 'success' : 'failed'
          fileEntity.message = status === 'ok' ? '' : '上传失败'
          if (status === 'ok') {
            fileEntity.url = result.url
            fileEntity.name = result.name
          }
        }
      },
      async afterRead(picturesKey = defaultPicturesKey, event) {
        const state = this.getUploadState(picturesKey)
        const isDefaultKey = picturesKey === defaultPicturesKey
        let fileList = isDefaultKey ? this.pictures : this.form[picturesKey] || []
        const { file } = event
        const files = Array.isArray(file) ? file : [file]

        const tokenData = await AliOss.getUploadTokenAsync()
        const uploadTasks = files.map((file, idx) => {
          const filename = file.name
          const uploadData = {
            ...tokenData,
            filePath: file.url,
            filename
          }

          fileList = [
            ...fileList.map((f) => ({ ...f, deletable: false })),
            {
              status: 'uploading',
              message: '上传中',
              name: '',
              url: '',
              filename,
              deletable: false
            }
          ]

          if (isDefaultKey) {
            this.pictures = fileList
          } else {
            this.$set(this.form, picturesKey, fileList)
          }

          return uploadData
        })

        const uploadedLength = fileList.filter((f) => f.status === 'success').length
        state.showUpload = false
        state.uploading = true
        let uploadFinishCount = 0

        uploadTasks.forEach((data, index) => {
          AliOss.aliUpload(data.filePath, data, (url, name) => {
            const currentFileList = isDefaultKey ? this.pictures : this.form[picturesKey] || []
            if (url) {
              this.handleFileEntityByName(picturesKey, 'ok', { url, name }, index, uploadedLength, currentFileList)
            } else {
              this.handleFileEntityByName(picturesKey, 'error', '', index, uploadedLength, currentFileList)
            }
            uploadFinishCount++
            if (uploadTasks.length === uploadFinishCount) {
              const updatedList = currentFileList.map((d) => ({ ...d, deletable: true }))
              if (isDefaultKey) {
                this.pictures = updatedList
              } else {
                this.$set(this.form, picturesKey, updatedList)
              }
              state.showUpload = true
              state.uploading = false
            }
          })
        })
      }
    }
  }
}
