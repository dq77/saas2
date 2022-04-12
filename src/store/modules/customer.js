/**
 * 客户管理模块
 */

import ajaxStore from '@/apis'

const customer = {
  namespaced: true,
  state: {
    levelEnum: null,
  },
  mutations: {
    save(state, payload) {
      for (const key in payload) {
        state[key] = payload[key]
      }
    },
  },
  actions: {
    // 获取客户等级的枚举值
    async getLevelEnum({ state, commit, dispatch }) {
      if (state.levelEnum) {
        return state.levelEnum
      } else {
        const res = await ajaxStore.common.customer.getCustomerLevelEnum({ dictCategoryCode: 'customer_level' })
        if (res?.data?.code === '0') {
          commit('save', { levelEnum: res.data.data })
        }
        return res.data?.data ?? []
      }
    },
  },
}
export default customer
