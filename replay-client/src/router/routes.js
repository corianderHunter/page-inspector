/**
 * 路由的具体配置
 */
let mainContainer = () => import('@views/mainContainer')
let dashboard = () => import('@views/dashboard')
export default [{
  path: '/',
  name: 'main-container',
  component: mainContainer,
}, {
  path: '/dashboard',
  name: 'dashboard',
  component: dashboard,
}]
