const { request2 } = require('../request2')
module.exports = {
  styleAnalysis: (data) => request2({ url: '/iclub-api/api/style/styleAnalysis', data }),
  // getAnalysis: (recordCode) => request2({ url: '/iclub-api/api/style/queryStyleAnalysisResult', data: { recordCode } }),
  getAnalysis: (data) => request2({ url: '/iclub-api/api/style/face/beautify', data }),
  getStyleTemplate: (data) => request2({ url: '/iclub-api/api/style/styleTemplate/query', data }),
  generateBaogaiFace: (data) => request2({ url: '/iclub-api/api/style/mergeface', data }),
  getFenggeByGender: (data) => request2({ url: '/iclub-api/api/style/queryFengGe', data }),
  getFenggeRecord: (data) => request2({ url: '/iclub-api/api/style/styleChangeRecord/queryPage', data }),
  deleteFenggeRecord: (objectCode) => request2({ url: '/iclub-api/api/style/delete', data: { objectCode } }),
  apiDownloadBaogaiImage: (data) => request2({ url: '/iclub-api/api/style/downloadChangeImage', data }),
  apiHelp: (data) => request2({ url: '/iclub-api/api/style/heplMe', data }),
  apiCheckDownloadCount: () => request2({ url: '/iclub-api/api/style/getChangeImageCanDownloadCount' }),
  apiCeceAnimationAnalysis: (data) => request2({ url: '/iclub-api/api/style/face/animation', data })
}
