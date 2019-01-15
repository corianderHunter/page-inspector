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
  name: 'login',
  method: 'post',
  url: '/login',
  params: {},
  data: {
    "email": "",
    "password": "",
    "role": "",
    "username": ""
  },
  description: '用户登录'
}]
