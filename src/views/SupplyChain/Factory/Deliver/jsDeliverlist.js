import { ref } from '@vue/composition-api'
import useForm from 'hooks/useForm'
import useTable from 'hooks/useTable'
import useAsync from 'hooks/useAsync'
import { deliverModuleFormConfig } from './const/index'
import ajaxStore from '@/apis'
import { Message, MessageBox } from 'element-ui'
import { weblogsDom } from '@/utils/qjd/weblogs'

export default function useDevliverManage(getTableList, root) {
  const { factory: { getCustomerList, confirmDeliver, closeDeliver} } = ajaxStore
  const {$route, $router} = root
  const formRef = ref()
  const {
    formData,
    formConfig,
    submitHandle,
    resetHandle,
    setConfig
  } = useForm({
    formRef,
    formData: {deliverSn: undefined, orderSn: undefined, customerId: undefined, receiptStatus: undefined},
    formConfig: deliverModuleFormConfig(query => doResult({customerName: query}))
  })
  // console
  const {
    loading,
    dataSource,
    pagination,
    searchHandle,
    resetHandle: resetTableHandle
  } = useTable({
    request: getTableList,
    isPage: $route.name !== 'orderDetail',
    defaultParams: $route.name === 'orderDetail' ? {id: $route.query.id} : $route.params ? {...$route.params} : {},
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
  // 远程获取客户
  const { doResult } = useAsync({
    request: getCustomerList,
    init: false,
    successCallBack: ({ data }) => {
      setConfig('customerId', 'options', data)
    },
  })
  // 查询
  const searchFormHandle = () => submitHandle(searchHandle)
  // 重置
  const resetFormHandle = () => {
    resetHandle()
    resetTableHandle()
  }
  // 操作按钮
  const {doResult: _confirmDeliver} = useAsync({
    request: confirmDeliver,
    init: false,
  })
  const {doResult: _closeDeliver} = useAsync({
    request: closeDeliver,
    init: false,
  })
  const buttonHandle = (detail) => {
    const { label, row } = detail
    const receiptStatus = String(row.receiptStatus)
    if (label === '编辑') {
      weblogsDom('发货管理-编辑')
      $router.push({name: 'deliverEdit', query: {deliverId: row.id, orderId: row.orderId, status: receiptStatus}})
    }
    if (label === '查看') {
      weblogsDom('发货管理-查看')
      $router.push({name: 'deliverDetail', query: {deliverId: row.id, orderId: row.orderId, status: receiptStatus}})
    }
    if (label === '确认发货') {
      weblogsDom('发货管理-确认发货')
      let isComplete = true
      if (row.logisticsCompany === '' || row.logisticsCode === '' || row.logisticsAmount === 0) {
        isComplete = false
      }
      // console.log(isComplete, 'isComplet')
      if (!isComplete) {
        MessageBox.confirm('发货单中“物流公司、物流单号、物流费总额”没有填写，请填写后再进行发货。', '提示', {
          confirmButtonText: '确认',
          cancelButtonText: '关闭',
          type: 'warning',
          roundButton: true
        }).then(() => {
          $router.push({name: 'deliverEdit', query: {deliverId: row.id, orderId: row.orderId, status: receiptStatus}})
        })
      } else {
        MessageBox.confirm('确认对发货单进行发货吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          roundButton: true
        }).then(() => {
          _confirmDeliver({deliverId: row.id}).then(res => {
            const {code} = res
            if (code === '0') {
              searchHandle()
              Message.success('确认发货成功')
            }
          })
        })
      }
    }
    if (label === '关闭') {
      weblogsDom('发货管理-关闭')
      MessageBox.confirm('确认关闭此发货单吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        roundButton: true
      }).then(() => {
        _closeDeliver({deliverId: row.id}).then(res => {
          const {code} = res
          if (code === '0') {
            searchHandle()
            Message.success('发货单已关闭')
          } else {
            // if ($route.name === 'orderDetail') {
            //   Message.error(message)
            // }
          }
        })
      })
    }
  }
  const clickToDeliver = () => {
    $router.push({name: 'deliverOrderList'})
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
    clickToDeliver,
  }
}
