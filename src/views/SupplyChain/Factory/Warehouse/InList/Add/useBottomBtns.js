import { Message } from 'element-ui'
import router from '@/router'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { transformBaseInfoToSubmit, transformProductDataToSubmit } from './util'

export default function ({ routeName, tableRef }) {
  // 点击返回
  const clickGoBack = () => router.go(-1)

  const { factory: { wmstorageinfoCreate, wmoutboundinfoCreate } } = ajaxStore
  // 请求 创建
  const { doResult: doCreate, loading: createLoading } = useAsync({
    request: routeName === 'inAdd' ? wmstorageinfoCreate : wmoutboundinfoCreate,
    // wmoutboundinfoCreate
    init: false,
    successCallBack: (res) => {
      if (res?.code === '0') {
        Message.success('提交成功')
        router.go(-1)
      }
    }
  })

  // 校验表格必填项
  const validateSubmit = (tableData) => {
    if (tableData.length === 0) {
      Message.warning('请先添加产品')
      return false
    }
    for (let i = 0; i < tableData.length; i++) {
      if (!tableData[i].goodsName) {
        Message.warning(`第${i + 1}行产品名称未选择`)
        return false
      }
      if (!tableData[i].productSn) {
        Message.warning(`第${i + 1}行产品型号未选择`)
        return false
      }
      if (!tableData[i].goodsQuantity) {
        Message.warning(`第${i + 1}行产品数量未输入`)
        return false
      }
      for (let j = 0; j < tableData[i]?.extendData?.length; j++) {
        const value = tableData[i].extendData[j].value
        if (!value || Object.keys(value).length <= 0) {
          Message.warning(`第${i + 1}行产品属性不能为空`)
          return false
        }
      }
    }
    return true
  }

  // 点击保存，新建创建
  const clickSave = async (baseInfoData, cb) => {
    const data = transformBaseInfoToSubmit(baseInfoData)
    console.log('baseInfoData:', data)

    const tableData = tableRef?.value?.getTableData()
    if (!validateSubmit(tableData)) return false
    data.addDetailRequestList = transformProductDataToSubmit(tableData)
    const res = await doCreate(data)
    if (res?.code === '0') {
      await cb()
    }
  }

  return {
    clickGoBack,
    clickSave,
    saveLoading: createLoading,
  }
}
