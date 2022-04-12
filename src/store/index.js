import Vue from 'vue'
import Vuex from 'vuex'
import * as getters from './getters'
import state from './state'
import modules from './modules'
import mutations from './mutations'
import actions from './actions'
import VuexPersistence from 'vuex-persist'

// 缓存
const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  reducer: (state) => {
    return {
      currentApp: state.currentApp,
      menuData: state.menuData,
      menuPermisssions: state.menuPermisssions,
      appPermissions: state.appPermissions,
      permissions: state.permissions,
      curIdentify: state.curIdentify,
      curFactory: state.curFactory,
      userInfo: state.userInfo,
      sonTenants: state.sonTenants,
    }
  }
})

Vue.use(Vuex)
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules,
  strict: debug,
  plugins: [vuexLocal.plugin]
})
