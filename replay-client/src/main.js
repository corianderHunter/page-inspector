import Vue from 'vue'
import App from './App'
import router from './router'
import service from './service'
import ElementUI from 'element-ui';

import '@assets/styles/normalize.css'
import '@assets/iconfont/iconfont.css';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

//挂载service
Vue.prototype.$service = service;
Vue.use(ElementUI);

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
