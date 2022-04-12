import store from '@/store'
import { reactive, toRefs } from '@vue/composition-api'
export default () => {
  const state = reactive({
    newCompanyName: null,
    companyReplaceList: store.state.realEstate.companyReplaceList
  })
  // 获取映射列表
  const getCompanyReplace = async (cache) => {
    await store.dispatch('realEstate/getCompanyReplace', {cache})
    state.companyReplaceList = store.state.realEstate.companyReplaceList
  }
  /*
  * 检查当前公司的映射公司
  * cache 是否只需要读取缓存进行对比
  */
  const getCompanyName = async ({companyName, cache = true}) => {
    await getCompanyReplace(cache)
    const company = store.state.realEstate.companyReplaceList.filter((item) => {
      return item.originName === companyName
    })[0]
    state.newCompanyName = company ? company.sfName : companyName
  }

  return {
    getCompanyName,
    getCompanyReplace,
    ...toRefs(state)
  }
}
