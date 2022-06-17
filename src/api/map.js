import request from '@/utils/request'

export function district(data) {
  return request({
    url: 'https://restapi.amap.com/v3/config/district',
    method: 'get',
    data
  })
}
