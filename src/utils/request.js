import axios from 'axios'
import { getToken } from '@/utils/auth'

const base_url = 'http://localhost:3000/api/'
const timeout = 120000


// 创建axios实例
const service = axios.create({
  baseURL: base_url,
  timeout // 请求超时时间
})

// 添加请求拦截器
service.interceptors.request.use(function (config) {
  // 让每个请求携带自定义token
  config.headers.common['Authorization'] = getToken();
  return config

}, function (error) {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
});

// 添加响应拦截器
service.interceptors.response.use(function (response) {
  return response.data;
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error);
});

export default service