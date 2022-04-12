import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import store from '@/store'
import { reactive, toRefs } from '@vue/composition-api'
export default () => {
  const state = reactive({
    realEstateList: store.state.realEstate.realEstateList,
    realEstateDetailList: store.state.realEstate.realEstateDetailList
  })
  // 获取客户列表，用于推荐企业列表、头部模糊搜索框
  const getCompanyList = async (cache) => {
    await store.dispatch('realEstate/getCompanyList', {cache: true})
    state.realEstateList = store.state.realEstate.realEstateList
  }

  // 根据销售额排名获取客户全称、简称列表，用于大盘列表页，头部热门搜索推荐
  const getCompanyDetailList = async (cache) => {
    await store.dispatch('realEstate/getCompanyDetailList', {cache: true})
    state.realEstateDetailList = store.state.realEstate.realEstateDetailList
  }

  // 根据销售额排名获取客户全称、简称列表，用于大盘列表页，头部热门搜索推荐
  const { getCompanyRiskLevel } = ajaxStore.factoryService.realEstate
  const { result: riskCompanyList, doResult: getRiskCompanyList } = useAsync({
    request: getCompanyRiskLevel,
  })

  return {
    getCompanyList,
    getCompanyDetailList,
    riskCompanyList,
    getRiskCompanyList,
    ...toRefs(state)
  }
}
