/**
 * Created by wdh on 2017/9/18.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import demo from './modules/demo'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    demo,
  },
  getters
})

export default store;
