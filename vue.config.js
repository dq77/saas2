const webpack = require('webpack')
const path = require('path')
const proxyTable = require('./config/dev.env.proxyTable') // 环境以及对应的代理列表
// 打包分析
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const VirtualModulesPlugin = require('webpack-virtual-modules')

// 编译模块
const modules = process.env.npm_config_module || ''
// 存储模块
let buildDynamicModules = []
if (modules && process.env.NODE_ENV === 'development') {
  buildDynamicModules = modules.split(',').map((module, index) => {
    console.log(`编译模块(${index + 1})：${module}\n`)
    return `require.context("../src/router/${module}", false, /index\.js$/)`
  })
} else {
  console.log('全部模块')
  buildDynamicModules.push('require.context("../src/router", true, /index\.js$/)')
}
// 创建虚拟模块
const virtualModules = new VirtualModulesPlugin({
  'node_modules/vue-dynamic-modules.js': `module.exports = [${buildDynamicModules.join(',')}];`
})

module.exports = {
  publicPath: process.env.IS_CDN ? `https://cdn.qjdchina.com/${process.env.VUE_APP_ENV}/factory/` : '/',
  assetsDir: 'static', // 资源路径，相对于上面的baseUrl
  devServer: { // 代理，不多说了
    hot: true, // 自动保存
    open: true, // 自动启动
    https: true,
    proxy: proxyTable,
    // public: 'localhost',
    host: '0.0.0.0'
  },
  productionSourceMap: false,
  configureWebpack: { // 合并入webpack配置
    entry: require.resolve('./src/main.ts'),
    resolve: {
      extensions: ['.ts', '.js', '.vue', '.json'], // 可省略的
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': path.resolve(__dirname, './src'),
        hooks: 'qjd-ui-hooks/lib/packages/hooks'
      }
    },
    externals: {
      vue: 'Vue',
      'vue-router': 'VueRouter',
      vuex: 'Vuex',
      axios: 'axios',
      'element-ui': 'ELEMENT',
      // 'echarts': 'echarts',
      'moment': 'moment'
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          loader: 'ts-loader',
          options: { appendTsSuffixTo: [/\.vue$/] }
        }
      ]
    },
    plugins: [
      // new BundleAnalyzerPlugin()
      virtualModules
    ]
  },
  chainWebpack: config => {
    config.plugin('provide').use(webpack.ProvidePlugin, [{
      'window.Quill': 'quill',
      Quill: 'quill.js'
    }])
    // markdown处理
    config
      .module
      .rule('md')
      .test(/\.md$/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('mdLoader')
      .loader(require.resolve('./mdLoader'))
      .end()
  }
}
