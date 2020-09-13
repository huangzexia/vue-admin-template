// 主路由入口
import Vue from 'vue';
// 引入各个模块的路由
import { indexConfig } from './index.config'
// ...

import Router from 'vue-router';
const originalPush: any = Router.prototype.push;
Router.prototype.push = function push(location: any) {
  return originalPush.call(this, location).catch((err: any) => err);
};

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [...indexConfig],
});
