import request from '@/utils/request'

export function getWebInfo(params) {
  return request({
    url: 'build/getWeb',
    method: 'get',
    params
  })
}