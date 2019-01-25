/**
 * 路由的具体配置
 */
import mainContainer from '@views/common/mainContainer'
import testIframe from '@views/common/testIframe'
import replayClient from '@views/replayer/client'
export default [{
  path: '/',
  name: 'main-container',
  component: mainContainer,
}, {
  path: '/testIframe',
  name: 'test-iframe',
  component: testIframe,
}, {
  path: '/replayClient',
  name: 'replay-client',
  component: replayClient
}]
