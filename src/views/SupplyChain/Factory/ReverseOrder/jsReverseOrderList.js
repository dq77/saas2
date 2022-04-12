import { ref } from '@vue/composition-api'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import useAsync from 'hooks/useAsync'
import { reverseOrderFormConfig } from './const'
import ajaxStore from '@/apis'
import { filterSearchParams } from '../Common'
import { weblogsDom } from '@/utils/qjd/weblogs'

export default function useReverseOrderList(getTableList, root) {
  const { factory: { getCustomerList } } = ajaxStore
  const {$route, $router} = root
  const formRef = ref()
  const {
    formData,
    formConfig,
    resetHandle,
    setConfig
  } = useForm({
    formRef,
    formData: {createdTime: undefined, reverseOrderSn: undefined, customerId: undefined, status: undefined},
    formConfig: reverseOrderFormConfig(query => doResult({customerName: query}))
  })
  const {
    loading,
    dataSource,
    pagination,
    searchHandle,
    resetHandle: resetTableHandle
  } = useTable({
    request: getTableList,
    isPage: $route.name !== 'orderDetail',
    defaultParams: $route.name === 'orderDetail' ? {orderId: $route.query.id} : $route.params.status ? {...$route.params} : {},
    callback: $route.name === 'orderDetail' ? data => {
      return { dataSource: data }
    } : data => {
      const { totalCount = 0, pagedRecords = [] } = data || {}
      return {
        totalCount,
        dataSource: pagedRecords
      }
    }
  })
  // 远程获取经销商
  const { doResult } = useAsync({
    request: getCustomerList,
    init: false,
    successCallBack: ({ data }) => {
      setConfig('customerId', 'options', data)
    },
  })
  // 查询
  const searchFormHandle = () => {
    const searchData = filterSearchParams(formData.value) || {}
    const { createdTime } = searchData
    const customParams = {}
    if (createdTime) {
      customParams.startTime = createdTime[0] + ' 00:00:00'
      customParams.endTime = createdTime[1] + ' 23:59:59'
      delete searchData.createdTime
    }
    searchHandle({...searchData, ...customParams})
  }
  // 重置
  const resetFormHandle = () => {
    resetHandle()
    resetTableHandle()
  }
  // 操作按钮
  const buttonHandle = (detail) => {
    const { label, row } = detail
    if (label === '查看') {
      weblogsDom('退货管理-查看')
      $router.push({name: 'reverseOrderderDetail', query: {id: row.id, type: 'look'}})
    }
    if (label === '退货处理') {
      weblogsDom('退货管理-退货处理')
      $router.push({name: 'reverseOrderderDetail', query: {id: row.id}})
    }
  }
  return {
    formRef,
    formData,
    formConfig,
    loading,
    dataSource,
    pagination,
    searchFormHandle,
    resetFormHandle,
    buttonHandle,
    doResult,
  }
}
