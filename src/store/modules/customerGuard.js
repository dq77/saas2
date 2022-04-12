import ajaxStore from '@/apis'

const message = {
  namespaced: true,
  state: {
    followCompanyList: null,
  },
  mutations: {
    save(state, payload) {
      for (const key in payload) {
        state[key] = payload[key]
      }
    },
  },
  actions: {
    // 获取已关注公司列表
    async getFollowCompanyList({ state, commit, dispatch }, payload) {
      if (state.followCompanyList && payload && payload.cache) {
        return state.followCompanyList
      } else {
        const res = await ajaxStore.risk.getFollowCompanyList()
        if (res.data && res.data.code === '0' && res.data.data) {
          commit('save', { followCompanyList: res.data.data })
          return state.followCompanyList
        } else {
          commit('save', { followCompanyList: [] })
          return false
        }
      }
    },

    // 取消关注
    async unFollowCompany({ state, commit, dispatch }, payload) {
      const res = await ajaxStore.risk.cancelFollow(payload)
      if (res.data && res.data.code === '0') {
        // dispatch('getFollowCompanyList')
      }
      return res
    },

    // 批量添加关注
    async followCompanyList({ state, commit, dispatch }, payload) {
      const res = await ajaxStore.risk.batchSubscribe(payload)
      if (res.data && res.data.code === '0') {
        // dispatch('getFollowCompanyList')
      }
      return res
    },
  },
  getters: {
    followCompanyList(state) {
      return state.followCompanyList
    }
  }
}
export default message
