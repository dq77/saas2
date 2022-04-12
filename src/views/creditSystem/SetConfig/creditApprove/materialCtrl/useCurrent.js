import { dataSample } from './config'
import { Message } from 'element-ui'
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import useTableEdit from '@/hooks/credit/useTableEdit'

export default ({ tableApis }) => {
  // ajax
  const { credit: { createCreditmaterialsconfig, updateCreditmaterialsconfig, deleteCreditmaterialsconfig, getApprovalMaterialScenario } } = ajaxStore
  // useTableEdit
  const {
    status,
    editHandle,
    cancleHandle,
    addHandle
  } = useTableEdit({ tableApis, dataSample })
  // 创建审批材料配置
  const { doResult: createHandle } = useAsync({ request: createCreditmaterialsconfig, init: false })
  // 更新审批材料配置
  const { doResult: updateHandle } = useAsync({ request: updateCreditmaterialsconfig, init: false })
  // 删除审批材料配置
  const { doResult: deleteHandle } = useAsync({
    request: deleteCreditmaterialsconfig,
    init: false,
    successCallBack: ({ code }) => {
      code === '0' && Message.success('删除成功')
      code === '0' && tableApis.searchHandle()
    }
  })
  // 场景枚举
  const { result, doResult } = useAsync({ request: getApprovalMaterialScenario })
  // success
  const successHandle = (row) => {
    Message.success('保存成功')
    tableApis.searchHandle()
    status.value = null
    row.customType = null
  }
  // 保存
  const sureHandle = row => {
    const { dataSource } = tableApis
    if (dataSource?.filter(item => item?.materialsName === row.materialsName)?.length > 1) return Message.warning('已存在相同材料名称')
    if (!row.materialsName) return Message.warning('请输入材料名称')
    if (!row.applicationScenario || !row.applicationScenario.length) return Message.warning('请选择应用场景')
    if (!row.mustPass) return Message.warning('请选择是否必传')
    const { id, applicationScenario, materialsName, mustPass } = row
    row.loading = true
    !id && createHandle({ applicationScenario: applicationScenario.join(','), materialsName, mustPass }).then(({ code }) => {
      row.loading = false
      code === '0' && successHandle(row)
    })
    id && updateHandle({ applicationScenario: applicationScenario.join(','), materialsName, mustPass, id }).then(({ code }) => {
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
    result,
    doResult,
    deleteHandle
  }
}
