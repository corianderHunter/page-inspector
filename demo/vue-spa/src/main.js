import Vue from 'vue'
import App from './App'
import elementUI from 'element-ui'

import router from './router'
import store from './store'
import service from './service'

import '@assets/styles/element-variables.scss'
import '@assets/styles/normalize.css'

Vue.config.productionTip = false
Vue.use(elementUI);

//挂载service
Vue.prototype.$service = service;

new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
