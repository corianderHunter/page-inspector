import Vue from 'vue'
import App from './App'
import router from './router'
import service from './service'

import '@assets/styles/normalize.css'
import '@assets/iconfont/iconfont.css';

Vue.config.productionTip = false

//挂载service
Vue.prototype.$service = service;

new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  template: '<App/>'
})
