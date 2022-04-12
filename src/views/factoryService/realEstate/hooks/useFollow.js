import store from '@/store'
import { reactive, toRefs } from '@vue/composition-api'
export default () => {
  const state = reactive({
    hasFollowed: false,
    followCompanyList: store.state.realEstate.followCompanyList
  })
  // 获取关注列表
  const getFollowCompanyList = async (cache) => {
    await store.dispatch('realEstate/getFollowCompanyList', {cache})
    state.followCompanyList = store.state.realEstate.followCompanyList
  }
  // 取消关注
  const unFollowCompany = async (companyName) => {
    await store.dispatch('realEstate/unFollowCompany', { companyName })
    await checkHasFollowed({companyName})
  }
  // 关注
  const followCompany = async (companyName) => {
    await store.dispatch('realEstate/followCompany', { companyName })
    await checkHasFollowed({companyName})
  }
  // 批量关注
  const followCompanys = async (companyList) => {
    await store.dispatch('realEstate/followCompanyList', companyList)
    await getFollowCompanyList()
  }
  /*
  * 检查当前公司是否关注
  * cache 是否只需要读取缓存进行对比
  */
  const checkHasFollowed = async ({companyName, cache}) => {
    await getFollowCompanyList(cache)
    const companyNames = store.state.realEstate.followCompanyList.map((item) => {
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
    followCompany,
    followCompanys,
    ...toRefs(state)
  }
}
