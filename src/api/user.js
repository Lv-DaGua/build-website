import request from '@/utils/request'

export function checkLogin(params) {
  return request({
    url: 'user/checkLogin',
    method: 'get',
    params
  })
}

export function register(data) {
  return request({
    url: 'user/register',
    method: 'post',
    data
  })
}

export function login(data) {
  return request({
    url: 'user/login',
    method: 'post',
    data
  })
}