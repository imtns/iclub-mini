import { request } from './request-mall.js'
const { env } = require('@/http/env')

const baseUrl = env === 'prod' ? 'https://mall-backend.imeik.com' : 'https://mall-backend-test.imeik.com'

export function getTaskList() {
  return request({
    url: `${baseUrl}/mall-api/points/list`,
    method: 'get',
    params: {}
  })
}
