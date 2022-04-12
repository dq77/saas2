import Router from '@/router'
import store from '@/store'
import useRefresh from '../common/useRefresh'
// import Router from '@/router'

export default ({ defaultJump }) => {
  // state
  const { state } = store
  // userType
  const { userType = 3, customerTenants } = state?.userInfo ?? {}
  const { refreshHandle } = useRefresh()
  const swicthIdetify = async (userTypeParams) => {
    userTypeParams = parseInt(userTypeParams)
    userTypeParams === 1 && defaultJump && defaultJump('3') // 厂家身份 orderGuide
    if (userTypeParams === 2) { // 经销商身份
      await store.dispatch('getCurIdentify', '2')
      let isInit = false
      if (customerTenants.length === 1) {
        await store.dispatch('getCurFactory', {
          tenantId: customerTenants[0].tenantId,
          applicationId: '1'
        })
        isInit = true
      }
      Router.push({name: 'dealerOrderManage', query: {isInit}})
      // Router.push({name: 'dealerOrderManage', query: {isInit: customerTenants.length === 1}})
      // Router.go(0)
    }
    userTypeParams === 3 && Router.push({name: 'Identify'}) // 双重身份
  }
  const redirectHandle = async (userTypeParams) => {
    localStorage.setItem('refreshPageTimeMarker', new Date().getTime()) // 通知其他页面刷新
    refreshHandle() // 更新菜单
    userTypeParams ? swicthIdetify(userTypeParams) : swicthIdetify(userType)
  }
  return {
    redirectHandle
  }
}
