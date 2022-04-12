/*
 * @Date: 2021-07-01 16:36:53
 * @LastEditors: 掉漆
 * @LastEditTime: 2021-07-09 10:06:30
 */
import ajaxStore from '@/apis'

const message = {
  namespaced: true,
  state: {
    wechatInfo: {},
  },
  mutations: {
    save(state, payload) {
      for (const key in payload) {
        state[key] = payload[key]
      }
    },
  },
  actions: {

    // 厂服账号绑定的微信用户信息
    async getWechatInfo({ state, commit, dispatch }, payload) {
      const res = await ajaxStore.common.getWxUserInfo()
      if (res.data && res.data.code === '0' && res.data.data) {
        commit('save', { wechatInfo: res.data.data })
        return state.wechatInfo
      } else {
        commit('save', { wechatInfo: {} })
        return false
      }
    },

    // 厂服账号解绑微信
    async unBindWechat({ state, commit, dispatch }, payload) {
      const res = await ajaxStore.common.unBindWechat()
      if (res.data && res.data.code === '0') {
        commit('save', { wechatInfo: {} })
      }
      return res
    },

    // 厂服账号绑定微信
    async bindWechatApi({ state, commit, dispatch }, payload) {
      const res = await ajaxStore.common.bindWechat(payload)
      if (res.data && res.data.code === '0') {
        dispatch('getWechatInfo')
      }
      return res
    },
  },
  getters: {
    wechatInfo(state) {
      return state.wechatInfo
    }
  }
}
export default message
