// 315-scan 分包静态图片入口
// 使用方式：getStaticImage('title.png')
//
// 切换是否走 CDN：将 USE_CDN 改为 true，并填入 CDN_PREFIX 即可
const USE_CDN = true
const CDN_PREFIX = 'https://cdn.vrupup.com/s/1952/f/static/assets/315-scan'

// 本地图片路径：图片放在 src/static/assets/315-scan/，uni-app 会自动打包进产物
// 分包目录 src/pages-activity/xxx/assets/ 下的图片不会被 uni-app 复制到 dist，不能用！
const LOCAL_PREFIX = '/static/assets/315-scan'

export function getStaticImage(filename) {
  if (!filename) return ''
  const name = filename.charAt(0) === '/' ? filename.slice(1) : filename
  if (USE_CDN) {
    return `${CDN_PREFIX.replace(/\/$/, '')}/${name}`
  }
  return `${LOCAL_PREFIX}/${name}`
}

export default { getStaticImage }

