/**
 * 路由的具体配置
 */
let mainContainer = () => import('@views/mainContainer')
let dashboard = () => import('@views/dashboard')
let websiteList = () => import('@views/list/websiteList')
let sessionList = () => import('@views/list/sessionList')
export default [{
  path: '/',
  name: 'main-container',
  component: mainContainer,
  redirect: '/websites',
  
}, {
  path: '/dashboard/:websiteId/:sessionId',
  name: 'dashboard',
  component: dashboard,
}, {
  path: '/websites',
  name: 'websiteList',
  component: websiteList,
}, {
  path: '/sessions/:websiteId',
  name: 'sessionList',
  component: sessionList,
}]
