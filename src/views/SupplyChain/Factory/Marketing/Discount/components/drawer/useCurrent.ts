import { reactive, toRefs, computed } from '@vue/composition-api'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { filterCustomer } from './util'
export default () => {
  // state
  const state = reactive({
    pagedRecords: [],
    pageNo: 1,
    customerName: '',
    totalCount: 0,
    currentCheck: [],
    allChecked: false,
    isIndeterminate: false,
    allTotalCount: 0
  })
  // ajax
  const { common: { getNoPermissionCustomerList } } = ajaxStore
  const { doResult, loading } = useAsync({
    request: getNoPermissionCustomerList,
    init: false,
    params: { pageSize: 20, status: 0 },
    successCallBack: ({ code, data }) => {
      if (code === '0') handleRecord(data)
    }
  })
  const handleRecord = (data: any): void => {
    const result = data?.pagedRecords?.map(item => {
      const key = state.currentCheck.findIndex(n => n.id === item.id)
      return {
        ...item,
        checked: key !== -1 ?? false
      }
    })
    state.pagedRecords = [...state.pagedRecords, ...JSON.parse(JSON.stringify(result)) ?? []]
    if (state.customerName === '') state.allTotalCount = data?.totalCount ?? 0
    // 判断全选按钮状态
    if (state.currentCheck.length && state.currentCheck.length < state.pagedRecords.length) {
      state.allChecked = false
      state.isIndeterminate = true
    }
    state.totalCount = data?.totalCount ?? 0
  }
  // computed
  const disabled = computed(() => {
    return state.pageNo === Math.ceil(state.totalCount / 20)
  })
  // methods
  const handleCheckAllChange = (val: boolean): void => {
    state.pagedRecords.forEach(item => { item.checked = val })
    state.currentCheck = val ? [...state.currentCheck, ...state.pagedRecords] : handleCancelCheck()
    handleRepeat()
    state.isIndeterminate = false
  }
  const handleCheckedChange = (val: boolean): void => {
    const listCurrentCheck = state.pagedRecords.filter(item => item.checked)
    state.currentCheck = val ? [...state.currentCheck, ...listCurrentCheck] : handleCancelCheck()
    handleRepeat()
    state.allChecked = state.currentCheck?.length === state.allTotalCount
    state.isIndeterminate = state.currentCheck?.length > 0 && state.currentCheck?.length < state.allTotalCount
  }
  // 取消选择，则在总数据中删除
  const handleCancelCheck = (): Array<object> => {
    const current = JSON.parse(JSON.stringify(state.currentCheck))
    if (current.length) {
      current.forEach(item => {
        const key = state.pagedRecords.findIndex(n => n.id === item.id)
        if (key !== -1 && !state.pagedRecords[key].checked) item.checked = state.pagedRecords[key].checked
      })
    }
    return current
  }
  // 处理初始化数据
  const initCustomer = (list: Array<any>): void => {
    list.forEach(item => { item.checked = true })
    state.currentCheck = list
    state.isIndeterminate = state.currentCheck?.length > 0 && state.currentCheck?.length < state.pagedRecords.length
  }
  // 处理重复数据
  const handleRepeat = (): void => {
    state.currentCheck = state.currentCheck.filter(item => item.checked)
    state.currentCheck = filterCustomer(state.currentCheck)
  }
  // 滑动到底部加载数据
  const load = (): void => {
    state.pageNo++
    remoteCustomerList(state.customerName)
  }
  // 搜索
  const search = (): void => {
    state.pageNo = 1
    state.pagedRecords = []
    if (state.currentCheck.length > 0 && state.currentCheck.length < state.allTotalCount) state.isIndeterminate = true
    remoteCustomerList(state.customerName)
  }
  const remoteCustomerList = (customerName: string = ''): void => {
    doResult({
      customerName,
      pageNo: state.pageNo
    })
  }
  remoteCustomerList()
  return {
    ...toRefs(state),
    remoteCustomerList,
    search,
    load,
    disabled,
    handleCheckAllChange,
    handleCheckedChange,
    initCustomer,
    loading
  }
}
