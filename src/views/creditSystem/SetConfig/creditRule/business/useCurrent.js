import { dataSample } from './config'
import { Message } from 'element-ui'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import useTableEdit from '@/hooks/credit/useTableEdit'

export default ({ tableApis, getPeriodDays }) => {
  // ajax
  const { credit: { getBusinesstypeperiod, createBusinesstypeperiod, updateBusinesstypeperiod } } = ajaxStore
  // useTableEdit
  const {
    status,
    editHandle,
    cancleHandle,
    addHandle
  } = useTableEdit({ tableApis, dataSample })
  // 获取客户控制策略
  const { doResult: getData, loading } = useAsync({
    request: getBusinesstypeperiod,
    successCallBack: ({ code, data }) => {
      if (code === '0') {
        data && data.forEach(item => {
          item.customType = null
          item.loading = false
        })
        tableApis.resetDataSource(data || [])
      }
    }
  })
  // 创建业务类型策略
  const { doResult: createHandle } = useAsync({
    request: createBusinesstypeperiod,
    init: false
  })
  // 更新业务类型策略
  const { doResult: updateHandle } = useAsync({
    request: updateBusinesstypeperiod,
    init: false
  })
  // success
  const successHandle = (row) => {
    Message.success('保存成功')
    getData()
    status.value = null
    row.customType = null
  }
  // 保存
  const sureHandle = row => {
    if (!row.businessTypeCode && row.businessTypeCode !== 0) return Message.warning('请输入类型ID')
    if (!row.businessTypeName && row.businessTypeName !== 0) return Message.warning('请输入业务类型名称')
    if (!row.ruleConfigIdStr) return Message.warning('请选择产品策略')
    const { businessTypeCode, businessTypeName, ruleConfigIdStr, id } = row
    const periodDays = getPeriodDays(ruleConfigIdStr)
    row.loading = true
    // 新增
    !id && createHandle({ businessTypeCode, businessTypeName, ruleConfigId: ruleConfigIdStr, periodDays }).then(({ code }) => {
      row.loading = false
      code === '0' && successHandle(row)
    })
    // 修改
    id && updateHandle({ id, ruleConfigId: ruleConfigIdStr, periodDays }).then(({ code }) => {
      row.loading = false
      code === '0' && successHandle(row)
    })
  }

  return {
    status,
    addHandle,
    sureHandle,
    cancleHandle,
    editHandle,
    loading
  }
}
