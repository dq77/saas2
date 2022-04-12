import useAsync from 'hooks/useAsync'
import ajaxStore from '@/apis'
import { Message } from 'element-ui'

export default () => {
  const { credit: { getCreditAccountConfig, changeStatus } } = ajaxStore
  // 获取企业年度授信总额 & 列表
  const { result, doResult, loading } = useAsync({ request: getCreditAccountConfig })
  // 启用 & 禁用接口
  const { doResult: _changeStatus } = useAsync({
    request: changeStatus,
    init: false,
    successCallBack: ({ code, params: { creditStatus } }) => {
      code === '0' && Message.success(creditStatus === 1 ? '启用成功' : creditStatus === 3 ? '禁用成功' : '')
      code === '0' && doResult()
    }
  })
  // 启用 & 禁用
  const disableHandle = ({ id, creditStatus } = {}) => _changeStatus({ id, creditStatus: creditStatus === 1 ? 3 : creditStatus === 3 ? 1 : '' })

  return {
    result,
    doResult,
    disableHandle,
    loading
  }
}
