const path = require('path')
const resolve = dir => {
  return path.join(__dirname, dir)
}
// const url = 'http://139.9.133.242:8080' //打包接口
const url = 'http://192.168.1.95:8086' //白伟
// module.exports = {
//   publicPath: './',
//   lintOnSave: false,
//   chainWebpack: config => {
//     config.resolve.alias
//       .set('_c', resolve('src/components')) // key,value自行定义，比如.set('@@', resolve('src/components'))
//   },

// }
const CompressionWebpackPlugin = require('compression-webpack-plugin')
// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const productionGzipExtensions = ['js', 'css']

module.exports = {
  // publicPath: './',
  lintOnSave: false,
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugins.delete('prefetch');
    const entry = config.entry('app')
    entry
      .add('babel-polyfill')
      .end()
    entry
      .add('classlist-polyfill')
      .end()
  },
  css: {
    // 忽略 CSS order 顺序警告
    extract: { ignoreOrder: true }
  },
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
    //   // 仅在生产环境下启用该配置
      config.optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'initial',
          maxInitialRequests: Infinity,
          minSize: 60000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name (module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace('@', '')}`
              }
            }
          }
        }
      };
      return {
        externals: {
          // 'vue': 'Vue',
          // 'vue-router': 'VueRouter',
          // 'vuex': 'Vuex',
          // 'axios': 'axios',
          // 'vue': 'Vue',
          // 'element-ui': 'ELEMENT'
        },
        performance: {
          // 打包后最大文件大小限制
          maxAssetSize: 1024000
        },
        plugins: [
          // new CompressionWebpackPlugin({
          //   filename: '[path].gz[query]',
          //   algorithm: 'gzip',
          //   test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          //   threshold: 1024, // 只有大小大于该值的资源会被处理,当前配置为对于超过1k的数据进行处理，不足1k的可能会越压缩越大
          //   minRatio: 0.99, // 只有压缩率小于这个值的资源才会被处理
          //   deleteOriginalAssets: true // 删除原文件
          // })
        ]
      }
    }else{
      return {
        externals: {
          // 'vue': 'Vue',
          // 'vue-router': 'VueRouter',
          // 'vuex': 'Vuex',
          // 'axios': 'axios',
          // 'vue': 'Vue',
          // 'element-ui': 'ELEMENT'
        },
      }
    }
  },
  // 配置转发代理
  devServer: {
    disableHostCheck: true,
    port: 8080,
    proxy: {
      // '/api/*':{
      //   target: `${url}`,
      //   changeOrigin: true,
      //   pathRewrite: {'/api':''}
      //  },
       '/api':{
        target: `${url}`,
        changeOrigin: true,
        pathRewrite: {'/api':''}
       }
      // 3.5 以后不需要再配置
    }
  }
}