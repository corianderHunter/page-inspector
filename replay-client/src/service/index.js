import api from './api';
import fetch from '@utils/fetch';
import pathToRegexp from 'path-to-regexp'
import {
  Notification
} from 'element-ui'
import {
  pick,
  isEmpty
} from 'underscore';

let axiosRequestConfigs = ['url', 'method', 'baseURL', 'transformRequest', 'transformResponse', 'headers', 'params', 'paramsSerializer', 'data', 'timeout', 'withCredentials', 'adapter', 'auth', 'responseType', 'xsrfCookieName', 'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress', 'maxContentLength', 'validateStatus', 'maxRedirects', 'maxRedirects', 'maxRedirects', 'httpsAgent', 'proxy', 'cancelToken'];

//转换url  /a/:b,{b:1} => /a/1
function handlerUrlParams(url, obj) {
  if (!isEmpty(obj)) {
    url = pathToRegexp.compile(url)(obj);
  }
  return url
}

class Service {
  constructor(api) {
    this.service = {};
    this.fetchBuiler(api)
  }
  fetchBuiler(api) {
    //遍历 api 配置，构造api函数
    api.forEach(val => {
      if (!val['name'] || !val['url'] || !val['method']) {
        return console.info('接口配置项 "name" "url" "method" 为必填！');
      }
      let name = val['name'];
      //重复的不生成
      if (this.service[name]) {
        return console.info('有重复的api name:' + name + '，请检查。');
      }
      //将api配置 填充到fetch里面
      let self = this.service[name] = function () {
        let _args, customMessage;
        _args = Object.assign(pick(val, axiosRequestConfigs), arguments[0]);
        _args['url'] = handlerUrlParams(_args['url'], _args['urlParams']);
        customMessage = _args['customMessage'];
        return fetch(_args).then(res => {
          if (!customMessage && self.defaults.method !== 'get') {
            Notification.success({
              duration: 3000,
              title: `${self.defaults.description}成功`
            })
          }
          return res
        }).catch(err => {
          if (!customMessage) {
            Notification.error({
              duration: 3000,
              title: `${self.defaults.
                description}失败`,
              message: '服务器响应：' + err.message
            })
          }
          return Promise.reject(err)
        })
      }
      self['defaults'] = val;
    })
  }
}

export default new Service(api).service;
