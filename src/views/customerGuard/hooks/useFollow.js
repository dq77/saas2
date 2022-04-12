import store from '@/store'
import { reactive, toRefs } from '@vue/composition-api'
export default () => {
  const state = reactive({
    hasFollowed: false,
    followCompanyList: store.state.customerGuard.followCompanyList
  })
  // 获取关注列表
  const getFollowCompanyList = async (cache) => {
    await store.dispatch('customerGuard/getFollowCompanyList', {cache})
    state.followCompanyList = store.state.customerGuard.followCompanyList
  }
  // 取消关注
  const unFollowCompany = async (companyName) => {
    await store.dispatch('customerGuard/unFollowCompany', { companyName })
    await checkHasFollowed({companyName})
  }
  // 批量关注
  const followCompanys = async (companyList) => {
    await store.dispatch('customerGuard/followCompanyList', companyList)
    await getFollowCompanyList()
  }
  /*
  * 检查当前公司是否关注
  * cache 是否只需要读取缓存进行对比
  */
  const checkHasFollowed = async ({companyName, cache}) => {
    await getFollowCompanyList(cache)
    const companyNames = store.state.customerGuard.followCompanyList.map((item) => {
      return item.companyName
    })
    const hasFollowed = companyNames.join(',').indexOf(companyName) > -1
    state.hasFollowed = hasFollowed
    return hasFollowed
  }

  return {
    checkHasFollowed,
    getFollowCompanyList,
    unFollowCompany,
    followCompanys,
    ...toRefs(state)
  }
}
