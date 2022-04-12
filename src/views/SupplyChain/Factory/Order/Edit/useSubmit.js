import { Message, MessageBox } from 'element-ui'
import router from '@/router'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { transformBaseInfoToSubmit, transformProductDataToSubmit, checkRepeatRow } from './util'

export default function ({
  sourceType,
  routeName,
  orderId,
  orderStatus,
  baseInfoData,
  tableRef
}) {
  // 点击返回
  const clickGoBack = () => router.go(-1)

  // 请求 关闭订单
  const { doResult: doClose, loading: closeLoading } = useAsync({
    request: ajaxStore.factory.cancelOrder,
    init: false,
    successCallBack: (res) => {
      if (res?.code === '0') {
        const content = orderStatus === '0' ? '订单取消成功' : '订单关闭成功'
        Message.success(content)
        router.go(-1)
      }
    }
  })
  // 点击取消
  const clickClose = () => {
    const content = orderStatus === '0' ? '确定要取消这个订单吗？' : '确定要关闭这个订单吗？'
    MessageBox.confirm(content, '提示', {
      type: 'warning',
      roundButton: true,
    }).then(() => {
      doClose({ orderId })
    })
  }

  // 请求 创建
  const { doResult: doCreate, loading: createLoading } = useAsync({
    request: ajaxStore.factory.createOrder,
    init: false,
  })
  // 请求 更新
  const { doResult: doUpdate, loading: updateLoading } = useAsync({
    request: ajaxStore.factory.updateOrder,
    init: false,
  })

  const validateSubmit = (tableData) => {
    for (let i = 0; i < tableData.length; i++) {
      if (tableData[i].quantity <= 0) {
        Message.error(`第${i + 1}行产品数量应大于零`)
        return false
      }
      for (let j = 0; j < tableData[i].extendData.length; j++) {
        const value = tableData[i].extendData[j].value
        if (!value || Object.keys(value).length <= 0) {
          Message.error(`第${i + 1}行产品属性不能为空`)
          return false
        }
      }
    }
    if (Object.keys(checkRepeatRow(tableData)).length > 0) {
      Message.error('产品信息重复，请去重')
      return false
    }
    return true
  }

  // 点击保存，订单创建、编辑
  const clickSave = async (callback) => {
    const data = transformBaseInfoToSubmit(baseInfoData.value)
    const tableData = tableRef.value[0].getTableData()

    if (!validateSubmit(tableData)) return false

    data.orderItemDTOS = transformProductDataToSubmit(tableData)
    let ajaxMethod = doCreate
    if (routeName === 'orderEdit') {
      data.id = orderId
      ajaxMethod = doUpdate
    }
    data.sourceType = sourceType
    const res = await ajaxMethod(data)
    if (res?.code === '0' && res?.data) {
      await callback(res.data)
    }
  }

  return {
    clickGoBack,
    clickClose,
    clickSave,
    closeLoading,
    saveLoading: createLoading || updateLoading,
  }
}
