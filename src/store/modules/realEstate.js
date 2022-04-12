import ajaxStore from '@/apis'

const realestate = {
  namespaced: true,
  state: {
    followCompanyList: null,
    realEstateList: null,
    realEstateDetailList: null,
    companyReplaceList: null
  },
  mutations: {
    save(state, payload) {
      for (const key in payload) {
        state[key] = payload[key]
      }
    },
  },
  actions: {

    // 获取全量客户列表，用户前端本地模糊搜索
    async getCompanyList({ state, commit, dispatch }, payload) {
      if (state.realEstateList && payload && payload.cache) {
        return state.realEstateList
      } else {
        const res = await ajaxStore.factoryService.realEstate.getPermissionList()
        if (res.data && res.data.code === '0' && res.data.data) {
          commit('save', { realEstateList: res.data.data })
          return state.realEstateList
        } else {
          commit('save', { realEstateList: [] })
          return false
        }
      }
    },

    // 根据销售额排名，获取客户全称、简称列表
    async getCompanyDetailList({ state, commit, dispatch }, payload) {
      if (state.realEstateDetailList && payload && payload.cache) {
        return state.realEstateDetailList
      } else {
        const res = await ajaxStore.factoryService.realEstate.getEnterpriseCompanyTop({
          pageNo: 1,
          pageSize: 10
        })
        if (res.data && res.data.code === '0' && res.data.data) {
          commit('save', { realEstateDetailList: res.data.data.pagedRecords })
          return state.realEstateDetailList
        } else {
          commit('save', { realEstateDetailList: [] })
          return false
        }
      }
    },

    // 获取已关注公司列表
    async getFollowCompanyList({ state, commit, dispatch }, payload) {
      if (state.followCompanyList && payload && payload.cache) {
        return state.followCompanyList
      } else {
        const res = await ajaxStore.factoryService.realEstate.getFollowCompanyList()
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
      const res = await ajaxStore.factoryService.realEstate.unfollowCompany(payload)
      if (res.data && res.data.code === '0') {
        // dispatch('getFollowCompanyList')
      }
      return res
    },

    // 添加关注
    async followCompany({ state, commit, dispatch }, payload) {
      const res = await ajaxStore.factoryService.realEstate.followCompany(payload)
      if (res.data && res.data.code === '0') {
        // dispatch('getFollowCompanyList')
      }
      return res
    },

    // 批量添加关注
    async followCompanyList({ state, commit, dispatch }, payload) {
      const res = await ajaxStore.factoryService.realEstate.batchSubscribe(payload)
      if (res.data && res.data.code === '0') {
        // dispatch('getFollowCompanyList')
      }
      return res
    },

    // 获取公司映射表
    async getCompanyReplace({ state, commit, dispatch }, payload) {
      if (state.companyReplaceList && payload && payload.cache) {
        return state.companyReplaceList
      } else {
        const res = await ajaxStore.factoryService.realEstate.getCompanyReplace()
        if (res.data && res.data.code === '0' && res.data.data) {
          commit('save', { companyReplaceList: res.data.data })
          return state.companyReplaceList
        } else {
          commit('save', { companyReplaceList: [] })
          return false
        }
      }
    },
  },
  getters: {
    followCompanyList(state) {
      return state.followCompanyList
    }
  }
}
export default realestate
