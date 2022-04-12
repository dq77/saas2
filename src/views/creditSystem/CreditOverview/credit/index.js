import { computed, reactive, toRefs, watch } from '@vue/composition-api'
import ajaxStore from '@/apis'
import { companyData } from './consts'
import useAsync from 'hooks/useAsync'
import { toAmountStr } from '@/utils/util'

export default () => {
  const { credit: { getViewInfo } } = ajaxStore
  // state
  const state = reactive({
    active: 'orgYear',
    dataSource: null,
    data: {},
    companyData,
  })
  const title = computed(() => state.active === 'orgYear' ? '厂家年度额度占比' : state.active === 'dealerCredit' ? '经销商额度占比' : state.active === 'projectCredit' ? '项目授信占比' : '')
  // 处理金额
  const _getMoney = (val) => val ? toAmountStr(val, 2, true, true) : ''
  // 获取左侧总额信息
  const _getCompanyData = (data) => {
    if (!data) return
    state.companyData.map(item => {
      item.money = data[item.key] ? _getMoney(data[item.key].sumCreditLine) : ''
      data[item.key] = data[item.key] || {}
      data[item.key].sumCreditLine = data[item.key] ? _getMoney(data[item.key].sumCreditLine) : ''
      data[item.key].sumAmountInUse = data[item.key] ? _getMoney(data[item.key].sumAmountInUse) : ''
      data[item.key].remainingAmount = data[item.key] ? _getMoney(data[item.key].remainingAmount) : ''
    })
  }
  // 成功回调
  const successCallBack = ({ code, data }) => {
    if (code === '0') {
      state.data = data
      _getCompanyData(data)
      state.dataSource = data[state.active] ? data[state.active] : null
    }
  }
  // 获取数据
  const { loading } = useAsync({
    request: getViewInfo,
    successCallBack
  })

  watch(
    () => state.active,
    () => {
      state.dataSource = state.data[state.active] ? state.data[state.active] : null
    }
  )

  return {
    title,
    loading,
    ...toRefs(state)
  }
}
