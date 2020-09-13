# 基于Vue+Vue-router+Vuex+axios+Vue-property-decorator+TypeScript+Element-ui+Sass/Scss等开箱即用的项目开发环境（脚手架）

## 1、背景说明
该开发环境是基于公司实际所做的多个项目抽离出来的（而非网上的那些什网课或者其它的拼凑起来的，而没有经过实际的项目的上线检验），可能当中有不足之处，但是和公司几个前端综合下来评判，应当来说是可以满足绝大部分项目的开发需求的。主要的目的还是避免让一些前端开发者，尤其是项目经验不是特别多的在项目实际开发的过程中去花更多的时间去做各种配置。虽然说造轮子能炼你的能力。但是以自己的经验来说还是实际的项目中能少造轮子还是少造的好，毕竟你是要通过项目来为公司创造价值的，而不是为公司造轮子的。下面就来简单的说一下这个开发环境

## 2、主要目录结构的说明
* assets：主要放图片
* components：主要放自定义的一些组件和公共的布局组件
* config：这里主要写了一个获取上下文的文件
* plugins：主要用于放第三方的插件（非vue所编写的），里面放了一个按需加载Element-ui的组件文件（根据自己项目的实际来选择需要那些组件，而不是一股脑的全部引入）
* routers：顾名思义就是放路由文件的
* services：主要放各个模块的接口地址、请求方法、store等，以及一个二次封装的请求接口的文件
* store：放store的主入口文件
* style：放一些公共的样式文件（诸如全局重置了、重写Element-ui的样式）等
* util：放一些自定义的方法文件
* view：放各个模块的文件
## 3、主要文件的说明
* routers/index.ts：主路由的文件入口，因为项目中牵扯到的模块是非常多的，所以在实际项目中我们将各个模块的路由单独配置，最后以impor的方式导入到主路由文件中，最后只要将主入口路由文件引入main.ts即可
* services/remote.service.ts：基于axiose二次封装的GET、POST等请求方法以及请求拦截器的设置，具体可以点击查看，里面有详细的文字说明
* services/auth、common等：主要是将各个模块相关的进行内聚（比如属于自己的接口地址url、请求方法index.ts、以及store.ts）
* store/index.ts：主要的store入口，主要将services目录下各个模块的store以import方式导入，最后在main.ts引入（其实用不用vuex根据自己的需求决定，这里只是为了说明）
* util/validate.ts：自定义的一些验证方法，主要是为了在项目中某些个别的验证，没有或者不需要引入Element-ui的form组件以及其自身的那套验证方式
* util/cacheSession.ts：封装`sessionStorage`本地存储的一些方法
* util/cacheStorage.ts：也是一个本地存储的，但是是基于`localForage`的封装，具体的使用请移步[localForage](http://localforage.docschina.org/)官网。PS:具体使用`sessionStorage`还是`localForage`根据自己需要
* util/global.ts：自定义的一方法文件
* util/rem.ts：rem的计算
* tslint、tsconfig等是TypeScript的一些配置，具体的使用请移步[TypeScript](https://www.tslang.cn/)官网

## 3、vue-property-decorator说明
`vue-property-decorator`是基于`vue-class-component`开发而成的一款在V2.X 版本中使用`TypeScript`时的基于类的注解装饰器（尤推荐）
`vue-property-decorator`的使用请移步[vue-property-decorator](https://www.npmjs.com/package/vue-property-decorator)官网

## 4、最后说明，除了登录页面，其它的页面并没有写，根据自己的实际情况来编写页面


## 5、使用方法

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
开发版测试环境--打包文件地址 /dist_develop
npm run build:develop 
发布版测试环境--打包文件地址 /dist_alpha
npm run build:alpha
发布版正式环境--打包文件地址 /dist_production
npm run build:production
```

### Lints and fixes files
```
npm run lint
```

### Run your unit tests
```
npm run test:unit
```
