// 操作指引
import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'

export default () => {
  // addGuide
  const { receive: { addGuide } } = ajaxStore
  // 新增操作指引
  const { doResult: addHandle } = useAsync({ request: addGuide, init: false })

  return {
    addHandle
  }
}
