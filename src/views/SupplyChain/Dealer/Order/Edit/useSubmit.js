import { Message } from 'element-ui'
import router from '@/router'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { transformBaseInfoToSubmit, transformProductDataToSubmit, checkRepeatRow } from './util'

export default function ({
  sourceType,
  baseInfoData,
  tableRef
}) {
  // 点击返回
  const clickGoBack = () => router.go(-1)

  // 请求 创建
  const { doResult: doCreate, loading: createLoading } = useAsync({
    request: ajaxStore.dealer.createOrder,
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
  const clickSave = async (cb) => {
    const data = transformBaseInfoToSubmit(baseInfoData.value)
    const tableData = tableRef.value[0].getTableData()

    if (!validateSubmit(tableData)) return false

    data.orderItemDTOS = transformProductDataToSubmit(tableData)
    data.sourceType = sourceType
    const res = await doCreate(data)
    if (res?.code === '0' && res?.data) {
      await cb(res.data)
    }
  }

  return {
    clickGoBack,
    clickSave,
    saveLoading: createLoading,
  }
}
