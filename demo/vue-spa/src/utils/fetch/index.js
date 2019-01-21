import axios from 'axios';
import {
  requestError,
  requestSuccess,
  responseError,
  responseSuccess
} from './interceptors'
// 创建axios实例
const service = axios.create({
  baseURL: '/api', // api的base_url
  timeout: 20000 // 请求超时时间
});

//默认 正确响应为200-300 添加304 为正确码
service.defaults.validateStatus = function (status) {
  return (status >= 200 && status < 300) || status === 304;
};

// request拦截器
service.interceptors.request.use(requestSuccess, requestError);

// respone拦截器
service.interceptors.response.use(responseSuccess, responseError);

export default service;
