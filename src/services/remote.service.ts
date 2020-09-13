/**
 * 封装axios请求
 * GET | POST | PUT | DELETE
 * 错误校验code定义：
 * 401         token不合法，跳转到登录页面
 * 403         无权限
 * app_401     禁止操作
 * app_402     数据已存在
 * app_403     参数不可为空
 * app_404     数据不存在
 * app_405     字典类型： 文件，上传文件不能为空
 * app_406     参数校验错误
 * sso_401     禁止操作
 * sso_402     数据已存在
 * sso_403     参数不可为空
 * sso_404     数据不存在
 * 500         服务器内部错误
 * auth by louis
 */
import Vue from 'vue';
import * as Axios from 'axios';
import router from '@/routers';
// import Qs from "qs";
import { apiBaseUrl } from '@/config/config';
import { debounce, findIndex, delay } from "lodash";
const axios: any = Axios.default;
axios.defaults.baseURL = apiBaseUrl;
const app: any = new Vue();
// loading对象
let loading: any;
// 当前正在请求的数量
let needLoadingRequestCount = 0;
// 当前loading对象
let currentLoadingTarget: any = '';
// 显示loading
function showLoading(target: string = 'body') {
  // 后面这个判断很重要，因为关闭时加了抖动，此时loading对象可能还存在，
  // 但needLoadingRequestCount已经变成0.避免这种情况下会重新创建个loading
  if (needLoadingRequestCount === 0 && !loading) {
    loading = app.$loading({
      lock: true,
      text: "加载中",
      background: 'rgba(255, 255, 255, 0.5)',
      target
    });
    currentLoadingTarget = document.querySelector(target) as HTMLImageElement;
    currentLoadingTarget && currentLoadingTarget.classList.add('disabled');
  }
  needLoadingRequestCount++;
}

// 防抖：将 300ms 间隔内的关闭 loading 便合并为一次。防止连续请求时， loading闪烁的问题。
const toHideLoading = debounce(() => {
  loading && loading.close();
  loading = null;
  currentLoadingTarget && currentLoadingTarget.classList.remove("disabled");
}, 300);

// 隐藏loading
function hideLoading() {
  needLoadingRequestCount--;
  needLoadingRequestCount = Math.max(needLoadingRequestCount, 0); // 做个保护
  if (needLoadingRequestCount === 0) {
    // 关闭loading
    toHideLoading();
  }
}
// create an axios instance   创建axios实例
const service = axios.create({
  baseURL: apiBaseUrl,
  timeout: 5000,
  responseType: "json",
  withCredentials: false,
  headers: {
    "Content-Type": "application/json;charset=utf-8",
    "Cache-Control": "no-cache"
  }
})

const pending: any = []; // 声明一个数组用于存储每个请求的取消函数和axios标识
const cancelToken: any = axios.CancelToken;
const removePending = (config: any) => {
  const u: string = config.url;
  const index = findIndex(pending, (o: any) => o.u === u)
  if(index !== -1) {
    pending[index].f(); // 执行取消操作
    pending.splice(index, 1);
    // hideLoading();
    console.error(`短时间重复调用${config.url}多余请求被取消`);
  }
}

const deletePeddingByConfig = (config: any) => {
  const u: string = config.url;
  const index = findIndex(pending, (o: any) => o.u === u);
  pending.splice(index, 1);
}

// const filteredApi = ['page/bankorprovider'];
/* 全局添加拦截器作用是可以在每个api前面就加上headers的token验证 */
/* 判断token是否存在和是否需要token验证的路由 */
const apiFilter: string[] = ['/app/v1.0/file/upload-file/get-original-file-name'];
service.interceptors.request.use(async (config: any) => {
  if(apiFilter.includes(config.url)) {
     // 过滤指定接口并且过滤应用接口, 不需要监控是否重复调用
  } else {
    removePending(config);
    config.cancelToken = new cancelToken((c: any) => {// 本次axios请求的配置添加cancelToken
      pending.push({
            u: config.url,
            f: c
      })
    });
  }
  // get请求接口时url加时间戳
  // 顺序不可变更，否则加上时间戳则pedding失效
  config.url += (config.url.indexOf('?') === -1 ? '?_=' : '&_=') + (new Date().getTime());
  const token = await app.$storage.get("app_token") || await app.$session.get("app_token") ;
  if(token) {
    config.headers.Authorization = 'Bearer ' + token;
  } else {
    // 对请求错误做些什么
    const pathName: any = router.currentRoute.name;
    if(config.url.indexOf("page/bankorprovider") !== -1) {
      // 如果是应用接口，过滤token检测
    } else {
      if(!['login', 'verifyCenter/forgotPassword'].includes(pathName)) {
        router.push({path: '/login'});
        return Promise.reject('no token, reject!');
      }
    }
  }
  // 判断当前请求是否设置了不显示Loading
  if(config.headers.showLoading !== false) {
    showLoading(config.headers.loadingTarget);
  }
  return config;
});

/* 处理退出响应拦截器 */
// 响应 拦截器 的第二个参数, err 可以捕获状态, 来进行响应的处理
service.interceptors.response.use(async (response: any) => {
  // 判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
  if(response.config.headers.showLoading !== false) {
    hideLoading();
  }
  if (response.status === 200) {
    delay(() => {
      deletePeddingByConfig(response.config)
    }, 300)
    if (response.data && response.data.code) {
      switch(response.data.code) {
        case '200': return dealBulkData(response.data.data);
        case '401':
					router.push({path: '/login'});
					await app.$session.clear();
					await app.$storage.clear();
					return Promise.reject('登录过期或不合法！');
					break;
        case '403': app.$message.error('无权限！'); break;
        // 未授权
        case 'app_401':
        // app_402 ---- app_408直接弹出后台返回信息
        case 'app_402':
        case 'app_403':
        case 'app_404':
        case 'app_405':
        // 后端校验类
        case 'app_406':
        case 'app_408':
        // 个人中心相关的，直接弹出后台返回信息
        case 'sso_401':
        case 'sso_402':
        case 'sso_403':
        case 'sso_404':
        case 'sso_413':
          app.$message.warning(response.data.message);
          break;
        // 系统异常
        case '500':
          app.$message.error("系统异常，请联系系统管理员");
          console.log(response.data);
          break;
        default:
          console.log(response.data);
          break;
      }
    }
    return response.data;
  } else {
    return response;
  }
},
(err: any) => {
  // 判断当前请求是否设置了不显示Loading（不显示自然无需隐藏）
  hideLoading();
  if(err) {
    // console.log(err)
    // if(err.config && err.config.headers.showLoading !== false) {
    //   hideLoading();
    // }
    if (err.code === "ECONNABORTED") {
      app.$message.error('请求超时！');
    } else {
      console.log(err)
    }
  }
  if (err && err.response) {
    switch (err.response.status) {
      case 400:app.$message.error('请求错误');break;
      case 401:app.$message.error('未授权，请登录');break;
      case 403:app.$message.error('拒绝访问');break;
      case 404:app.$message.error(`请求地址出错`); break;
      case 408:app.$message.error('请求超时'); break;
      case 500:app.$message.error('服务不可用'); break;
      case 501:app.$message.error('服务未实现');break;
      case 502:app.$message.error('网关错误'); break;
      case 503:app.$message.error('服务不可用'); break;
      case 504:app.$message.error('网关超时'); break;
      case 505:app.$message.error('HTTP版本不受支持'); break;
      default: break;
    }
  }
  return Promise.reject(err);
});
const dealBulkData = (data: any) => {
  if(data.page) {
    return data.page
  } else {
    if(data.items) {
      return data.items;
    }
  }
}
/**
 * global network error handler
 * @param error
 */
const errorHandler = (error: any) => {
  return Promise.reject('error,'+ error);
};
/**
 * @param url$
 * @param params
 * @param config
 */
export const get = (url: string, config: Axios.AxiosRequestConfig = {}): Axios.AxiosPromise<any> => {
  return service.get(url, config.headers ? config : {params: config}).then((res: any) => res, (err: any) => errorHandler(err));
};
export const post = (url: string, data?: any, config?: Axios.AxiosRequestConfig | undefined): Axios.AxiosPromise<any> => {
  return service.post( url, data, config).then((res: any) => res, (err: any) => errorHandler(err));
};
export const del = (url: string, config?: Axios.AxiosRequestConfig | undefined): Axios.AxiosPromise<any> => {
  return service.delete( url, config).then((res: any) => res, (err: any) => errorHandler(err));
};
export const put = (url: string, data?: any, config?: Axios.AxiosRequestConfig | undefined): Axios.AxiosPromise<any> => {
  return service.put( url, data , config).then((res: any) => res, (err: any) => errorHandler(err));
};
export const request = (url: string, data?: any, config?: Axios.AxiosRequestConfig | undefined): Axios.AxiosPromise<any> => {
  return service( url, data, config).then((res: any) => res, (err: any) => errorHandler(err));
};


// file为 你读取成功的回调文件信息
// new 一个FormData格式的参数
export const upLoad = (url: string, file: any) => {
  const params = new FormData();
  if(Array.prototype.isPrototypeOf(file) === true) { // 多图上传
    for(const x of file) {
      params.append("file", x.blob, x.currentFileName);
    }
  } else {
    params.append("file", file.blob, file.currentFileName);
  }
  const config = {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  };
  return new Promise((resolve, reject) => {
    service
      .post(url, params, config)
      .then(
        (response: any) => {
          resolve(response);
        },
        (err: any) => {
          reject(err);
        }
      )
      .catch((err: any) => {
        console.error("系统异常");
        reject(err);
      });
  });
}
