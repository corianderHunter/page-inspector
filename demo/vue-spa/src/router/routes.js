/**
 * 路由的具体配置
 */
import mainContainer from '@views/common/mainContainer'
import replayClient from '@views/replayer/client'
export default [{
  path: '/',
  name: 'main-container',
  component: mainContainer,
}, {
  path: '/replayClient',
  name: 'replay-client',
  component: replayClient
}]
