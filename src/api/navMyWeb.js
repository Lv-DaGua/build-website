import request from '@/utils/request'

export function getMyWeb() {
  return request({
    url: 'build/getMyWeb',
    method: 'get',
  })
}

export function deleteWeb(params) {
  return request({
    url: 'build/deleteMyWeb',
    method: 'get',
    params
  })
}
