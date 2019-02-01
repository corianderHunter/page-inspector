import Vue from 'vue';
import Router from 'vue-router';

import routes from './routes'
import {
  beforeEach
} from './interceptors';


Vue.use(Router);

let router = new Router({
  routes: [...routes]
});
router.beforeEach(beforeEach);

export default router;
