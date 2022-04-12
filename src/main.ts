import Vue from 'vue'
import router from './router'
import store from '@/store'
import ListPage from '@/components/ListPage.vue'
// App
import App from './App.vue'
// fragment
import { Plugin } from 'vue-fragment'
// composition-api
import VueCompositionApi from '@vue/composition-api'
// ajax
import ajaxStore from '@/apis'
// util
import { toAmountStr, toAreaName, toDateStr, toPrefixUrl, toWordHide } from '@/utils/util'
// element-ui
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import './styles/element-theme/index.css'
// MarkDown
import MarkDown from '@/views/common/helpCenter/components/markDown/index.vue'
// charts
import echarts from '@/utils/charts'
// css
import '@/styles/index.styl'
// 跨页广播
import { listenStorage } from '@/utils/broadcast'
// oss
import { assetsBaseUrl } from '@/utils/config'
// 自定义指令
import vWeblogs from '@/directives/weblogs'

Vue.use(Plugin)
Vue.component('MarkDown', MarkDown)
Vue.config.productionTip = false
Vue.use(VueCompositionApi)
Vue.use(ElementUI, { size: 'small' })
// 注册必须的组件

Vue.component('ListPage', ListPage)
Vue.filter('toAmountStr', toAmountStr)
Vue.filter('toDateStr', toDateStr)
Vue.filter('toPrefixUrl', toPrefixUrl)
Vue.filter('toAreaName', toAreaName)
Vue.filter('toWordHide', toWordHide)

Vue.prototype.$echarts = echarts
Vue.prototype.$assetsBaseUrl = assetsBaseUrl
Vue.prototype.ajaxStore = ajaxStore

vWeblogs(Vue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // @ts-ignore
  router,
  store,
  components: { App },
  template: '<App/>'
})

// 监听localstorage变更，跨页通知
listenStorage('refreshPageTimeMarker', () => {
  store.commit('save', { refreshPage: true })
})

// 若是没有开启Devtools工具，在开发环境中开启，在生产环境中关闭
if (process.env.NODE_ENV === 'development') {
  Vue.config.devtools = true
} else {
  Vue.config.devtools = false
}
