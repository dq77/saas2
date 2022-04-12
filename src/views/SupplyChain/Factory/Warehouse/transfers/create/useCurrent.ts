import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'
import { MessageBox } from 'element-ui'

export default ({
  formApis,
  productRef
}) => {
  // ajax
  const { factory: { wmwarehouseinfoList } } = ajaxStore
  // 仓库 - 接口
  useAsync({
    request: wmwarehouseinfoList,
    successCallBack: res => {
      formApis.setConfig('fromWarehouseId', 'options', res?.data ?? [])
      formApis.setConfig('toWarehouseId', 'options', res?.data ?? [])
    }
  })
  // 规则
  const validator = (rule, value, callback) => {
    const { formData: { fromWarehouseId, toWarehouseId } } = formApis
    if (fromWarehouseId && toWarehouseId && toWarehouseId === fromWarehouseId) {
      callback(new Error('调出仓调入仓不得相同'))
      return
    }
    callback()
  }
  // 动态设置校验规则，因为校验依赖于formData
  formApis.setFormRule('fromWarehouseId', 1, { validator, trigger: ['blur', 'change'] })
  formApis.setFormRule('toWarehouseId', 1, { validator, trigger: ['blur', 'change'] })
  // 切换调出仓时清空数据
  const clearProduct = () => {
    const { tableApis } = productRef.value ?? {}
    tableApis?.dataSource?.length && MessageBox.confirm('更改调出仓时，会清空已添加的产品，确认要更改仓库吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => tableApis?.resetDataSource([]))
  }
  // 选择仓库互相校验
  const selectChange = ({ value, key }) => {
    const { formData: { fromWarehouseId, toWarehouseId } } = formApis
    key === 'fromWarehouseId' && fromWarehouseId && toWarehouseId && formApis.validateField('toWarehouseId')
    key === 'toWarehouseId' && fromWarehouseId && toWarehouseId && formApis.validateField('fromWarehouseId')
    // 切换调出仓时清空数据
    key === 'fromWarehouseId' && fromWarehouseId && clearProduct()
  }

  return {
    selectChange
  }
}
