/**
 * 接口配置说明：
 *     
 *     特殊配置：1.name---接口名，用作被调用的函数名
 *              2.description---接口描述
 *              3.urlParams---转换url，(/test/:a+{a:1})=>/test/1,
 *              4.resultSchema---返回结果数据格式。
 *              5.customMessage---是否关闭默认消息提示，默认false不关闭
 *     普通配置：与axios 的request config 配置 是一致的，这里面是默认值。
 *       
 */
export default [{
  name: 'getWebsites',
  method: 'get',
  url: '/websites',
  params: {},
  data: {},
  description: '获取站点列表'
}, {
  name: 'getSessionsByWebsite',
  method: 'get',
  url: '/sessions',
  params: {},
  data: {},
  description: '按站点获取浏览记录'
}, {
  name: 'getSession',
  method: 'get',
  url: '/session/:id',
  params: {},
  data: {},
  description: '获取浏览记录'
}, {
  name: 'getRecords',
  method: 'get',
  url: '/records/:websiteId/:sessionId',
  params: {},
  data: {},
  description: '获取回放记录列表'
}, {
  name: "getRecord",
  method: 'get',
  url: '/record/:websiteId/:id',
  params: {},
  data: {},
  description: '获取回放记录'
}]
