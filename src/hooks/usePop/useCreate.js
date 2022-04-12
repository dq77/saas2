import ajaxStore from '@/apis'
import useAsync from 'hooks/useAsync'

export default () => {
  const { credit: { createGuide } } = ajaxStore
  // 创建指引记录接口
  const { doResult } = useAsync({
    request: createGuide,
    init: false
  })

  return {
    doResult
  }
}
