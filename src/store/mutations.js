import * as types from './mutationTypes.js'
import { deepCopy } from '@/utils/util'
import state from './state.js'

// 用于在登出时清空缓存
const copyState = deepCopy(state)

const mutations = {
  [types.SET_MENUDATA](state, menuData) {
    state.menuData = menuData
  },
  [types.SET_CURRENTAPP](state, currentApp) {
    state.currentApp = currentApp
  },
  [types.SET_APPPERERMISSIONS](state, appPermissions) {
    state.appPermissions = appPermissions
  },
  [types.SET_REFRESH](state, refresh) {
    state.refresh = refresh
  },
  [types.SET_MENUPERMISSIONS](state, menuPermisssions) {
    state.menuPermisssions = menuPermisssions
  },
  [types.SET_PERMISSIONS](state, permissions) {
    state.permissions = permissions
  },
  [types.SET_ASYNCMODULES](state, asyncModules) {
    state.asyncModules = asyncModules
  },
  // ------------- 未分类mutations暂时存放于此 -------------
  save(state, payload) {
    for (const key in payload) {
      state[key] = payload[key]
    }
  },
  resetState(state) {
    const newCopyState = deepCopy(copyState)
    for (const key in newCopyState) {
      state[key] = newCopyState[key]
    }
  },
  setIfShowLoginTip(state, val) {
    state.ifShowLoginTip = val
  },
  setMobile(state, val) {
    state.userInfo.mobile = val
  }
  // ------------- 未分类mutations暂时存放于此 -------------
}

export default mutations
