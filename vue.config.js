// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
// const CompressionWebpackPlugin = require('compression-webpack-plugin');
const productionGzipExtensions = ['js', 'css'];
module.exports = {
  outputDir:
    process.env.VUE_APP_TITLE === "production"
      ? "dist_production"
      : process.env.VUE_APP_TITLE === "alpha"
      ? "dist_alpha"
      : "dist_develop",
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  filenameHashing: true,
  productionSourceMap: false,
  chainWebpack: webpackConfig => {
    webpackConfig.performance.set("hints", false);
    // webpackConfig
    //     .plugin('compression')
    //       .use(CompressionWebpackPlugin, [{
    //         algorithm: 'gzip',
    //         test: new RegExp(`\\.(${productionGzipExtensions.join('|')})$`),
    //         threshold: 10240,
    //         minRatio: 0.8,
    //       }]);
    // webpackConfig
    //     .plugin('UglifyJsPlugin')
    //       .use(UglifyJsPlugin, [{
    //         uglifyOptions: {
    //           compress: {
    //             warnings: false,
    //             drop_debugger: true, // 注释debugger
    //             drop_console: true,
    //             pure_funcs:['console.log'] // 移除console
    //           },
    //         },
    //         sourceMap: false,
    //         parallel: true,
    //       }]);
    // webpackConfig.entry('./src/main.ts').add('babel-polyfill') // main是入口js文件
  },
  configureWebpack: (config) => {
    // if(process.env.NODE_ENV === 'production'){
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    // }
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/mixin.scss";`,
      },
    },
    // 启用 CSS modules for all css / pre-processor files.
    // requireModuleExtension: false
  },
  devServer: {
    disableHostCheck: true, // 跳过检查
    host: '0.0.0.0',
    proxy: {
      "/api/": {
        target: "http://192.168.1.69:9999/xxxx", //develop开发环境
        ws: true,
        changeOrigin: true,
        pathRewrite: { "^/api/": "/" }
      },
      "/pdf/": {
	      target: "http://pdf.com",
	      ws: true,
	      changeOrigin: true,
	      pathRewrite: { "^/pdf/": "/" }
      }
    }
  }
};
