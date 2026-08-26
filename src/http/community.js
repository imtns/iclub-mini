import { request2 } from './request2'

export const apiFollow = (data, type = 'follow') => {
  return request2({
    url: `/iclub-api/api/follow/${type}`,
    method: 'post',
    data
  })
}
