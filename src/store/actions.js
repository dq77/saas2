import ajaxStore from '@/apis'
import useMenu from '@/hooks/common/useMenu'
import { weblogsUser } from '@/utils/qjd/weblogs'

// ajax
const {
  common: {
    getPermissionList,
    getCountryList,
    getAreaData: getAreaDataApi,
    getUserType: getUserTypeApi,
    getSonTenants: getSonTenantsApi,
  },
  factory: {
    switchTenant,
    getUserInfoInTenant,
  },
  factoryService: { dataView: { getStatistics } }
} = ajaxStore
// 缓存存储省市区级联数据
let provinceCityArea = null
// actions
const actions = {
  // 获取当前登录用户的信息
  async getUserInfo({ state, commit, dispatch }) {
    try {
      // userInfo
      const { userInfo } = state
      // 后续用到相关信息
      const {
        userType,
        memberId,
        corporationId: companyId,
        name: userName,
        company: companyName
      } = userInfo ?? {}
      // 埋点，存储雍熙信息
      weblogsUser({ memberId, companyId, userName, companyName })
      // 获取权限
      const resPermission = userType !== 2 ? await getPermissionList() : {}
      const { data, code } = resPermission?.data ?? {}
      // 暂存权限数据
      const permissions = {}
      if (code === '0' && data?.length) {
        data.forEach(item => { permissions[item.permissionCode] = true })
        commit('SET_PERMISSIONS', permissions)
      }
      // 获取菜单
      const { getMenu } = useMenu({ permissions })
      // 非客户版调用获取菜单
      userType !== 2 && getMenu()
      // 设置_wGlobal
      window._wGlobal = { memberId }
      // 有用户信息的情况下，获取子公司列表
      dispatch('getSonTenants')
      return userInfo ?? {}
    } catch (error) {
      console.log(`error: ${error}`)
    }
  },
  // 获取当前身份的厂家 经销商选择厂家
  async getCurFactory({ state, commit, dispatch }, payload) {
    const res = await switchTenant(payload)
    const res2 = await getUserInfoInTenant()
    if (res?.data?.code === '0' && res2?.data?.code === '0') {
      commit('save', { curFactory: Object.assign(res.data?.data ?? {}, res2.data?.data ?? {}) })
      return state.curFactory
    } else {
      return false
    }
  },
  // 获取当前的身份 1.厂家端 2.经销商端
  async getCurIdentify({ state, commit, dispatch }, payload) {
    commit('save', { curIdentify: payload })
    // sessionStorage.setItem('curIdentifyPrams', payload)
    return state.curIdentify
  },
  // 获取省市树形结构
  async getProvinceCityArea() {
    if (provinceCityArea) return provinceCityArea
    const res = await getCountryList()
    if (res.data && res.data.code === '0') {
      provinceCityArea = JSON.parse(res.data.data)
      return provinceCityArea
    }
    return []
  },
  // 获取新版省市区数据
  async getAreaData({ state, commit, dispatch }, payload) {
    const res = await getAreaDataApi()
    if (res.data && res.data.code === '0') {
      const data = res.data.data.replace(/(areas|citys)/g, 'children')
      const areaData = JSON.parse(data)
      commit('save', { areaData })
      return areaData
    } else {
      return []
    }
  },
  // 是否是厂家
  async getUserType({ state, commit, dispatch }, payload) {
    if (state.trusteeship.name && (!payload || !payload.isForce)) {
      return state.trusteeship
    } else {
      const res = await getUserTypeApi()
      if (res.data && res.data.code === '0') {
        commit('save', {
          trusteeship: {
            isTrusteeship: res.data.data,
            name: res.data.data ? '厂家授权' : '经销商'
          }
        })
        return state.trusteeship
      } else {
        return false
      }
    }
  },
  // 舆情统计
  async getConsensusStatistics({ state, commit, dispatch }, payload) {
    if (JSON.stringify(state.consensusStatistics) !== '{}' && (!payload || !payload.isForce)) {
      return state.consensusStatistics
    } else {
      const res = await getStatistics()
      if (res.data && res.data.code === '0') {
        commit('save', {
          consensusStatistics: res.data.data || {}
        })
        return state.consensusStatistics || {}
      } else {
        return false
      }
    }
  },
  // 获取当前企业的子公司
  async getSonTenants({ state, commit }) {
    if (state.sonTenants && state.sonTenants.length > 0) return state.sonTenants

    if (state.userInfo && state.userInfo.tenants[0] && state.userInfo.tenants[0].tenantId) {
      const tenantId = state.userInfo.tenants[0].tenantId
      const res = await getSonTenantsApi({ tenantId })
      if (res.data && res.data.code === '0') {
        const list = res.data.data
        commit('save', { sonTenants: list })
        return list
      }
    }
  }
}

export default actions
