/*
 * @Date: 2021-07-01 16:36:53
 * @LastEditors: 掉漆
 * @LastEditTime: 2021-07-02 11:20:25
 */
import ajaxStore from '@/apis'

const message = {
  namespaced: true,
  state: {
    messageNum: 0,
  },
  mutations: {
    save(state, payload) {
      for (const key in payload) {
        state[key] = payload[key]
      }
    },
  },
  actions: {

    // 厂服账号消息列表
    async getMessageList({ state, commit, dispatch }, payload) {
      const res = await ajaxStore.message.getMessageList(payload)
      const { messageStatus, startTime, endTime, messageTitle, messageType } = payload
      if (messageStatus === 'SUCCESS' && !(startTime || endTime || messageTitle || messageType)) {
        commit('save', { messageNum: res.data.data.totalCount })
      }
      return res.data
    },
  },
  getters: {
    messageNum(state) {
      return state.messageNum
    }
  }
}
export default message
