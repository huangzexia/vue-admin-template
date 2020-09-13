import '@/plugins/element.ts';
import Vue from 'vue';
import App from './App.vue';
import router from '@/routers';
import store from '@/stores';
// @ts-ignore
import { cacheStorage } from '@/util/cacheStorage';
import { cacheSession } from '@/util/cacheSession';
import { debounce } from "lodash";
// 权限
import "@/util/rem";
import objectFitImages from "object-fit-images";
// 缓存
Vue.prototype.$storage = cacheStorage;
Vue.prototype.$session = cacheSession;
Vue.config.productionTip = false;
Vue.directive('debounceClick', {
  inserted(el: any, binding) {
    let exeFunction: any;
    let params: any;
    if(binding.value instanceof Array) {
      [exeFunction, params] = binding.value;
    } else {
      exeFunction = binding.value;
    }
    el.addEventListener('click', debounce(() => {
      exeFunction(params)
    }, 200))
  }
})
objectFitImages();
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
